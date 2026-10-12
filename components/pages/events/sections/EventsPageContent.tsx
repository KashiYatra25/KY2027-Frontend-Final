"use client";

import { ThemedNavbar } from "@/components/navbar";
import { useEvents, CATEGORY_METADATA } from "@/lib/api/hooks/events/useEvents";
import type { EventCategorySlug } from "@/lib/api/helper/types";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";
import { CategoryCard, PageTitle } from "@/components/pages/events/components";
import { DecorativeElements } from "./decor/DecorativeElements";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY CARD SKELETON
// ═══════════════════════════════════════════════════════════════════

function CategoryCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl p-4 sm:p-5"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Icon skeleton */}
      <div
        className="mx-auto mb-3 h-12 w-12 animate-pulse rounded-xl sm:h-14 sm:w-14"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />

      {/* Name skeleton */}
      <div
        className="mx-auto mb-2 h-5 w-24 animate-pulse rounded"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />

      {/* Tagline skeleton */}
      <div
        className="mx-auto mb-3 h-3 w-20 animate-pulse rounded"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Events count skeleton */}
      <div
        className="mx-auto h-6 w-16 animate-pulse rounded-full"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INLINE LOADER (9 skeleton cards in grid)
// ═══════════════════════════════════════════════════════════════════

function CategoriesLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 2xl:gap-8">
      {Array.from({ length: 9 }).map((_, index) => (
        <CategoryCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ERROR STATE
// ═══════════════════════════════════════════════════════════════════

function CategoriesError({ message, onRetry }: { message: string; onRetry: () => void }) {
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
          background: COLORS.BRIGHT_GOLD,
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
// CATEGORY ORDER (for consistent display)
// ═══════════════════════════════════════════════════════════════════

const CATEGORY_ORDER: EventCategorySlug[] = [
  "NATRAJ",
  "CROSSWINDZ",
  "BANDISH",
  "ABHINAY",
  "MIRAGE",
  "TOOLIKA",
  "ENQUIZTA",
  "SAMWAAD",
  "ZAIKA",
];

// ═══════════════════════════════════════════════════════════════════
// EVENTS PAGE CONTENT
// Main events listing page with category cards
// ═══════════════════════════════════════════════════════════════════

export function EventsPageContent() {
  const { eventsByCategory, isLoading, isError, errorMessage, refetch } = useEvents();

  // Build categories from API data + metadata
  const categories = CATEGORY_ORDER.map((categoryKey) => {
    const meta = CATEGORY_METADATA[categoryKey];
    const events = eventsByCategory[categoryKey] ?? [];

    return {
      id: categoryKey.toLowerCase(),
      name: meta.name,
      slug: categoryKey.toLowerCase(),
      tagline: meta.tagline,
      description: meta.description,
      icon: meta.icon,
      color: meta.color,
      eventCount: events.length,
    };
  });

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
            ${JAZZ_COLORS.BG_ROYAL} 20%,
            ${JAZZ_COLORS.BG_WINE} 50%,
            ${JAZZ_COLORS.BG_ROYAL} 80%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Background decorative elements */}
        <DecorativeElements />

        <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1600px]">
          <PageTitle />

          {/* Categories Grid - with inline states */}
          {isLoading ? (
            <CategoriesLoader />
          ) : isError ? (
            <CategoriesError message={errorMessage ?? "Something went wrong"} onRetry={refetch} />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 2xl:gap-8">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          )}

          {/* Bottom decorative element */}
          {!isLoading && !isError && (
            <div className="mt-16 text-center sm:mt-20">
              <div
                className="inline-block rounded-full px-6 py-3 text-sm"
                style={{
                  background: `${COLORS.BRIGHT_GOLD}10`,
                  border: `1px solid ${COLORS.BRIGHT_GOLD}30`,
                  color: COLORS.BRIGHT_GOLD,
                }}
              >
                Click on any category to explore events
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
