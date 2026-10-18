"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { useApiQuery, useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { RegisterIndividualSchema, RegisterTeamSchema } from "@/lib/api/utils/registration.schema";

// Empty schema for DELETE requests that don't require a body
const EmptyBodySchema = z.object({});
import type { EventCategorySlug, ParticipationType } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface Registration {
  registrationId: string;
  eventSlug: string;
  event: {
    slug: string;
    name: string;
    tagline: string;
    category: EventCategorySlug;
    participationType: ParticipationType;
    imageUrl: string | null;
    startsAt: string | null;
    venue: string | null;
  } | null;
  participationType: "individual" | "duo" | "team";
  status: "pending" | "confirmed" | "cancelled" | "waitlisted";
  team: {
    teamId: string;
    name: string;
    memberCount: number;
  } | null;
  registeredAt: string;
}

interface RegistrationsApiResponse {
  statusCode: number;
  message: string;
  info: string;
  registrations: Registration[];
  count: number;
}

// Response for individual registration
interface RegisterIndividualResponse {
  statusCode: number;
  message: string;
  info: string;
  registrationId: string;
  eventSlug: string;
  eventName: string;
  status: string;
}

// Response for team registration
interface RegisterTeamResponse {
  statusCode: number;
  message: string;
  info: string;
  registrationId: string;
  eventSlug: string;
  eventName: string;
  status: string;
  teamId: string;
  teamName: string;
  memberCount: number;
}

// ═══════════════════════════════════════════════════════════════════
// TOAST COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function RegistrationSuccessToast() {
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
        <p className="text-sm text-emerald-300/70">You&apos;re registered for this event</p>
      </div>
    </div>
  );
}

function RegistrationErrorToast() {
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

function CancelSuccessToast() {
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

function CancelErrorToast() {
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
// useMyRegistrations - Get all registrations for current user
// ═══════════════════════════════════════════════════════════════════

export function useMyRegistrations() {
  const { status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";

  const { data, isLoading, isError, error, refetch } = useApiQuery<RegistrationsApiResponse>({
    queryKey: ["my-registrations"],
    url: "/user/registrations",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      enabled: isAuthenticated, // Only fetch when user is logged in
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      retry: API_RETRY,
      refetchInterval: false, // Disable polling
      refetchOnWindowFocus: true, // Refetch when tab regains focus to get latest data
      refetchOnMount: "always", // Always refetch on mount to ensure fresh data
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch registrations");
    }
    return null;
  }, [error]);

  // Create a Set of registered event slugs for quick lookup (excluding cancelled)
  const registeredEventSlugs = useMemo(() => {
    if (!data?.registrations) return new Set<string>();
    return new Set(
      data.registrations.filter((r) => r.status !== "cancelled").map((r) => r.eventSlug)
    );
  }, [data]);

  // Check if user is registered for a specific event (excludes cancelled)
  const isRegisteredFor = useCallback(
    (eventSlug: string) => registeredEventSlugs.has(eventSlug),
    [registeredEventSlugs]
  );

  // Get active (non-cancelled) registrations
  const activeRegistrations = useMemo(() => {
    if (!data?.registrations) return [];
    return data.registrations.filter((r) => r.status !== "cancelled");
  }, [data]);

  // Get cancelled registrations separately
  const cancelledRegistrations = useMemo(() => {
    if (!data?.registrations) return [];
    return data.registrations.filter((r) => r.status === "cancelled");
  }, [data]);

  // Get registration for a specific event (if exists)
  const getRegistrationFor = useCallback(
    (eventSlug: string) => data?.registrations?.find((r) => r.eventSlug === eventSlug) ?? null,
    [data]
  );

  return {
    registrations: data?.registrations ?? [],
    activeRegistrations,
    cancelledRegistrations,
    count: data?.count ?? 0,
    activeCount: activeRegistrations.length,
    registeredEventSlugs,
    isRegisteredFor,
    getRegistrationFor,
    isLoading: isLoading || sessionStatus === "loading",
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useEventRegisterIndividual - Register for an individual event
// ═══════════════════════════════════════════════════════════════════

export function useEventRegisterIndividual(eventSlug: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, isError, error, data, reset } =
    useApiMutation<RegisterIndividualResponse>({
      url: `/events/${eventSlug}/register`,
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      method: "post",
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: RegisterIndividualSchema },
      toastConfig: {
        successConfig: { customToast: <RegistrationSuccessToast /> },
        errorConfig: { customToast: <RegistrationErrorToast /> },
      },
      mutationOptions: {
        retry: API_RETRY,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
        },
      },
    });

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to register for event"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const register = useCallback(() => {
    mutate({ type: "individual" });
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
// useEventRegisterTeam - Register for a team/duo event
// ═══════════════════════════════════════════════════════════════════

export function useEventRegisterTeam(eventSlug: string) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, isError, error, data, reset } =
    useApiMutation<RegisterTeamResponse>({
      url: `/events/${eventSlug}/register`,
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      method: "post",
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: RegisterTeamSchema },
      toastConfig: {
        successConfig: { customToast: <RegistrationSuccessToast /> },
        errorConfig: { customToast: <RegistrationErrorToast /> },
      },
      mutationOptions: {
        retry: API_RETRY,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
          queryClient.invalidateQueries({ queryKey: ["my-teams"] });
        },
      },
    });

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to register team for event"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const registerWithTeam = useCallback(
    (teamId: string) => {
      mutate({ type: "team", teamId });
    },
    [mutate]
  );

  return {
    registerWithTeam,
    isRegistering: isPending,
    isSuccess,
    isError,
    errorMessage,
    data: data?.data ?? null,
    reset,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useCancelRegistration - Cancel a registration for an event
// ═══════════════════════════════════════════════════════════════════

interface CancelRegistrationResponse {
  statusCode: number;
  message: string;
  info: string;
  eventSlug: string;
  eventName: string;
  participationType: string;
}

export function useCancelRegistration() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentEventSlug, setCurrentEventSlug] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const cancel = useCallback(
    async (eventSlug: string) => {
      setCurrentEventSlug(eventSlug);
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMessage(null);

      try {
        const response = await fetch(`${BACKEND_URL}/events/${eventSlug}/registration`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.info || data.message || "Failed to cancel registration");
        }

        setIsSuccess(true);
        queryClient.invalidateQueries({ queryKey: ["my-registrations"] });
      } catch (err) {
        setIsError(true);
        setErrorMessage(err instanceof Error ? err.message : "Failed to cancel registration");
      } finally {
        setIsPending(false);
      }
    },
    [queryClient]
  );

  const resetState = useCallback(() => {
    setCurrentEventSlug(null);
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
    cancelledEventSlug: currentEventSlug,
    data: null,
    reset: resetState,
  };
}
