"use client";

import { useEvents, CATEGORY_METADATA } from "@/lib/api/hooks/events/useEvents";
import type { EventCategorySlug } from "@/lib/api/helper/types";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";
import {
  CategoryCard,
  PageTitle,
  EventsCategoryNavbar,
} from "@/components/pages/events/components";
import { DecorativeElements } from "@/components/pages/events/sections/decor/DecorativeElements";
import { CategoriesLoader } from "./loader/CategoriesLoader";
import { CategoriesError } from "./CategoriesError";

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
      {/* Custom Events Category Navbar */}
      <EventsCategoryNavbar activeCategory="NATRAJ" />

      <main
        className="min-h-screen px-4 pb-20 sm:px-6"
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
