"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { EventCategory } from "@/lib/api/helper/types";
import { ArrowLeft, Sparkles, CalendarCheck } from "lucide-react";
import { getCategoryIcon } from "./CategoryIcons";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY HEADER COMPONENT - FESTIVE DESIGN
// Matches the FestEvents aesthetic with ornate borders and glows
// ═══════════════════════════════════════════════════════════════════

interface CategoryHeaderProps {
  category: EventCategory;
  showBackButton?: boolean;
}

export const CategoryHeader = memo(function CategoryHeader({
  category,
  showBackButton = true,
}: CategoryHeaderProps) {
  const openCount = category.subEvents.filter((e) => e.registrationOpen).length;
  const IconComponent = getCategoryIcon(category.id || category.slug);

  return (
    <div className="relative mb-10 sm:mb-14">
      {/* Main header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, 
            hsl(from ${category.color} h s 8% / 0.9) 0%,
            hsl(from ${category.color} h s 5% / 0.95) 50%,
            hsl(from ${category.color} h s 10% / 0.9) 100%
          )`,
          border: `2px solid ${category.color}40`,
          boxShadow: `
            0 0 60px ${category.color}15,
            inset 0 1px 0 ${category.color}20,
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Ornate top border line */}
        <div
          className="absolute top-0 right-0 left-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
          }}
        />

        {/* Back button - positioned at top right inside the card */}
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6"
          >
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 hover:gap-2.5 sm:text-sm"
              style={{
                background: `linear-gradient(135deg, ${category.color}25 0%, ${category.color}15 100%)`,
                border: `1px solid ${category.color}50`,
                color: category.color,
              }}
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Back to Events</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </motion.div>
        )}

        {/* Corner ornaments */}
        {[
          "top-3 left-3",
          "top-3 right-3 rotate-90",
          "bottom-3 left-3 -rotate-90",
          "bottom-3 right-3 rotate-180",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute h-6 w-6 ${pos}`}
            style={{ borderColor: `${category.color}60` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
              <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill={`${category.color}60`} />
            </svg>
          </div>
        ))}

        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${category.color}20 0%, transparent 50%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Icon container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center self-center sm:h-28 sm:w-28 sm:self-start"
            >
              {/* Glowing ring */}
              <div
                className="absolute inset-0 animate-pulse rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${category.color}30, transparent)`,
                  border: `2px solid ${category.color}50`,
                  boxShadow: `0 0 30px ${category.color}30`,
                }}
              />
              {/* Inner icon - SVG or fallback to emoji */}
              {IconComponent ? (
                <IconComponent
                  className="relative z-10 h-14 w-14 sm:h-16 sm:w-16"
                  color={category.color}
                />
              ) : (
                <span className="relative z-10 text-5xl sm:text-6xl">{category.icon}</span>
              )}
            </motion.div>

            {/* Text content */}
            <div className="flex-1 text-center sm:text-left">
              {/* Category name */}
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-2 text-4xl font-black italic sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#FDF6E3",
                  textShadow: `0 0 40px ${category.color}60, 0 2px 10px rgba(0,0,0,0.5)`,
                }}
              >
                {category.name}
              </motion.h1>

              {/* Tagline with decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-4 flex items-center justify-center gap-3 sm:justify-start"
              >
                <span
                  className="h-px w-8 sm:w-12"
                  style={{ background: `linear-gradient(90deg, transparent, ${category.color})` }}
                />
                <p
                  className="text-lg font-semibold italic sm:text-xl"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: category.color,
                    textShadow: `0 0 20px ${category.color}40`,
                  }}
                >
                  {category.tagline}
                </p>
                <span
                  className="h-px w-8 sm:w-12"
                  style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="max-w-2xl text-sm leading-relaxed sm:text-base"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {category.description}
              </motion.p>
            </div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
          >
            {/* Total events */}
            <div
              className="flex items-center gap-3 rounded-xl px-5 py-3"
              style={{
                background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                border: `1px solid ${category.color}40`,
                boxShadow: `0 0 20px ${category.color}15`,
              }}
            >
              <Sparkles className="h-5 w-5" style={{ color: category.color }} />
              <div>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: category.color,
                    textShadow: `0 0 15px ${category.color}50`,
                  }}
                >
                  {category.subEvents.length}
                </span>
                <span className="ml-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Events
                </span>
              </div>
            </div>

            {/* Open for registration */}
            <div
              className="flex items-center gap-3 rounded-xl px-5 py-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.15)",
              }}
            >
              <CalendarCheck className="h-5 w-5 text-green-400" />
              <div>
                <span
                  className="text-2xl font-bold text-green-400"
                  style={{ textShadow: "0 0 15px rgba(34, 197, 94, 0.5)" }}
                >
                  {openCount}
                </span>
                <span className="ml-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Open Now
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <div
          className="absolute right-0 bottom-0 left-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}40, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
});
