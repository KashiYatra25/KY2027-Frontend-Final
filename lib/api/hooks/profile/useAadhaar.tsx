"use client";

import { useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { z } from "zod";
import { CheckCircle, XCircle } from "lucide-react";
import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";
import { AadhaarUploadUrlSchema, ConfirmUploadSchema } from "@/lib/api/utils/aadhaar.schema";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type {
  AadhaarUploadUrlData,
  AadhaarExtractedData,
} from "@/lib/api/helper/types/aadhaar.types";

// ═══════════════════════════════════════════════════════════════════
// DEFAULT TOASTS
// Aadhaar upload/verify is a multi-step orchestrated flow; the component
// surfaces granular feedback. These satisfy the per-mutation toast
// contract and act as a fallback for the user-facing verify action.
// ═══════════════════════════════════════════════════════════════════

function AadhaarSuccessToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Aadhaar processed</p>
        <p className="text-sm text-neutral-400">Your details were updated</p>
      </div>
    </div>
  );
}

function AadhaarErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Aadhaar step failed</p>
        <p className="text-sm text-neutral-400">Please try again</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK 1: useAadhaarUpload
// Handles: Get presigned URL → Upload to S3 → Confirm upload
// ═══════════════════════════════════════════════════════════════════

export function useAadhaarUpload(userId?: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get presigned URL mutation
  const { mutate: mutateUploadUrl, reset: resetUploadUrl } = useApiMutation<AadhaarUploadUrlData>({
    url: "/aadhaar/upload-url",
    method: "post",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: AadhaarUploadUrlSchema },
    toastConfig: {
      successConfig: { customToast: <AadhaarSuccessToast /> },
      errorConfig: { customToast: <AadhaarErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  // Confirm upload mutation
  // Backend returns a flat response: { info: string }
  const { mutate: mutateConfirm, reset: resetConfirm } = useApiMutation<{
    info: string;
  }>({
    url: "/aadhaar/confirm-upload",
    method: "patch",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: ConfirmUploadSchema },
    toastConfig: {
      successConfig: { customToast: <AadhaarSuccessToast /> },
      errorConfig: { customToast: <AadhaarErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  // Promisified get upload URL
  const getUploadUrl = useCallback(
    (fileType: "image/jpeg" | "image/png"): Promise<AadhaarUploadUrlData> => {
      return new Promise((resolve, reject) => {
        mutateUploadUrl(
          { fileType },
          {
            onSuccess: (response) => resolve(response.data),
            onError: (err) => reject(err),
          }
        );
      });
    },
    [mutateUploadUrl]
  );

  // Promisified confirm upload
  const confirmUpload = useCallback(
    (s3Key: string): Promise<{ info: string }> => {
      return new Promise((resolve, reject) => {
        mutateConfirm(
          { s3Key },
          {
            onSuccess: (response) => resolve(response.data),
            onError: (err) => reject(err),
          }
        );
      });
    },
    [mutateConfirm]
  );

  /**
   * Upload Aadhaar file:
   * 1. Get presigned URL
   * 2. Upload to S3
   * 3. Confirm upload to backend
   */
  const uploadAadhaar = useCallback(
    async (file: File): Promise<boolean> => {
      setErrorMessage(null);
      setIsUploaded(false);

      if (!file) {
        setErrorMessage("No file provided");
        return false;
      }

      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Invalid file type. Please upload a JPG or PNG image.");
        return false;
      }

      try {
        setIsLoading(true);
        // Step 1: Get presigned URL
        const uploadUrlData = await getUploadUrl(file.type as "image/jpeg" | "image/png");

        // Step 2: Upload to S3
        const s3Response = await fetch(uploadUrlData.uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!s3Response.ok) {
          setErrorMessage("Failed to upload image. Please try again.");
          return false;
        }

        // Step 3: Confirm upload
        await confirmUpload(uploadUrlData.s3Key);

        setIsUploaded(true);

        // Invalidate cache
        if (userId) {
          queryClient.invalidateQueries({
            queryKey: ["account-progress", userId],
          });
        }

        return true;
      } catch (error) {
        const message = extractErrorMessage(error, "Upload failed");
        setErrorMessage(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [getUploadUrl, confirmUpload, queryClient, userId]
  );

  const reset = useCallback(() => {
    setErrorMessage(null);
    setIsUploaded(false);
    resetUploadUrl();
    resetConfirm();
  }, [resetUploadUrl, resetConfirm]);

  return {
    uploadAadhaar,
    reset,
    isLoading,
    isUploaded,
    errorMessage,
  };
}

// ═══════════════════════════════════════════════════════════════════
// HOOK 2: useAadhaarVerify
// Handles: Extract details via Textract and update profile
// ═══════════════════════════════════════════════════════════════════

export function useAadhaarVerify(userId?: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    mutate,
    data: extractedData,
    isPending: isLoading,
    isSuccess: isVerified,
    reset: resetMutation,
  } = useApiMutation<AadhaarExtractedData>({
    url: "/aadhaar/extract-details-and-update-profile",
    method: "post",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: z.object({}) },
    toastConfig: {
      successConfig: { customToast: <AadhaarSuccessToast /> },
      errorConfig: { customToast: <AadhaarErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  /**
   * Verify Aadhaar - calls Textract to extract details
   */
  const verifyAadhaar = useCallback(async (): Promise<boolean> => {
    setErrorMessage(null);

    return new Promise((resolve) => {
      mutate(
        {},
        {
          onSuccess: () => {
            // Invalidate cache
            if (userId) {
              queryClient.invalidateQueries({
                queryKey: ["account-progress", userId],
              });
            }
            resolve(true);
          },
          onError: (error) => {
            const message = extractErrorMessage(error, "Verification failed");
            setErrorMessage(message);
            resolve(false);
          },
        }
      );
    });
  }, [mutate, queryClient, userId]);

  const reset = useCallback(() => {
    setErrorMessage(null);
    resetMutation();
  }, [resetMutation]);

  return {
    verifyAadhaar,
    reset,
    isLoading,
    isVerified,
    errorMessage,
    extractedData,
  };
}
