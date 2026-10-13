"use client";

import { memo } from "react";
import { CONCERT_COLORS } from "@/components/pages/home/sections/ProNites/constants";

/**
 * GridOverlay - Subtle grid pattern
 */
export const GridOverlay = memo(function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden opacity-[0.02] sm:block"
      style={{
        backgroundImage: `
          linear-gradient(${CONCERT_COLORS.NEON_PURPLE}50 1px, transparent 1px),
          linear-gradient(90deg, ${CONCERT_COLORS.NEON_PURPLE}50 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
});
