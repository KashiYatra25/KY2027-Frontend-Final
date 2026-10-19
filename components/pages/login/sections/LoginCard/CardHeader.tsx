"use client";

import { ROYAL_COLORS } from "@/components/pages/login/constants/palette";

export function CardHeader() {
  return (
    <div className="relative z-10 mb-8 text-center">
      {/* Decorative symbol */}
      <div
        className="mb-4 text-4xl"
        style={{
          color: ROYAL_COLORS.GOLD,
          textShadow: `0 0 30px ${ROYAL_COLORS.GOLD}60`,
          filter: `drop-shadow(0 0 15px ${ROYAL_COLORS.GOLD}40)`,
        }}
      >
        ✦
      </div>

      {/* Title */}
      <h1
        className="mb-3 text-4xl font-bold sm:text-5xl"
        style={{
          fontFamily: "'Cinzel Decorative', Georgia, serif",
          background: `linear-gradient(135deg, ${ROYAL_COLORS.GOLD_LIGHT} 0%, ${ROYAL_COLORS.GOLD} 50%, ${ROYAL_COLORS.GOLD_DARK} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: `0 0 30px ${ROYAL_COLORS.GOLD}30`,
        }}
      >
        Welcome
      </h1>

      <p className="mb-2 text-sm tracking-[0.3em]" style={{ color: `${ROYAL_COLORS.CREAM}70` }}>
        Welcome, traveller
      </p>

      {/* Decorative line */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <div
          className="h-px w-16"
          style={{
            background: `linear-gradient(90deg, transparent, ${ROYAL_COLORS.GOLD})`,
          }}
        />
        <div
          className="h-2 w-2 rotate-45"
          style={{
            background: ROYAL_COLORS.GOLD,
            boxShadow: `0 0 10px ${ROYAL_COLORS.GOLD}`,
          }}
        />
        <div
          className="h-px w-16"
          style={{
            background: `linear-gradient(90deg, ${ROYAL_COLORS.GOLD}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
