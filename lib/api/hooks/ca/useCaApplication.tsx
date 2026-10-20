"use client";

import { useEffect, useState, useCallback } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { CheckCircle, XCircle } from "lucide-react";
import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";
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

function DefaultCaSuccessToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Application submitted</p>
        <p className="text-sm text-neutral-400">We&apos;ll review it shortly</p>
      </div>
    </div>
  );
}

function DefaultCaErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Submission failed</p>
        <p className="text-sm text-neutral-400">Please try again later</p>
      </div>
    </div>
  );
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
        successConfig: { customToast: options?.successToast ?? <DefaultCaSuccessToast /> },
        errorConfig: { customToast: options?.errorToast ?? <DefaultCaErrorToast /> },
      },
      mutationOptions: { retry: shouldRetryOnNetworkError },
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
