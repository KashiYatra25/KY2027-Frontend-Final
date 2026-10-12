"use client";

import { GRADIENTS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// GLOW BACKGROUNDS - Radial gradient overlays for ambient lighting
// ═══════════════════════════════════════════════════════════════════

export function GlowBackgrounds() {
  return (
    <>
      {/* Primary glow - top area */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[640px]"
        style={{ background: GRADIENTS.GLOW_PRIMARY }}
        aria-hidden="true"
      />

      {/* Secondary glow - middle area */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[36%] z-0 h-[640px]"
        style={{ background: GRADIENTS.GLOW_SECONDARY }}
        aria-hidden="true"
      />

      {/* Tertiary glow - lower area */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[68%] z-0 h-[640px]"
        style={{ background: GRADIENTS.GLOW_TERTIARY }}
        aria-hidden="true"
      />
    </>
  );
}
