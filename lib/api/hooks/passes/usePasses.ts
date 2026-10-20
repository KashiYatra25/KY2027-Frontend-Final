"use client";

import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type { PassesApiResponse } from "@/lib/api/helper/types";
import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for fetching festival passes from the backend
 * Uses wire-axon's useApiQuery for consistent API fetching
 */
export function usePasses() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<PassesApiResponse>({
    queryKey: ["passes"],
    url: "/pass",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: shouldRetryOnNetworkError,
      // Disable placeholderData to fix DevTools "Restore Loading" causing blank UI
      // wire-axon defaults to keepPreviousData which breaks when cache is cleared
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch passes");
    }
    return null;
  }, [error]);

  return {
    passes: data?.passes ?? [],
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
