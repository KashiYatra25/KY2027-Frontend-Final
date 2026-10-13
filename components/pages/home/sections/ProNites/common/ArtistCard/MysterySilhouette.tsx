"use client";

import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// MYSTERY SILHOUETTE - Animated question mark
// ═══════════════════════════════════════════════════════════════════
export const MysterySilhouette = memo(function MysterySilhouette({
  accentColor,
  isHeadliner,
}: {
  accentColor: string;
  isHeadliner: boolean;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Pulsing glow rings - desktop only */}
      <div
        className="absolute hidden h-20 w-20 rounded-full sm:block sm:h-24 sm:w-24"
        style={{
          background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          animation: "pulseSlow 2s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Glowing question mark */}
      <span
        className={`font-black ${isHeadliner ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}
        style={{
          color: accentColor,
          textShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}80`,
        }}
      >
        ?
      </span>

      {/* Corner accents */}
      <div
        className="absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2"
        style={{ borderColor: `${accentColor}60` }}
      />
      <div
        className="absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2"
        style={{ borderColor: `${accentColor}60` }}
      />
      <div
        className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2"
        style={{ borderColor: `${accentColor}60` }}
      />
      <div
        className="absolute right-2 bottom-2 h-3 w-3 border-r-2 border-b-2"
        style={{ borderColor: `${accentColor}60` }}
      />
    </div>
  );
});
