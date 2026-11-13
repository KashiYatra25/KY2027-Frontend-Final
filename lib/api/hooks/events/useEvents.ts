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
  Event,
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

// Colors derived from hue values in events.ts to match main events page:
// Abhinay h:4 → red/crimson, Bandish h:36 → orange/gold, Crosswindz h:222 → blue,
// Enquizta h:285 → purple/violet, Mirage h:258 → blue-violet, Natraj h:325 → magenta/pink,
// Samwaad h:205 → cyan/teal, Toolika h:95 → yellow-green
export const CATEGORY_METADATA: Record<
  EventCategorySlug,
  { name: string; icon: string; color: string; tagline: string; description: string }
> = {
  NATRAJ: {
    name: "Natraj",
    icon: "💃",
    color: "hsl(325 80% 55%)", // h:325 - magenta/pink
    tagline: "Dance Events",
    description: "Dance like the cosmos is watching",
  },
  CROSSWINDZ: {
    name: "Crosswindz",
    icon: "🎸",
    color: "hsl(222 70% 55%)", // h:222 - blue
    tagline: "Music Events",
    description: "Where melodies meet the soul",
  },
  BANDISH: {
    name: "Bandish",
    icon: "🎵",
    color: "hsl(36 85% 50%)", // h:36 - orange/gold
    tagline: "Indian Classical",
    description: "Classical notes, timeless beauty",
  },
  ABHINAY: {
    name: "Abhinay",
    icon: "🎭",
    color: "hsl(4 75% 50%)", // h:4 - red/crimson (matching the theatre theme!)
    tagline: "Theatre & Drama",
    description: "The world is a stage",
  },
  MIRAGE: {
    name: "Mirage",
    icon: "👗",
    color: "hsl(258 70% 60%)", // h:258 - blue-violet
    tagline: "Fashion Events",
    description: "Where fashion meets fantasy",
  },
  TOOLIKA: {
    name: "Toolika",
    icon: "🎨",
    color: "hsl(95 60% 45%)", // h:95 - yellow-green
    tagline: "Art & Design",
    description: "Art speaks where words fail",
  },
  ENQUIZTA: {
    name: "Enquizta",
    icon: "🧠",
    color: "hsl(285 65% 55%)", // h:285 - purple/violet
    tagline: "Quiz Events",
    description: "Knowledge is the ultimate power",
  },
  SAMWAAD: {
    name: "Samwaad",
    icon: "🎤",
    color: "hsl(205 70% 50%)", // h:205 - cyan/teal
    tagline: "Literary Events",
    description: "The power of words",
  },
  ZAIKA: {
    name: "Zaika",
    icon: "🍳",
    color: "hsl(30 90% 50%)", // warm orange for culinary
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
      retry: shouldRetryOnNetworkError,
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
    const result: Partial<Record<EventCategorySlug, Event[]>> = {};
    if (!data?.events) return result;
    return data.events.reduce((acc, event) => {
      if (!acc[event.category]) {
        acc[event.category] = [];
      }
      acc[event.category]!.push(event);
      return acc;
    }, result);
  }, [data]);

  return {
    events: data?.events ?? [],
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
      retry: shouldRetryOnNetworkError,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch event details");
    }
    return null;
  }, [error]);

  // Get category metadata
  const categoryMeta = data?.event?.category ? CATEGORY_METADATA[data.event.category] : null;

  return {
    event: data?.event ?? null,
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
