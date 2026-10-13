"use client";

import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Subtle stage grid background pattern
 */
export function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, ${COLORS.MAROON}15, transparent 70%),
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      }}
    />
  );
}
