"use client";

import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { load } from "@cashfreepayments/cashfree-js";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT } from "@/lib/api/constants";

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

/**
 * Hook to checkout cart and get Cashfree payment session
 */
export function useCheckout() {
  const { mutate, isPending, isSuccess, isError, error, reset, data } =
    useApiMutation<CheckoutApiResponse>({
      url: "/user/cart/checkout",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: CheckoutSchema },
      mutationOptions: {
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
    data: data?.data,
  };
}
