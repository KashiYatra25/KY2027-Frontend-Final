"use client";

import { useMemo, useCallback, useState } from "react";
import { useApiQuery, useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// Empty schema for requests without body
const EmptyBodySchema = z.object({});

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface ZonalPass {
  passType: "SINGLE_EVENT" | "MULTI_EVENT";
  amount: number;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  ticketUrl?: string;
  invoiceUrl?: string;
  purchasedAt: string;
}

export interface ZonalCollegeData {
  collegeSlug: string;
  passes: ZonalPass[];
  eventLimit: number; // -1 = unlimited, 1 = single, 0 = none
  registeredEvents: string[];
}

interface ZonalPassesResponse {
  statusCode: number;
  message: string;
  info: string;
  colleges: ZonalCollegeData[];
  count: number;
}

interface ZonalRegisterResponse {
  statusCode: number;
  message: string;
  info: string;
  collegeSlug: string;
  eventSlug: string;
  registeredEvents: string[];
}

interface ZonalCancelResponse {
  statusCode: number;
  message: string;
  info: string;
  collegeSlug: string;
  eventSlug: string;
  registeredEvents: string[];
}

// ═══════════════════════════════════════════════════════════════════
// TOAST COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function ZonalRegisterSuccessToast() {
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
        <p className="font-semibold text-emerald-100">Registration Successful</p>
        <p className="text-sm text-emerald-300/70">You&apos;re registered for this zonal event</p>
      </div>
    </div>
  );
}

function ZonalRegisterErrorToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
        }}
      >
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-red-100">Registration Failed</p>
        <p className="text-sm text-red-300/70">Please try again later</p>
      </div>
    </div>
  );
}

function ZonalCancelSuccessToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.3))",
          boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)",
        }}
      >
        <AlertCircle className="h-5 w-5 text-amber-400" />
      </div>
      <div>
        <p className="font-semibold text-amber-100">Registration Cancelled</p>
        <p className="text-sm text-amber-300/70">You can register again anytime</p>
      </div>
    </div>
  );
}

function ZonalCancelErrorToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
        }}
      >
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-red-100">Cancellation Failed</p>
        <p className="text-sm text-red-300/70">Please try again later</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// useMyZonalPasses - Get all zonal passes for current user
// ═══════════════════════════════════════════════════════════════════

export function useMyZonalPasses() {
  const { status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";

  const { data, isLoading, isError, error, refetch } = useApiQuery<ZonalPassesResponse>({
    queryKey: ["my-zonal-passes"],
    url: "/zonals/my-passes",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      retry: API_RETRY,
      refetchOnWindowFocus: true,
      refetchOnMount: "always",
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch zonal passes");
    }
    return null;
  }, [error]);

  // Get data for a specific college
  const getCollegeData = useCallback(
    (collegeSlug: string): ZonalCollegeData | null => {
      return data?.colleges?.find((c) => c.collegeSlug === collegeSlug) ?? null;
    },
    [data]
  );

  // Check if user has any pass for a college
  const hasPassFor = useCallback(
    (collegeSlug: string): boolean => {
      const college = getCollegeData(collegeSlug);
      return (college?.passes?.length ?? 0) > 0;
    },
    [getCollegeData]
  );

  // Check if user can register for more events at a college
  const canRegisterAt = useCallback(
    (collegeSlug: string): boolean => {
      const college = getCollegeData(collegeSlug);
      if (!college) return false;
      if (college.eventLimit === -1) return true; // Unlimited
      if (college.eventLimit === 0) return false; // No pass
      return college.registeredEvents.length < college.eventLimit;
    },
    [getCollegeData]
  );

  // Check if user is registered for a specific event
  const isRegisteredFor = useCallback(
    (collegeSlug: string, eventSlug: string): boolean => {
      const college = getCollegeData(collegeSlug);
      return college?.registeredEvents?.includes(eventSlug) ?? false;
    },
    [getCollegeData]
  );

  // Get pass type for a college (returns best pass type if multiple)
  const getPassType = useCallback(
    (collegeSlug: string): "SINGLE_EVENT" | "MULTI_EVENT" | null => {
      const college = getCollegeData(collegeSlug);
      if (!college || college.passes.length === 0) return null;
      // Multi takes precedence
      if (college.passes.some((p) => p.passType === "MULTI_EVENT")) {
        return "MULTI_EVENT";
      }
      return "SINGLE_EVENT";
    },
    [getCollegeData]
  );

  return {
    colleges: data?.colleges ?? [],
    count: data?.count ?? 0,
    getCollegeData,
    hasPassFor,
    canRegisterAt,
    isRegisteredFor,
    getPassType,
    isLoading: isLoading || sessionStatus === "loading",
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useZonalEventRegister - Register for a zonal event
// ═══════════════════════════════════════════════════════════════════

export function useZonalEventRegister(collegeSlug: string, eventSlug: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, isError, error, data, reset } =
    useApiMutation<ZonalRegisterResponse>({
      url: `/zonals/${collegeSlug}/events/${eventSlug}/register`,
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      method: "post",
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: EmptyBodySchema },
      toastConfig: {
        successConfig: { customToast: <ZonalRegisterSuccessToast /> },
        errorConfig: { customToast: <ZonalRegisterErrorToast /> },
      },
      mutationOptions: {
        retry: API_RETRY,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["my-zonal-passes"] });
        },
        onError: (err) => {
          setErrorMessage(extractErrorMessage(err, "Failed to register for event"));
        },
      },
    });

  const register = useCallback(() => {
    setErrorMessage(null);
    mutate({});
  }, [mutate]);

  return {
    register,
    isRegistering: isPending,
    isSuccess,
    isError,
    errorMessage,
    data: data?.data ?? null,
    reset,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useZonalEventCancel - Cancel a zonal event registration
// ═══════════════════════════════════════════════════════════════════

export function useZonalEventCancel(collegeSlug: string, eventSlug: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const cancel = useCallback(async () => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/zonals/${collegeSlug}/events/${eventSlug}/registration`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.info || data.message || "Failed to cancel registration");
      }

      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["my-zonal-passes"] });
    } catch (err) {
      setIsError(true);
      setErrorMessage(err instanceof Error ? err.message : "Failed to cancel registration");
    } finally {
      setIsPending(false);
    }
  }, [collegeSlug, eventSlug, queryClient]);

  const reset = useCallback(() => {
    setErrorMessage(null);
    setIsSuccess(false);
    setIsError(false);
  }, []);

  return {
    cancel,
    isCancelling: isPending,
    isSuccess,
    isError,
    errorMessage,
    reset,
  };
}
