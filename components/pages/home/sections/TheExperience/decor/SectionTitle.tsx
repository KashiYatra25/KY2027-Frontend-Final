"use client";

import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// SECTION TITLE - Royal jazz typography
// ═══════════════════════════════════════════════════════════════════

export const SectionTitle = memo(function SectionTitle() {
  return (
    <div className="relative mb-10 text-center sm:mb-14">
      {/* Decorative top flourish */}
      <div className="mb-4 flex justify-center">
        <svg className="h-6 w-32 sm:w-48" viewBox="0 0 200 24">
          <path
            d="M0 12 Q25 0 50 12 T100 12 T150 12 T200 12"
            stroke={JAZZ_COLORS.GOLD}
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <circle cx="100" cy="12" r="4" fill={JAZZ_COLORS.GOLD} opacity="0.6" />
          <circle cx="60" cy="12" r="2" fill={JAZZ_COLORS.GOLD} opacity="0.4" />
          <circle cx="140" cy="12" r="2" fill={JAZZ_COLORS.GOLD} opacity="0.4" />
        </svg>
      </div>

      {/* Main title */}
      <h2 className="relative inline-block">
        {/* Glow behind */}
        <span
          className="absolute inset-0 text-3xl font-black tracking-tight uppercase blur-lg sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ color: JAZZ_COLORS.HOT_PINK, opacity: 0.3 }}
          aria-hidden="true"
        >
          The Experience
        </span>

        {/* Main text with gradient */}
        <span
          className="relative text-3xl font-black tracking-tight uppercase sm:text-4xl md:text-5xl lg:text-6xl"
          style={{
            background: `linear-gradient(135deg, 
              ${JAZZ_COLORS.CREAM} 0%, 
              ${JAZZ_COLORS.GOLD} 30%,
              ${JAZZ_COLORS.HOT_PINK} 60%,
              ${JAZZ_COLORS.ELECTRIC_BLUE} 100%
            )`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The Experience
        </span>
      </h2>

      {/* Subtitle with style */}
      <p className="mx-auto mt-4 max-w-xl text-sm font-medium tracking-wide sm:mt-5 sm:text-base md:text-lg">
        <span style={{ color: JAZZ_COLORS.CREAM, opacity: 0.5 }}>More than a fest. </span>
        <span
          style={{
            color: JAZZ_COLORS.GOLD,
            textShadow: `0 0 20px ${JAZZ_COLORS.GOLD}40`,
          }}
        >
          It&apos;s where Banaras comes alive.
        </span>
      </p>

      {/* Decorative bottom flourish */}
      <div className="mt-4 flex justify-center">
        <svg className="h-4 w-24 sm:w-32" viewBox="0 0 150 16">
          <path
            d="M0 8 L60 8 M90 8 L150 8"
            stroke={JAZZ_COLORS.GOLD}
            strokeWidth="1"
            opacity="0.4"
          />
          <polygon points="75,0 82,8 75,16 68,8" fill={JAZZ_COLORS.GOLD} opacity="0.5" />
        </svg>
      </div>
    </div>
  );
});
