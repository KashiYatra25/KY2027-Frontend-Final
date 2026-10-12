"use client";

import { memo } from "react";
import Link from "next/link";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface CategoryCardCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  color: string;
  eventCount?: number; // From API-based data
  subEvents?: { id: string }[]; // Legacy from static config
}

interface CategoryCardProps {
  category: CategoryCardCategory;
  index: number;
}

export const CategoryCard = memo(function CategoryCard({ category, index }: CategoryCardProps) {
  // Support both new eventCount and legacy subEvents.length
  const eventCount = category.eventCount ?? category.subEvents?.length ?? 0;

  return (
    <Link
      href={`/events/${category.slug}`}
      className="group relative block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card Container */}
      <div
        className="relative h-[320px] overflow-hidden rounded-2xl transition-all duration-500 sm:h-[380px] sm:group-hover:-translate-y-2 sm:group-hover:scale-[1.03]"
        style={{
          background: `linear-gradient(180deg, 
            ${category.color}15 0%, 
            ${JAZZ_COLORS.BG_DEEP} 30%,
            ${JAZZ_COLORS.BG_ROYAL} 70%,
            ${category.color}20 100%
          )`,
          border: `2px solid ${category.color}40`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${category.color}20`,
        }}
      >
        {/* Ornate top border */}
        <div
          className="absolute top-0 right-0 left-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
          }}
        />

        {/* Glow effect on hover - desktop only */}
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block"
          style={{
            background: `radial-gradient(ellipse at center, ${category.color}20 0%, transparent 70%)`,
          }}
        />

        {/* Icon/Emoji placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[150px]">{category.icon}</span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
          {/* Category name */}
          <h3
            className="mb-2 text-2xl font-black italic sm:text-3xl"
            style={{
              fontFamily: "Georgia, serif",
              color: COLORS.CREAM,
              textShadow: `0 2px 10px rgba(0,0,0,0.5), 0 0 30px ${category.color}50`,
            }}
          >
            {category.name}
          </h3>

          {/* Tagline */}
          <p
            className="line-clamp-2 text-sm opacity-80 sm:text-base"
            style={{ color: category.color }}
          >
            {category.tagline}
          </p>

          {/* Event count badge */}
          <div
            className="mt-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: `${category.color}20`,
              border: `1px solid ${category.color}40`,
              color: category.color,
            }}
          >
            <span>{eventCount} Events</span>
            <svg
              className="h-3 w-3 transition-transform sm:group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Ornate corner accents */}
        <div
          className="absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2"
          style={{ borderColor: `${category.color}50` }}
        />
        <div
          className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2"
          style={{ borderColor: `${category.color}50` }}
        />
        <div
          className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2"
          style={{ borderColor: `${category.color}50` }}
        />
        <div
          className="absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2"
          style={{ borderColor: `${category.color}50` }}
        />
      </div>
    </Link>
  );
});
