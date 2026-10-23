"use client";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE ELEMENTS
// Ornate borders, corners, and decorative flourishes
// ═══════════════════════════════════════════════════════════════════

import { CornerFlourish } from "./CornerFlourish";

export function DecorativeElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Top edge ornate pattern */}
      <div
        className="absolute top-0 right-0 left-0 h-32 opacity-20"
        style={{
          background: `linear-gradient(180deg, 
            rgba(212, 168, 83, 0.3) 0%, 
            rgba(212, 168, 83, 0.1) 30%,
            transparent 100%
          )`,
          maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
        }}
      />

      {/* Corner accents - decorative flourishes */}
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" mirror />
      <CornerFlourish position="bottom-left" flipY />
      <CornerFlourish position="bottom-right" mirror flipY />

      {/* Bottom decorative line (desktop only) */}
      <div className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4A853]/30" />
        <div className="h-2 w-2 rotate-45 border border-[#D4A853]/30" />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4A853]/30" />
      </div>
    </div>
  );
}
