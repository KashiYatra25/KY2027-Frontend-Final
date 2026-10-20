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
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface ManualIdentityData {
  firstName: string;
  aadhaarNumber: string; // 12 digits
  dateOfBirth: string; // YYYY-MM-DD
  gender: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
}

export interface ManualIdentityResponse {
  info: string;
  firstName: string;
  gender: string;
  dateOfBirth: string;
  aadhaarNumber: string;
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMA
// ═══════════════════════════════════════════════════════════════════

const ManualIdentitySchema = z.object({
  firstName: z.string().min(2).max(100),
  aadhaarNumber: z.string().regex(/^\d{12}$/),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
});

function DefaultManualIdentitySuccessToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Details saved</p>
        <p className="text-sm text-neutral-400">Identity details submitted successfully</p>
      </div>
    </div>
  );
}

function DefaultManualIdentityErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Couldn&apos;t save details</p>
        <p className="text-sm text-neutral-400">Please try again</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useManualIdentity
// Submit identity details manually (alternative to Aadhaar)
// ═══════════════════════════════════════════════════════════════════

export function useManualIdentity(userId?: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    mutate,
    data: responseData,
    isPending: isLoading,
    isSuccess: isSubmitted,
    reset: resetMutation,
  } = useApiMutation<ManualIdentityResponse>({
    url: "/user/profile/manual-identity",
    method: "post",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: ManualIdentitySchema },
    toastConfig: {
      successConfig: { customToast: <DefaultManualIdentitySuccessToast /> },
      errorConfig: { customToast: <DefaultManualIdentityErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  /**
   * Submit manual identity details
   */
  const submitManualIdentity = useCallback(
    async (data: ManualIdentityData): Promise<boolean> => {
      setErrorMessage(null);

      return new Promise((resolve) => {
        mutate(data as unknown as Record<string, unknown>, {
          onSuccess: () => {
            // Invalidate account queries
            if (userId) {
              queryClient.invalidateQueries({
                queryKey: ["account-progress", userId],
              });
            }
            // Also invalidate Apollo cache queries
            queryClient.invalidateQueries({ queryKey: ["myAccount"] });
            resolve(true);
          },
          onError: (error) => {
            const message = extractErrorMessage(error, "Failed to submit identity details");
            setErrorMessage(message);
            resolve(false);
          },
        });
      });
    },
    [mutate, queryClient, userId]
  );

  const reset = useCallback(() => {
    setErrorMessage(null);
    resetMutation();
  }, [resetMutation]);

  return {
    submitManualIdentity,
    reset,
    isLoading,
    isSubmitted,
    errorMessage,
    responseData,
  };
}
