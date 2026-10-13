"use client";

import { memo } from "react";

// ============================================
// Vignette Overlay
// ============================================
export const VignetteOverlay = memo(function VignetteOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10, 5, 15, 0.6) 100%),
          radial-gradient(ellipse at 50% 0%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(139, 69, 19, 0.15) 0%, transparent 50%)
        `,
      }}
    />
  );
});
