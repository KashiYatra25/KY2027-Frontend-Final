"use client";

import { useQuery } from "@apollo/client/react";
import type { DocumentNode } from "graphql";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import {
  FULL_CA_INFO_QUERY,
  CA_APPLICATION_STATUS_QUERY,
  CA_PROFILE_QUERY,
} from "@/lib/api/graphql";
import type {
  FullCaInfoQueryResponse,
  CaApplicationStatusQueryResponse,
  CaProfileQueryResponse,
  CAApplicationStatus,
} from "@/lib/api/helper/types/ca.types";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type CaQueryType = "full" | "status" | "profile";

type QueryResponseMap = {
  full: FullCaInfoQueryResponse;
  status: CaApplicationStatusQueryResponse;
  profile: CaProfileQueryResponse;
};

interface UseCaInfoOptions {
  /** Skip the query (useful for conditional fetching) */
  skip?: boolean;
  /** Fetch policy for Apollo */
  fetchPolicy?: "cache-first" | "cache-and-network" | "network-only" | "no-cache";
}

interface UseCaInfoReturn {
  // Auth State
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  // Application State (available in full & status queries)
  hasApplied: boolean;
  applicationStatus: CAApplicationStatus | null;
  rejectionReason: string | null;
  appliedAt: string | null;
  updatedAt: string | null;

  // Status Flags
  isPending: boolean;
  isApproved: boolean;
  isRejected: boolean;

  // Profile State (available in full & profile queries)
  referralId: string | null;
  numberOfReferrals: number | null;
  approvedAt: string | null;

  // Query State
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;

  // Raw data
  data:
    FullCaInfoQueryResponse | CaApplicationStatusQueryResponse | CaProfileQueryResponse | undefined;

  // Actions
  refetch: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// QUERY MAP
// ═══════════════════════════════════════════════════════════════════

const queryMap: Record<CaQueryType, DocumentNode> = {
  full: FULL_CA_INFO_QUERY,
  status: CA_APPLICATION_STATUS_QUERY,
  profile: CA_PROFILE_QUERY,
};

// ═══════════════════════════════════════════════════════════════════
// useCaInfo Hook
// Flexible hook - accepts query type to fetch different CA data
//
// Usage:
//   const { hasApplied, applicationStatus } = useCaInfo("status");  // Lightweight
//   const { referralId, numberOfReferrals } = useCaInfo("profile"); // Profile only
//   const { ... } = useCaInfo("full");                              // Everything
// ═══════════════════════════════════════════════════════════════════

export function useCaInfo<T extends CaQueryType = "full">(
  queryType: T = "full" as T,
  options?: UseCaInfoOptions
): UseCaInfoReturn {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const query = queryMap[queryType];

  const { data, loading, error, refetch } = useQuery<QueryResponseMap[T]>(query, {
    skip: !isAuthenticated || options?.skip,
    fetchPolicy: options?.fetchPolicy ?? "cache-and-network",
  });

  // Extract data based on query type
  const caInfo = data?.myCaInfo;

  // Application data (from full & status queries)
  const hasApplied = (caInfo as FullCaInfoQueryResponse["myCaInfo"])?.hasApplied ?? false;
  const application = (caInfo as FullCaInfoQueryResponse["myCaInfo"])?.application;
  const applicationStatus = application?.status ?? null;
  const rejectionReason =
    (application as { rejectionReason?: string | null })?.rejectionReason ?? null;
  const appliedAt = application?.appliedAt ?? null;
  const updatedAt = (application as { updatedAt?: string })?.updatedAt ?? null;

  // Profile data (from full & profile queries)
  const profile = (
    caInfo as FullCaInfoQueryResponse["myCaInfo"] | CaProfileQueryResponse["myCaInfo"]
  )?.profile;
  const referralId = profile?.referralId ?? null;
  const numberOfReferrals = profile?.numberOfReferrals ?? null;
  const approvedAt = profile?.approvedAt ?? null;

  // Status flags
  const isPending = hasApplied && applicationStatus === "PENDING";
  const isApproved = hasApplied && applicationStatus === "ACCEPTED";
  const isRejected = hasApplied && applicationStatus === "REJECTED";

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch CA information");
    }
    return null;
  }, [error]);

  return {
    // Auth State
    isAuthenticated,
    isAuthLoading: status === "loading",

    // Application State
    hasApplied,
    applicationStatus,
    rejectionReason,
    appliedAt,
    updatedAt,

    // Status Flags
    isPending,
    isApproved,
    isRejected,

    // Profile State
    referralId,
    numberOfReferrals,
    approvedAt,

    // Query State
    isLoading: loading,
    isError: !!error,
    errorMessage,

    // Raw data
    data,

    // Actions
    refetch,
  };
}
