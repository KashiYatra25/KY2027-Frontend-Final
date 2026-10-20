"use client";

import { useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { z } from "zod";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";

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
    mutationOptions: { retry: API_RETRY },
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
