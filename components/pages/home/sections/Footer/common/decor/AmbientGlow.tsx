"use client";

import { memo } from "react";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

// ═══════════════════════════════════════════════════════════════════
// AMBIENT GLOW - Side and bottom glows
// ═══════════════════════════════════════════════════════════════════
export const AmbientGlow = memo(function AmbientGlow() {
  return (
    <>
      {/* Center bottom glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[80%] -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at bottom, ${FOOTER_COLORS.NEON_PINK}20 0%, transparent 70%)`,
        }}
      />

      {/* Side vignettes */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-[20%]"
        style={{
          background: `linear-gradient(90deg, ${FOOTER_COLORS.BG_DEEP} 0%, transparent 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-[20%]"
        style={{
          background: `linear-gradient(-90deg, ${FOOTER_COLORS.BG_DEEP} 0%, transparent 100%)`,
        }}
      />
    </>
  );
});
