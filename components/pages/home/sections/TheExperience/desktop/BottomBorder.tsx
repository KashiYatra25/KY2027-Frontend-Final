"use client";

import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// BOTTOM BORDER — bottom decorative border SVG
// (rendered after the main content, matching original DOM order)
// ═══════════════════════════════════════════════════════════════════

export const BottomBorder = memo(function BottomBorder() {
  return (
    <div className="absolute right-0 bottom-0 left-0">
      <svg className="h-8 w-full" viewBox="0 0 1200 32" preserveAspectRatio="none">
        <path d="M0 32 Q300 0 600 16 T1200 32" fill={JAZZ_COLORS.GOLD} opacity="0.1" />
      </svg>
    </div>
  );
});
