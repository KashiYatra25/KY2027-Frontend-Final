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
import type {
  ScheduleApiResponse,
  VenuesApiResponse,
  FestDaysApiResponse,
  VenueScheduleApiResponse,
  ScheduledEvent,
  ScheduleQueryParams,
  CategoryMetadataMap,
} from "@/lib/api/helper/types";

// Re-export types for consumers
export type {
  ScheduledEvent,
  Venue,
  FestDaysMap,
  ScheduleQueryParams,
  ScheduledEventData,
  ScheduledEventCategory,
  MapLayers,
  Layer,
} from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY METADATA
// Static metadata for UI display (icons, colors) - backend only sends id/name/slug
// ═══════════════════════════════════════════════════════════════════

export const SCHEDULE_CATEGORY_METADATA: CategoryMetadataMap = {
  natraj: {
    name: "Natraj",
    icon: "💃",
    color: "#E91E63",
    tagline: "Dance Events",
  },
  crosswindz: {
    name: "Crosswindz",
    icon: "🎸",
    color: "#9C27B0",
    tagline: "Music Events",
  },
  bandish: {
    name: "Bandish",
    icon: "🎵",
    color: "#673AB7",
    tagline: "Classical Music",
  },
  abhinay: {
    name: "Abhinay",
    icon: "🎭",
    color: "#3F51B5",
    tagline: "Theatre & Drama",
  },
  mirage: {
    name: "Mirage",
    icon: "👗",
    color: "#2196F3",
    tagline: "Fashion Events",
  },
  toolika: {
    name: "Toolika",
    icon: "🎨",
    color: "#00BCD4",
    tagline: "Art & Design",
  },
  enquizta: {
    name: "Enquizta",
    icon: "🧠",
    color: "#009688",
    tagline: "Quiz Events",
  },
  samwaad: {
    name: "Samwaad",
    icon: "🎤",
    color: "#4CAF50",
    tagline: "Literary Events",
  },
  zaika: {
    name: "Zaika",
    icon: "🍳",
    color: "#FF9800",
    tagline: "Culinary Events",
  },
};

// ═══════════════════════════════════════════════════════════════════
// useSchedule - Fetch full schedule (events + venues + days)
// Main hook for the schedule page
// ═══════════════════════════════════════════════════════════════════

export function useSchedule(params?: ScheduleQueryParams) {
  // Build query string from params
  const queryString = useMemo(() => {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    if (params.day) searchParams.set("day", String(params.day));
    if (params.venue) searchParams.set("venue", params.venue);
    if (params.category) searchParams.set("category", params.category);
    const qs = searchParams.toString();
    return qs ? `?${qs}` : "";
  }, [params]);

  const { data, isLoading, isError, error, refetch } = useApiQuery<ScheduleApiResponse>({
    queryKey: ["schedule", JSON.stringify(params)],
    url: `/schedule${queryString}`,
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes - schedule data doesn't change often
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: shouldRetryOnNetworkError,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch schedule");
    }
    return null;
  }, [error]);

  // Group events by day for easy rendering
  const eventsByDay = useMemo(() => {
    const result: Record<number, ScheduledEvent[]> = {};
    if (!data?.scheduledEvents) return result;

    for (const event of data.scheduledEvents) {
      if (!result[event.day]) {
        result[event.day] = [];
      }
      result[event.day].push(event);
    }
    return result;
  }, [data]);

  // Group events by venue for sidebar/search
  const eventsByVenue = useMemo(() => {
    const result: Record<string, ScheduledEvent[]> = {};
    if (!data?.scheduledEvents) return result;

    for (const event of data.scheduledEvents) {
      const venueSlug = event.venue.slug;
      if (!result[venueSlug]) {
        result[venueSlug] = [];
      }
      result[venueSlug].push(event);
    }
    return result;
  }, [data]);

  // Get clickable venues only (for map interactions)
  const clickableVenues = useMemo(() => {
    return (data?.venues ?? []).filter((v) => v.clickable !== false);
  }, [data?.venues]);

  return {
    // Raw data
    scheduledEvents: data?.scheduledEvents ?? [],
    venues: data?.venues ?? [],
    festDays: data?.festDays ?? {},
    // Computed data
    eventsByDay,
    eventsByVenue,
    clickableVenues,
    count: data?.count ?? 0,
    // Status
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useVenues - Fetch only venues (for map-only rendering)
// ═══════════════════════════════════════════════════════════════════

export function useVenues() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<VenuesApiResponse>({
    queryKey: ["schedule-venues"],
    url: "/schedule/venues",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 10, // 10 minutes - venues rarely change
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: shouldRetryOnNetworkError,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch venues");
    }
    return null;
  }, [error]);

  const clickableVenues = useMemo(() => {
    return (data?.venues ?? []).filter((v) => v.clickable !== false);
  }, [data?.venues]);

  return {
    venues: data?.venues ?? [],
    clickableVenues,
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useFestDays - Fetch only fest days
// ═══════════════════════════════════════════════════════════════════

export function useFestDays() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<FestDaysApiResponse>({
    queryKey: ["schedule-fest-days"],
    url: "/schedule/days",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 30, // 30 minutes - fest days never change
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: shouldRetryOnNetworkError,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch festival days");
    }
    return null;
  }, [error]);

  return {
    festDays: data?.festDays ?? [],
    festDaysMap: data?.festDaysMap ?? {},
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useVenueSchedule - Fetch schedule for a specific venue
// Used on venue detail pages
// ═══════════════════════════════════════════════════════════════════

export function useVenueSchedule(venueSlug: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useApiQuery<VenueScheduleApiResponse>({
    queryKey: ["schedule-venue", venueSlug ?? ""],
    url: `/schedule/venue/${venueSlug}`,
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      enabled: !!venueSlug,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: shouldRetryOnNetworkError,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch venue schedule");
    }
    return null;
  }, [error]);

  // Reconstruct full ScheduledEvent with venue for components that need it
  const scheduledEvents = useMemo(() => {
    if (!data?.scheduledEvents || !data?.venue) return [];
    return data.scheduledEvents.map((e) => ({
      ...e,
      venue: data.venue,
    })) as ScheduledEvent[];
  }, [data]);

  return {
    venue: data?.venue ?? null,
    scheduledEvents,
    eventsByDay: data?.eventsByDay ?? {},
    festDays: data?.festDays ?? {},
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// Helper: Get category metadata by slug
// ═══════════════════════════════════════════════════════════════════

export function getCategoryMeta(slug: string) {
  return SCHEDULE_CATEGORY_METADATA[slug.toLowerCase()] ?? null;
}
