"use client";

import { memo } from "react";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// CLEAN MINIMAL BACKGROUND - Subtle, not overwhelming
// ═══════════════════════════════════════════════════════════════════

export const NeonGridBackground = memo(function NeonGridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${IMAGES.about.background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay for better text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,12,0.3) 0%, rgba(13,13,20,0.2) 50%, rgba(8,8,12,0.4) 100%)",
        }}
      />

      {/* Single subtle accent glow - top */}
      <div
        className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});
