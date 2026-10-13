"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { useApiQuery, useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { RegisterIndividualSchema, RegisterTeamSchema } from "@/lib/api/utils/registration.schema";
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
  data: Registration[];
  count: number;
}

interface RegisterResponse {
  statusCode: number;
  message: string;
  info: string;
  data: {
    registrationId: string;
    eventSlug: string;
    eventName: string;
    status: string;
    teamId?: string;
    teamName?: string;
    memberCount?: number;
  };
}

// ═══════════════════════════════════════════════════════════════════
// useMyRegistrations - Get all registrations for current user
// ═══════════════════════════════════════════════════════════════════

export function useMyRegistrations() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<RegistrationsApiResponse>({
    queryKey: ["my-registrations"],
    url: "/user/registrations",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      retry: API_RETRY,
      refetchInterval: false, // Disable polling
      refetchOnWindowFocus: false, // Don't refetch when tab regains focus
      refetchOnMount: false, // Don't refetch on every mount if data exists
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch registrations");
    }
    return null;
  }, [error]);

  // Create a Set of registered event slugs for quick lookup
  const registeredEventSlugs = useMemo(() => {
    if (!data?.data) return new Set<string>();
    return new Set(data.data.map((r) => r.eventSlug));
  }, [data]);

  // Check if user is registered for a specific event
  const isRegisteredFor = useCallback(
    (eventSlug: string) => registeredEventSlugs.has(eventSlug),
    [registeredEventSlugs]
  );

  // Get registration for a specific event (if exists)
  const getRegistrationFor = useCallback(
    (eventSlug: string) => data?.data?.find((r) => r.eventSlug === eventSlug) ?? null,
    [data]
  );

  return {
    registrations: data?.data ?? [],
    count: data?.count ?? 0,
    registeredEventSlugs,
    isRegisteredFor,
    getRegistrationFor,
    isLoading,
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
    useApiMutation<RegisterResponse>({
      url: `/events/${eventSlug}/register`,
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      method: "post",
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: RegisterIndividualSchema },
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
    data: data?.data?.data ?? null,
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
    useApiMutation<RegisterResponse>({
      url: `/events/${eventSlug}/register`,
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      method: "post",
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: RegisterTeamSchema },
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
    data: data?.data?.data ?? null,
    reset,
  };
}
