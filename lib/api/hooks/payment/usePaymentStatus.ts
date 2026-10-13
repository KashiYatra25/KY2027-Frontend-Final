"use client";

import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface PaymentStatusApiResponse {
  statusCode: number;
  message: string;
  info: string;
  hasPaid: boolean;
  isIITBhuUser: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// usePaymentStatus - Check if user has paid for a pass
// Also returns isIITBhuUser (IIT BHU users get free access)
// ═══════════════════════════════════════════════════════════════════

export function usePaymentStatus() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<PaymentStatusApiResponse>({
    queryKey: ["payment-status"],
    url: "/user/payment-status",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes - payment status doesn't change often
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: API_RETRY,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to check payment status");
    }
    return null;
  }, [error]);

  return {
    hasPaid: data?.hasPaid ?? false,
    isIITBhuUser: data?.isIITBhuUser ?? false,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
