"use client";

import { COLORS } from "@/components/pages/gallery/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// CAMERA LENS ICON
// ═══════════════════════════════════════════════════════════════════

export function CameraLensIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={COLORS.PAPER} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill={COLORS.PAPER} />
    </svg>
  );
}
