"use client";

import { memo } from "react";
import { COLORS } from "@/components/pages/passes/constants/palette";

// ============================================
// Animated Geometric Pattern
// ============================================
export const GeometricPattern = memo(function GeometricPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id="diagonalLines"
            patternUnits="userSpaceOnUse"
            width="60"
            height="60"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="60" stroke={COLORS.GOLD} strokeWidth="1" />
          </pattern>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
            <circle cx="20" cy="20" r="1.5" fill={COLORS.GOLD} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5" />
      </svg>
    </div>
  );
});
