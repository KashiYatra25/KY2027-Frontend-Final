"use client";

import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type {
  Event,
  EventDetails,
  EventsApiResponse,
  EventDetailsApiResponse,
  EventsQueryParams,
  EventCategorySlug,
} from "@/lib/api/helper/types";

// Re-export types for consumers
export type {
  Event,
  EventDetails,
  EventCategorySlug,
  ParticipationType,
  EventsQueryParams,
  EventCategory,
} from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY METADATA
// ═══════════════════════════════════════════════════════════════════

export const CATEGORY_METADATA: Record<
  EventCategorySlug,
  { name: string; icon: string; color: string; tagline: string; description: string }
> = {
  NATRAJ: {
    name: "Natraj",
    icon: "💃",
    color: "#E91E63",
    tagline: "Dance Events",
    description: "Express yourself through the art of movement",
  },
  CROSSWINDZ: {
    name: "Crosswindz",
    icon: "🎸",
    color: "#9C27B0",
    tagline: "Music Events",
    description: "Where melodies meet magic",
  },
  BANDISH: {
    name: "Bandish",
    icon: "🎵",
    color: "#673AB7",
    tagline: "Classical Music",
    description: "Traditional rhythms, timeless beauty",
  },
  ABHINAY: {
    name: "Abhinay",
    icon: "🎭",
    color: "#3F51B5",
    tagline: "Theatre & Drama",
    description: "Stories that come alive on stage",
  },
  MIRAGE: {
    name: "Mirage",
    icon: "👗",
    color: "#2196F3",
    tagline: "Fashion Events",
    description: "Style meets creativity on the runway",
  },
  TOOLIKA: {
    name: "Toolika",
    icon: "🎨",
    color: "#00BCD4",
    tagline: "Art & Design",
    description: "Canvas of imagination and color",
  },
  ENQUIZTA: {
    name: "Enquizta",
    icon: "🧠",
    color: "#009688",
    tagline: "Quiz Events",
    description: "Test your knowledge, win glory",
  },
  SAMWAAD: {
    name: "Samwaad",
    icon: "🎤",
    color: "#4CAF50",
    tagline: "Literary Events",
    description: "Words that inspire and ignite",
  },
  ZAIKA: {
    name: "Zaika",
    icon: "🍳",
    color: "#FF9800",
    tagline: "Culinary Events",
    description: "A feast for the senses",
  },
};

// ═══════════════════════════════════════════════════════════════════
// useEvents - Fetch all events with optional filters
// ═══════════════════════════════════════════════════════════════════

export function useEvents(params?: EventsQueryParams) {
  // Build query string from params
  const queryString = useMemo(() => {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.set("category", params.category);
    if (params.participationType) searchParams.set("participationType", params.participationType);
    if (params.registrationOpen !== undefined) {
      searchParams.set("registrationOpen", String(params.registrationOpen));
    }
    const qs = searchParams.toString();
    return qs ? `?${qs}` : "";
  }, [params]);

  const { data, isLoading, isError, error, refetch } = useApiQuery<EventsApiResponse>({
    queryKey: ["events", JSON.stringify(params)],
    url: `/events${queryString}`,
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: API_RETRY,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch events");
    }
    return null;
  }, [error]);

  // Group events by category
  const eventsByCategory = useMemo(() => {
    if (!data?.data) return {};
    return data.data.reduce(
      (acc, event) => {
        if (!acc[event.category]) {
          acc[event.category] = [];
        }
        acc[event.category].push(event);
        return acc;
      },
      {} as Record<EventCategorySlug, Event[]>
    );
  }, [data]);

  return {
    events: data?.data ?? [],
    eventsByCategory,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useEvent - Fetch single event by slug
// ═══════════════════════════════════════════════════════════════════

export function useEvent(slug: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useApiQuery<EventDetailsApiResponse>({
    queryKey: ["event", slug ?? ""],
    url: `/events/${slug}`,
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      enabled: !!slug,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: API_RETRY,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch event details");
    }
    return null;
  }, [error]);

  // Get category metadata
  const categoryMeta = data?.data?.category ? CATEGORY_METADATA[data.data.category] : null;

  return {
    event: data?.data ?? null,
    categoryMeta,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useEventsByCategory - Convenience hook for category page
// ═══════════════════════════════════════════════════════════════════

export function useEventsByCategory(category: EventCategorySlug) {
  return useEvents({ category });
}
