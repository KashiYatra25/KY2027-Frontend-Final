"use client";

import { useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
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
// TYPES
// ═══════════════════════════════════════════════════════════════════

export type IdentityMethod = "aadhaar" | "manual";

export interface SelectIdentityMethodResponse {
  info: string;
  method: IdentityMethod;
  locked: boolean;
}

const SelectIdentityMethodSchema = z.object({
  method: z.enum(["aadhaar", "manual"]),
});

function DefaultIdentityMethodSuccessToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Method selected</p>
        <p className="text-sm text-neutral-400">Continue with your verification</p>
      </div>
    </div>
  );
}

function DefaultIdentityMethodErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Couldn&apos;t select method</p>
        <p className="text-sm text-neutral-400">Please try again</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useSelectIdentityMethod
// Commits + locks the chosen identity verification method on the backend.
// Safe to call repeatedly with the same method (idempotent server-side).
// ═══════════════════════════════════════════════════════════════════

export function useSelectIdentityMethod() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useApiMutation<SelectIdentityMethodResponse>({
    url: "/user/profile/identity-method",
    method: "post",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: SelectIdentityMethodSchema },
    toastConfig: {
      successConfig: { customToast: <DefaultIdentityMethodSuccessToast /> },
      errorConfig: { customToast: <DefaultIdentityMethodErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  /**
   * Commit the chosen method. Resolves true on success (or idempotent
   * same-method), false if the server rejected the change (locked).
   */
  const selectMethod = useCallback(
    (method: IdentityMethod): Promise<boolean> => {
      return new Promise((resolve) => {
        mutate(
          { method },
          {
            onSuccess: () => {
              // Refresh account progress so the lock reflects immediately.
              queryClient.invalidateQueries({ queryKey: ["myAccount"] });
              resolve(true);
            },
            onError: () => resolve(false),
          }
        );
      });
    },
    [mutate, queryClient]
  );

  return { selectMethod, isLoading };
}
