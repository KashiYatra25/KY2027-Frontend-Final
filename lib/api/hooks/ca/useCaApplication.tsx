"use client";

import { useEffect, useState, useCallback } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { CaApplicationSchema } from "@/lib/api/utils/ca.schema";
import type { CaApplicationApiResponse } from "@/lib/api/helper/types/ca.types";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface UseCaApplicationOptions {
  successToast?: React.ReactElement;
  errorToast?: React.ReactElement;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for submitting Campus Ambassador application
 * Uses authenticated user's session - no body required
 */
export function useCaApplication(options?: UseCaApplicationOptions) {
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useApiMutation<CaApplicationApiResponse>({
      url: "/campus-ambassador/apply",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: CaApplicationSchema },
      toastConfig: {
        successConfig: options?.successToast ? { customToast: options.successToast } : undefined,
        errorConfig: options?.errorToast ? { customToast: options.errorToast } : undefined,
      },
      mutationOptions: { retry: API_RETRY },
    });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to submit application"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  /**
   * Submit CA application
   * Sends empty body - backend derives userId from auth
   */
  const apply = useCallback(() => {
    mutate({});
  }, [mutate]);

  return {
    apply,
    reset,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
}
