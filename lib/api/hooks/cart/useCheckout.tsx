"use client";

import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { load } from "@cashfreepayments/cashfree-js";
import { AlertCircle, CheckCircle } from "lucide-react";
import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";

// Schema for checkout request - optional couponCode
const CheckoutSchema = z.object({
  couponCode: z.string().optional(),
});

// Response envelope from backend
interface CheckoutApiResponse {
  statusCode: number;
  message: string;
  info: string;
  orderId: string;
  paymentSessionId: string;
  summary: {
    items: Array<{
      passId: string;
      passName: string;
      quantity: number;
      unitPrice: number;
    }>;
    subtotal: number;
    discount: number;
    total: number;
    currency: string;
  };
  coupon: {
    id: string;
    code: string;
    discountAmount: number;
  } | null;
}

interface CheckoutRequest {
  couponCode?: string;
}

// ═══════════════════════════════════════════════════════════════════
// Toasts
// ═══════════════════════════════════════════════════════════════════

function CheckoutSuccessToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
        }}
      >
        <CheckCircle className="h-5 w-5 text-emerald-400" />
      </div>
      <div>
        <p className="font-semibold text-emerald-100">Redirecting to Payment</p>
        <p className="text-sm text-emerald-300/70">Opening secure checkout…</p>
      </div>
    </div>
  );
}

function CheckoutErrorToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
        }}
      >
        <AlertCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-red-100">Checkout Failed</p>
        <p className="text-sm text-red-300/70">Please try again later</p>
      </div>
    </div>
  );
}

/**
 * Hook to checkout cart and get Cashfree payment session
 */
export function useCheckout() {
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useApiMutation<CheckoutApiResponse>({
      url: "/user/cart/checkout",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: CheckoutSchema },
      toastConfig: {
        successConfig: { customToast: <CheckoutSuccessToast /> },
        errorConfig: { customToast: <CheckoutErrorToast /> },
      },
      mutationOptions: {
        retry: shouldRetryOnNetworkError,
        onSuccess: async (response) => {
          const paymentSessionId = response.data?.paymentSessionId;
          if (paymentSessionId) {
            try {
              // Load Cashfree SDK — mode is env-driven so production
              // builds use live payments. Defaults to sandbox when unset.
              const cashfree = await load({
                mode:
                  process.env.NEXT_PUBLIC_CASHFREE_MODE === "production" ? "production" : "sandbox",
              });

              // Open Cashfree checkout
              cashfree.checkout({
                paymentSessionId,
                redirectTarget: "_self", // Redirect in same tab
              });
            } catch (err) {
              console.error("Cashfree checkout error:", err);
            }
          }
        },
      },
    });

  const checkout = (request: CheckoutRequest) => {
    mutate(request as Record<string, unknown>);
  };

  return {
    checkout,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
    reset,
  };
}
