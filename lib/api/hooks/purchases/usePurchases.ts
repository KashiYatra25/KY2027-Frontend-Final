"use client";

import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface PurchaseItem {
  passId: string;
  passName: string;
  quantity: number;
  unitPrice: number;
}

export interface Purchase {
  id: string;
  orderId: string;
  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED";
  items: PurchaseItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  couponCode: string | null;
  paymentMethod: "EXTERNAL" | "WEB_APP";
  paidAt: string | null;
  createdAt: string;
}

interface PurchasesApiResponse {
  statusCode: number;
  message: string;
  info: string;
  purchases: Purchase[];
  count: number;
}

// ═══════════════════════════════════════════════════════════════════
// usePurchases - Get user's purchase history
// ═══════════════════════════════════════════════════════════════════

export function usePurchases() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<PurchasesApiResponse>({
    queryKey: ["my-purchases"],
    url: "/user/purchases",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      retry: API_RETRY,
      refetchOnWindowFocus: true,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch purchases");
    }
    return null;
  }, [error]);

  // Separate purchases by status
  const paidPurchases = useMemo(() => {
    return data?.purchases?.filter((p) => p.status === "PAID") ?? [];
  }, [data?.purchases]);

  const pendingPurchases = useMemo(() => {
    return data?.purchases?.filter((p) => p.status === "PENDING") ?? [];
  }, [data?.purchases]);

  return {
    purchases: data?.purchases ?? [],
    paidPurchases,
    pendingPurchases,
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
