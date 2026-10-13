"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type { CartApiResponse } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// useGetMyCart Hook
// Fetches the current user's cart
// ═══════════════════════════════════════════════════════════════════

export function useGetMyCart() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const { data, isLoading, isError, error, refetch } = useApiQuery<CartApiResponse>({
    queryKey: ["my-cart"],
    url: "/user/cart",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: API_RETRY,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch cart");
    }
    return null;
  }, [error]);

  return {
    items: data?.items ?? [],
    totalQuantity: data?.totalQuantity ?? 0,
    isEmpty: (data?.items?.length ?? 0) === 0,
    isLoading: isAuthenticated && isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
