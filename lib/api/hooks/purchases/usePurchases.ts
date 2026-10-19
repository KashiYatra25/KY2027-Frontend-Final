"use client";

import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// Mirrors the backend getMyPurchases controller response.
// ═══════════════════════════════════════════════════════════════════

export type PurchaseSource =
  "konfhub" | "manual_qr" | "manual_cash" | "manual_other" | "complimentary";

export type PurchaseStatus =
  "PENDING_VERIFICATION" | "VERIFIED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED" | "REJECTED";

/**
 * Benefits bundled with a pass. All optional — the backend only sends
 * what applies to the purchased tier.
 */
export interface PurchaseBenefits {
  festivalEntry?: boolean;
  allDaysAccess?: boolean;
  proNiteAccess?: boolean;
  proNiteSeating?: "none" | "general" | "priority" | "vip";
  welcomeKit?: boolean;
  tshirt?: boolean;
  merchandise?: boolean;
  mealsIncluded?: number;
  refreshments?: boolean;
  backstageAccess?: boolean;
  workshopAccess?: boolean;
  meetAndGreet?: boolean;
  accommodationIncluded?: boolean;
  accommodationType?: string | null;
  custom?: Array<{ name: string; description?: string; value?: unknown }>;
}

export interface Purchase {
  id: string;
  source: PurchaseSource;
  passType: string;
  amountPaid: number;
  currency: string;
  status: PurchaseStatus;
  benefits: PurchaseBenefits;

  // Dates (ISO strings)
  createdAt: string;
  verifiedAt?: string | null;
  checkedInAt?: string | null;

  // Manual-verification flow
  isPending: boolean;
  rejectionReason?: string | null;

  // KonfHub-specific
  konfhubBookingId?: string | null;
  konfhubTicketName?: string | null;
  ticketUrl?: string | null;
  invoiceUrl?: string | null;
}

interface PurchasesApiResponse {
  statusCode: number;
  message: string;
  info: string;
  purchases: Purchase[];
  active: Purchase[];
  history: Purchase[];
  count: number;
}

// Statuses that represent a valid, usable pass.
const ACTIVE_STATUSES: PurchaseStatus[] = ["VERIFIED", "CHECKED_IN"];

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

  // Destructure into stable locals so memo dependencies are unambiguous.
  const allPurchases = data?.purchases;
  const backendActive = data?.active;
  const backendHistory = data?.history;

  // Active (usable) passes — prefer the backend's `active` array, fall back
  // to filtering locally so the UI is resilient to older responses.
  const activePurchases = useMemo(() => {
    if (backendActive) return backendActive;
    return allPurchases?.filter((p) => ACTIVE_STATUSES.includes(p.status)) ?? [];
  }, [backendActive, allPurchases]);

  const pendingPurchases = useMemo(() => {
    return allPurchases?.filter((p) => p.status === "PENDING_VERIFICATION") ?? [];
  }, [allPurchases]);

  const historyPurchases = useMemo(() => {
    if (backendHistory) return backendHistory;
    return (
      allPurchases?.filter((p) => ["CANCELLED", "REJECTED", "CHECKED_OUT"].includes(p.status)) ?? []
    );
  }, [backendHistory, allPurchases]);

  return {
    purchases: allPurchases ?? [],
    activePurchases,
    pendingPurchases,
    historyPurchases,
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
