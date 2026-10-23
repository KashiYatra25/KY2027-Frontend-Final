"use client";

import { useApiMutation } from "wire-axon/hooks";
import { useCallback } from "react";
import { z } from "zod";
import { CheckCircle, XCircle } from "lucide-react";
import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";

// ═══════════════════════════════════════════════════════════════════
// TYPES + SCHEMA
// ═══════════════════════════════════════════════════════════════════

export interface ApplyReferralResponse {
  info: string;
  referredBy: string;
}

const ApplyReferralSchema = z.object({
  referralId: z.string().min(1, "Referral code is required"),
});

// ═══════════════════════════════════════════════════════════════════
// TOASTS
// ═══════════════════════════════════════════════════════════════════

function ApplyReferralSuccessToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Referral applied</p>
        <p className="text-sm text-neutral-400">Thanks for crediting your Campus Ambassador</p>
      </div>
    </div>
  );
}

function ApplyReferralErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Couldn&apos;t apply referral</p>
        <p className="text-sm text-neutral-400">Check the code and try again</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useApplyReferral
// Applies a CA's referral code to the current user (one-time only).
// On success, refreshes the account query so the profile reflects the
// newly-set "referred by" name.
// ═══════════════════════════════════════════════════════════════════

export function useApplyReferral() {
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useApiMutation<ApplyReferralResponse>({
      url: "/user/apply-referral",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: ApplyReferralSchema },
      toastConfig: {
        successConfig: { customToast: <ApplyReferralSuccessToast /> },
        errorConfig: { customToast: <ApplyReferralErrorToast /> },
      },
      mutationOptions: { retry: shouldRetryOnNetworkError },
    });

  /**
   * Apply a referral code. Resolves true on success (caller should then
   * refetch the account query so the profile shows the new referrer), false
   * on failure.
   */
  const applyReferral = useCallback(
    (referralId: string): Promise<boolean> => {
      return new Promise((resolve) => {
        mutate(
          { referralId: referralId.trim().toUpperCase() },
          {
            onSuccess: () => resolve(true),
            onError: () => resolve(false),
          }
        );
      });
    },
    [mutate]
  );

  return { applyReferral, isPending, isSuccess, isError, error, reset };
}
