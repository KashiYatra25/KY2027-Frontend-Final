"use client";

import { JAZZ_COLORS } from "@/components/pages/events/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// EVENTS DECORATIVE ELEMENTS
// Background radial-gradient flourishes for the events listing page.
// ═══════════════════════════════════════════════════════════════════

export function DecorativeElements() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-[0.03]"
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, ${JAZZ_COLORS.HOT_PINK} 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, ${JAZZ_COLORS.ROYAL_PURPLE} 0%, transparent 50%)
        `,
      }}
    />
  );
}
