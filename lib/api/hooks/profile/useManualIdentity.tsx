"use client";

import { useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { z } from "zod";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface ManualIdentityData {
  firstName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
}

export interface ManualIdentityResponse {
  info: string;
  firstName: string;
  gender: string;
  dateOfBirth: string;
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMA
// ═══════════════════════════════════════════════════════════════════

const ManualIdentitySchema = z.object({
  firstName: z.string().min(2).max(100),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
});

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
    mutationOptions: { retry: API_RETRY },
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
