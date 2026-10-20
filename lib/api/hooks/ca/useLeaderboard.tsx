"use client";

import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";
import {
  BACKEND_URL,
  sharedFeatureConfig,
  API_TIMEOUT,
  shouldRetryOnNetworkError,
} from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface LeaderboardEntry {
  rank: number;
  id: string;
  referralId: string;
  referralCount: number;
  name: string;
  avatarUrl: string | null;
  college: string | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface LeaderboardApiResponse {
  statusCode: number;
  message: string;
  info: string;
  leaderboard: LeaderboardEntry[];
  pagination: PaginationInfo;
}

export type SortField = "referrals" | "name" | "college";
export type SortOrder = "asc" | "desc";

interface UseLeaderboardOptions {
  page?: number;
  limit?: number;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for fetching CA leaderboard with pagination and sorting
 * Public endpoint - no auth required
 */
export function useLeaderboard(options?: UseLeaderboardOptions) {
  const page = options?.page || 1;
  const limit = options?.limit || 10;
  const sortBy = options?.sortBy || "referrals";
  const sortOrder = options?.sortOrder || "desc";

  const queryString = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const { data, isLoading, isError, error, refetch } = useApiQuery<LeaderboardApiResponse>({
    queryKey: ["ca-leaderboard", String(page), String(limit), sortBy, sortOrder],
    url: `/campus-ambassador/leaderboard${queryString}`,
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: shouldRetryOnNetworkError,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch leaderboard");
    }
    return null;
  }, [error]);

  return {
    leaderboard: data?.leaderboard ?? [],
    pagination: data?.pagination ?? {
      page: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
