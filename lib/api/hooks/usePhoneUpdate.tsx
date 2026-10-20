"use client";

import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import {
  PhoneSuccessToast,
  PhoneErrorToast,
} from "@/components/pages/complete-profile/steps/phone/toasts";
import type { PhoneUpdateData } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// SCHEMAS
// ═══════════════════════════════════════════════════════════════════

const UpdatePhoneSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
});

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for updating phone number (no OTP verification)
 * @param userId - User ID for cache invalidation
 */
export function useUpdatePhone(userId?: string) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<PhoneUpdateData>({
    url: "/user/profile",
    method: "patch",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: UpdatePhoneSchema },
    invalidateQueryName: ["account-progress", userId!],
    toastConfig: {
      successConfig: { customToast: <PhoneSuccessToast /> },
      errorConfig: { customToast: <PhoneErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to update phone number"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return {
    updatePhone: mutate,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
}
