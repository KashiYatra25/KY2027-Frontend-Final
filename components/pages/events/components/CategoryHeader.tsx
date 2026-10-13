"use client";

import { memo } from "react";
import Link from "next/link";
import type { EventCategory } from "@/lib/api/helper/types";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface CategoryHeaderProps {
  category: EventCategory;
}

export const CategoryHeader = memo(function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Back button */}
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Categories
      </Link>

      {/* Category icon and title */}
      <div className="mb-6 flex items-center gap-4 sm:gap-6">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl sm:h-20 sm:w-20 sm:text-5xl"
          style={{
            background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
            border: `2px solid ${category.color}40`,
          }}
        >
          {category.icon}
        </div>

        <div>
          <h1
            className="text-3xl font-black italic sm:text-4xl"
            style={{
              fontFamily: "Georgia, serif",
              color: COLORS.CREAM,
              textShadow: `0 2px 20px ${category.color}40`,
            }}
          >
            {category.name}
          </h1>
          <p className="mt-1 text-sm sm:text-base" style={{ color: category.color }}>
            {category.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className="max-w-3xl text-base leading-relaxed sm:text-lg"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {category.description}
      </p>

      {/* Stats bar */}
      <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
        <div
          className="rounded-lg px-4 py-2"
          style={{
            background: `${category.color}15`,
            border: `1px solid ${category.color}30`,
          }}
        >
          <span className="text-2xl font-bold" style={{ color: category.color }}>
            {category.subEvents.length}
          </span>
          <span className="ml-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Events
          </span>
        </div>

        <div
          className="rounded-lg px-4 py-2"
          style={{
            background: `${JAZZ_COLORS.ELECTRIC_BLUE}15`,
            border: `1px solid ${JAZZ_COLORS.ELECTRIC_BLUE}30`,
          }}
        >
          <span className="text-2xl font-bold" style={{ color: JAZZ_COLORS.ELECTRIC_BLUE }}>
            {category.subEvents.filter((e) => e.registrationOpen).length}
          </span>
          <span className="ml-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Open for Registration
          </span>
        </div>
      </div>
    </div>
  );
});
