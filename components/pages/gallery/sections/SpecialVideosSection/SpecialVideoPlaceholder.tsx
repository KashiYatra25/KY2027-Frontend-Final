"use client";

import { COLORS } from "@/components/pages/gallery/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PLACEHOLDER - Empty special video card
// ═══════════════════════════════════════════════════════════════════

export function SpecialVideoPlaceholder({
  orientation,
}: {
  orientation: "landscape" | "portrait";
}) {
  const isLandscape = orientation === "landscape";

  return (
    <div
      className={`special-video-wrapper relative ${
        isLandscape
          ? "max-w-[660px] flex-[1_1_520px]"
          : "w-[clamp(230px,24vw,300px)] flex-[0_0_auto]"
      }`}
    >
      <div
        className="relative w-full rounded-[20px]"
        style={{
          aspectRatio: isLandscape ? "16/9" : "9/16",
          background: "rgba(246,236,220,0.05)",
          boxShadow: "inset 0 0 0 2px rgba(246,236,220,0.16)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-xs tracking-[0.16em] uppercase"
            style={{ color: COLORS.TEXT_DIM }}
          >
            {isLandscape ? "Landscape" : "Portrait"} video
          </span>
        </div>
      </div>
    </div>
  );
}
