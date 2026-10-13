"use client";

import { memo } from "react";
import { toast } from "sonner";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PAGE TITLE COMPONENT
// ═══════════════════════════════════════════════════════════════════

export const PageTitle = memo(function PageTitle() {
  return (
    <div className="mb-12 text-center sm:mb-16">
      {/* Decorative line */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <div
          className="h-px w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})`,
          }}
        />
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase sm:text-sm"
          style={{ color: COLORS.BRIGHT_GOLD }}
        >
          Kashi Yatra 2027
        </span>
        <div
          className="h-px w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)`,
          }}
        />
      </div>

      {/* Main title */}
      <h1
        className="mb-4 text-4xl font-black italic sm:text-5xl md:text-6xl"
        style={{
          fontFamily: "Georgia, serif",
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.CREAM} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Competitions
      </h1>

      {/* Subtitle */}
      <p
        className="mx-auto max-w-2xl text-base sm:text-lg"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        Nine spectacular categories. Countless opportunities to shine.
        <br className="hidden sm:block" />
        Find your stage and let your talent speak.
      </p>

      {/* Download Rulebook Button */}
      <div className="mt-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            toast.info("PDF will be available soon!");
          }}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${JAZZ_COLORS.HOT_PINK}80 0%, ${JAZZ_COLORS.ROYAL_PURPLE}80 100%)`,
            color: COLORS.CREAM,
            border: `1px solid ${JAZZ_COLORS.HOT_PINK}50`,
            boxShadow: `0 4px 20px ${JAZZ_COLORS.HOT_PINK}30`,
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Rulebook
        </button>
      </div>
    </div>
  );
});
