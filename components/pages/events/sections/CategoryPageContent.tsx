"use client";

import { ThemedNavbar } from "@/components/navbar";
import type { EventCategory, EventCategorySlug } from "@/lib/api/helper/types";
import {
  useEventsByCategory,
  useMyRegistrations,
  usePaymentStatus,
  CATEGORY_METADATA,
} from "@/lib/api/hooks";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";
import { SubEventCard, CategoryHeader } from "@/components/pages/events/components";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// SLUG MAPPING
// ═══════════════════════════════════════════════════════════════════

const SLUG_TO_CATEGORY: Record<string, EventCategorySlug> = {
  natraj: "NATRAJ",
  crosswindz: "CROSSWINDZ",
  bandish: "BANDISH",
  abhinay: "ABHINAY",
  mirage: "MIRAGE",
  toolika: "TOOLIKA",
  enquizta: "ENQUIZTA",
  samwaad: "SAMWAAD",
  zaika: "ZAIKA",
};

// ═══════════════════════════════════════════════════════════════════
// EVENT CARD SKELETON
// ═══════════════════════════════════════════════════════════════════

function EventCardSkeleton({ index, color }: { index: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(180deg, 
          ${color}10 0%, 
          ${JAZZ_COLORS.BG_DEEP} 30%,
          ${JAZZ_COLORS.BG_ROYAL} 70%,
          ${color}15 100%
        )`,
        border: `1px solid ${color}30`,
        height: "340px",
      }}
    >
      {/* Image skeleton */}
      <div
        className="h-36 w-full animate-pulse"
        style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}
      />

      <div className="p-4">
        {/* Title skeleton */}
        <div
          className="mb-2 h-5 w-3/4 animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />

        {/* Tagline skeleton */}
        <div
          className="mb-3 h-3 w-full animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <div
          className="mb-4 h-3 w-2/3 animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Type badge skeleton */}
        <div className="flex gap-2">
          <div
            className="h-6 w-16 animate-pulse rounded-full"
            style={{ background: `${color}20` }}
          />
          <div
            className="h-6 w-20 animate-pulse rounded-full"
            style={{ background: `${color}15` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INLINE LOADER (6 skeleton cards in grid)
// ═══════════════════════════════════════════════════════════════════

function EventsGridLoader({ color }: { color: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCardSkeleton key={index} index={index} color={color} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ERROR STATE
// ═══════════════════════════════════════════════════════════════════

function EventsError({
  message,
  onRetry,
  color,
}: {
  message: string;
  onRetry: () => void;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "rgba(239, 68, 68, 0.1)" }}
      >
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">Failed to load events</h3>
      <p className="mb-6 text-sm text-gray-400">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        style={{
          background: color,
          color: "#000",
        }}
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EMPTY STATE
// ═══════════════════════════════════════════════════════════════════

function EmptyEvents({ categoryName, color }: { categoryName: string; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: `${color}20` }}
      >
        <span className="text-2xl">🎭</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">No events yet</h3>
      <p className="text-sm text-gray-400">Events for {categoryName} will be announced soon!</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CATEGORY PAGE CONTENT
// Individual category page showing all sub-events
// ═══════════════════════════════════════════════════════════════════

interface CategoryPageContentProps {
  category?: EventCategory; // Legacy prop (from static config)
  categorySlug?: string; // New prop (for API-based fetching)
}

export function CategoryPageContent({
  category: legacyCategory,
  categorySlug,
}: CategoryPageContentProps) {
  // Determine which category to use
  const slug = categorySlug ?? legacyCategory?.slug;
  const categoryKey = slug ? SLUG_TO_CATEGORY[slug.toLowerCase()] : null;

  // Get category metadata first (this is synchronous)
  const categoryMeta = categoryKey ? CATEGORY_METADATA[categoryKey] : null;

  // Fetch events from API if we have a valid category key
  const { events, isLoading, isError, errorMessage, refetch } = useEventsByCategory(
    categoryKey ?? "NATRAJ" // Fallback to prevent hook error, but we check categoryKey below
  );

  // Fetch registrations once at parent level
  const { isRegisteredFor, refetch: refetchRegistrations } = useMyRegistrations();

  // Check payment status
  const { hasPaid } = usePaymentStatus();

  // If no valid category slug provided - show 404 layout
  if (!categoryKey || !categoryMeta) {
    return (
      <>
        <div className="fixed inset-x-0 top-0 z-[200]">
          <ThemedNavbar position="relative" topOffset={18} theme="main" />
        </div>
        <main
          className="flex min-h-screen items-center justify-center px-4 pt-28 pb-20"
          style={{ background: JAZZ_COLORS.BG_DEEP }}
        >
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold">Category not found</h2>
            <p className="mt-2 text-gray-400">The category &quot;{slug}&quot; does not exist.</p>
            <Link
              href="/events"
              className="mt-4 inline-block rounded-lg px-4 py-2 text-sm font-medium"
              style={{ background: COLORS.BRIGHT_GOLD, color: "#000" }}
            >
              Back to Events
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Build category header data from metadata
  const categoryForHeader = legacyCategory ?? {
    id: categoryKey,
    name: categoryMeta.name,
    slug: slug!,
    tagline: categoryMeta.tagline,
    description: categoryMeta.description,
    icon: categoryMeta.icon,
    color: categoryMeta.color,
    subEvents: [], // Will be populated when loaded
  };

  // Build full category with events (only when loaded)
  const subEvents =
    legacyCategory?.subEvents ??
    events.map((e) => ({
      id: e.id,
      slug: e.slug,
      name: e.name,
      tagline: e.tagline,
      description: e.description ?? e.tagline,
      type: e.participationType.toLowerCase() as "individual" | "team" | "duo",
      teamSize:
        e.minTeamSize && e.maxTeamSize ? `${e.minTeamSize}-${e.maxTeamSize} members` : undefined,
      minTeamSize: e.minTeamSize ?? undefined,
      maxTeamSize: e.maxTeamSize ?? undefined,
      registrationOpen: e.registrationOpen,
      image: e.imageUrl ?? undefined,
      prizePool: e.prizePool ?? undefined,
    }));

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="min-h-screen px-4 pt-28 pb-20 sm:px-6 sm:pt-32"
        style={{
          background: `linear-gradient(180deg, 
            ${JAZZ_COLORS.BG_DEEP} 0%, 
            ${JAZZ_COLORS.BG_ROYAL} 30%,
            ${categoryMeta.color}08 50%,
            ${JAZZ_COLORS.BG_ROYAL} 70%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Background glow for category color */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 30%, ${categoryMeta.color} 0%, transparent 60%)
            `,
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl">
          {/* Category header (always shown - metadata is synchronous) */}
          <CategoryHeader category={categoryForHeader} />

          {/* Payment required banner */}
          {!hasPaid && (
            <div
              className="mb-6 flex flex-col items-center justify-between gap-3 rounded-xl border px-5 py-4 sm:flex-row"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
              }}
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-sm text-red-200">
                  You need to purchase a pass to register for events
                </p>
              </div>
              <Link
                href="/passes"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Buy Pass
              </Link>
            </div>
          )}

          {/* Sub-events grid with inline states */}
          {isLoading && !legacyCategory ? (
            <EventsGridLoader color={categoryMeta.color} />
          ) : isError && !legacyCategory ? (
            <EventsError
              message={errorMessage ?? "Something went wrong"}
              onRetry={refetch}
              color={categoryMeta.color}
            />
          ) : subEvents.length === 0 ? (
            <EmptyEvents categoryName={categoryMeta.name} color={categoryMeta.color} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
              {subEvents.map((event, index) => (
                <SubEventCard
                  key={event.id}
                  event={event}
                  categoryColor={categoryMeta.color}
                  index={index}
                  isRegistered={isRegisteredFor(event.slug ?? event.id)}
                  onRegistrationSuccess={refetchRegistrations}
                  canRegister={hasPaid}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
