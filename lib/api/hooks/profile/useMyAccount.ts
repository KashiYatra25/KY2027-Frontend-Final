"use client";

import { useQuery } from "@apollo/client/react";
import type { DocumentNode } from "graphql";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import {
  FULL_ACCOUNT_QUERY,
  ACCOUNT_PROGRESS_WITH_STEPS_QUERY,
  USER_NAVBAR_DISPLAY_QUERY,
  ACCOUNT_ACCESS_STATUS_QUERY,
} from "@/lib/api/graphql";
import type {
  FullAccountQueryResponse,
  AccountProgressWithStepsQueryResponse,
  UserNavbarDisplayQueryResponse,
  AccountAccessStatusQueryResponse,
  UserProfile,
  UserAccountProgress,
  ProgressSteps,
} from "@/lib/api/helper/types";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type AccountQueryType = "full" | "navbar" | "access" | "progress";

type QueryResponseMap = {
  full: FullAccountQueryResponse;
  navbar: UserNavbarDisplayQueryResponse;
  access: AccountAccessStatusQueryResponse;
  progress: AccountProgressWithStepsQueryResponse;
};

interface UseMyAccountOptions {
  /** Skip the query (useful for conditional fetching) */
  skip?: boolean;
  /** Fetch policy for Apollo */
  fetchPolicy?: "cache-first" | "cache-and-network" | "network-only" | "no-cache";
}

interface UseMyAccountReturn {
  // Auth State
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  // Profile Data (from full & navbar queries)
  profile: UserProfile | null;
  userId: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  isFromIITBhu: boolean;
  userRole: "MASTER_ADMIN" | "MANAGER" | "OPERATOR" | "USER" | null;

  // Progress Data
  progress: UserAccountProgress | null;
  steps: ProgressSteps | null;
  completedSteps: number;
  totalSteps: number;
  completionPercentage: number;
  currentStep: number;

  // Status Flags
  isProfileComplete: boolean;
  accountStatus: "ACTIVE" | "SUSPENDED";
  isAccountActive: boolean;
  canAccessGatedFeatures: boolean;

  // Query State
  isLoading: boolean;
  isError: boolean;
  isSuspensionError: boolean;
  errorMessage: string | null;

  // Raw data
  data: QueryResponseMap[AccountQueryType] | undefined;

  // Actions
  refetch: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// QUERY MAP
// ═══════════════════════════════════════════════════════════════════

const queryMap: Record<AccountQueryType, DocumentNode> = {
  full: FULL_ACCOUNT_QUERY,
  navbar: USER_NAVBAR_DISPLAY_QUERY,
  access: ACCOUNT_ACCESS_STATUS_QUERY,
  progress: ACCOUNT_PROGRESS_WITH_STEPS_QUERY,
};

// ═══════════════════════════════════════════════════════════════════
// useMyAccount Hook
// Unified hook for all account-related GraphQL queries
//
// Usage:
//   const { profile, progress } = useMyAccount("full");           // Full data
//   const { displayName, avatarUrl, completionPercentage } = useMyAccount("navbar");  // Navbar
//   const { isProfileComplete, canAccessGatedFeatures } = useMyAccount("access");     // Lightweight
//   const { steps, currentStep } = useMyAccount("progress");      // Progress wizard
// ═══════════════════════════════════════════════════════════════════

export function useMyAccount<T extends AccountQueryType = "full">(
  queryType: T = "full" as T,
  options?: UseMyAccountOptions
): UseMyAccountReturn {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const query = queryMap[queryType];

  const { data, loading, error, refetch } = useQuery<QueryResponseMap[T]>(query, {
    skip: !isAuthenticated || options?.skip,
    fetchPolicy: options?.fetchPolicy ?? "cache-first",
  });

  // Extract account data - shape varies by query type
  const myAccount = (data as FullAccountQueryResponse | undefined)?.myAccount;

  // Profile data (available in full & navbar queries)
  const profile = (myAccount as FullAccountQueryResponse["myAccount"])?.profile ?? null;
  const userId = profile?.id ?? null;

  // Derived display values
  const displayName = profile?.firstName
    ? `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`
    : null;
  const avatarUrl = profile?.candidatePhotoUrl || profile?.googleAvatarUrl || null;
  const isFromIITBhu = profile?.isFromIITBhu ?? false;
  const userRole = profile?.role?.level ?? null;

  // Progress data (available in full, navbar, access, progress queries)
  const progress = (myAccount as FullAccountQueryResponse["myAccount"])?.progress ?? null;
  const steps = (progress as { steps?: ProgressSteps })?.steps ?? null;
  const completedSteps = progress?.completedSteps ?? 0;
  const totalSteps = progress?.totalSteps ?? 4;
  const completionPercentage = progress?.completionPercentage ?? 0;
  const currentStep = progress?.currentStep ?? 1;

  // Status flags
  const isProfileComplete = progress?.isProfileComplete ?? false;
  const accountStatus = progress?.accountStatus ?? "ACTIVE";
  const isAccountActive = accountStatus === "ACTIVE";
  const canAccessGatedFeatures = isProfileComplete && isAccountActive;

  // Check if error is specifically an account suspension error
  const isSuspensionError = useMemo(() => {
    if (!error) return false;
    const errorString = error.message || "";
    return /account.*suspended|suspended.*account/i.test(errorString);
  }, [error]);

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch account data");
    }
    return null;
  }, [error]);

  return {
    // Auth State
    isAuthenticated,
    isAuthLoading: status === "loading",

    // Profile Data
    profile,
    userId,
    displayName,
    avatarUrl,
    isFromIITBhu,
    userRole,

    // Progress Data
    progress,
    steps,
    completedSteps,
    totalSteps,
    completionPercentage,
    currentStep,

    // Status Flags
    isProfileComplete,
    accountStatus,
    isAccountActive,
    canAccessGatedFeatures,

    // Query State
    isLoading: loading,
    isError: !!error,
    isSuspensionError,
    errorMessage,

    // Raw data
    data,

    // Actions
    refetch,
  };
}
