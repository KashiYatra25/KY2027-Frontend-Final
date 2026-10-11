"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { UpdateCartQuantitySchema } from "@/lib/api/utils/cart.schema";
import type { CartApiResponse } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface UpdateQuantityRequest {
  passId: string;
  quantity: number;
}

// ═══════════════════════════════════════════════════════════════════
// Success Toast
// ═══════════════════════════════════════════════════════════════════

function QuantityUpdatedToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
        }}
      >
        <svg
          className="h-5 w-5 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-emerald-100">Cart Updated</p>
        <p className="text-sm text-emerald-300/70">Quantity changed successfully</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Error Toast
// ═══════════════════════════════════════════════════════════════════

function QuantityErrorToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
        }}
      >
        <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-red-100">Update Failed</p>
        <p className="text-sm text-red-300/70">Could not change quantity</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// useUpdateCartQuantity Hook
// Updates the quantity of a specific item in the cart
// ═══════════════════════════════════════════════════════════════════

export function useUpdateCartQuantity() {
  const { mutate, isPending, isSuccess, isError, error, reset, data } =
    useApiMutation<CartApiResponse>({
      url: "/user/cart/update-quantity",
      method: "patch",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: UpdateCartQuantitySchema },
      invalidateQueryName: ["my-cart"],
      toastConfig: {
        successConfig: { customToast: <QuantityUpdatedToast /> },
        errorConfig: { customToast: <QuantityErrorToast /> },
      },
      mutationOptions: { retry: API_RETRY },
    });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to update quantity"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const updateQuantity = (
    request: UpdateQuantityRequest,
    callbacks?: { onSettled?: () => void }
  ) => {
    mutate(request as unknown as Record<string, unknown>, {
      onSettled: callbacks?.onSettled,
    });
  };

  return {
    mutate: updateQuantity,
    reset,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    updatedCart: data,
  };
}
