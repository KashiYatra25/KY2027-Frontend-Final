"use client";

import { memo } from "react";
import { CONCERT_COLORS } from "@/components/pages/home/sections/ProNites/constants";
import { EqualizerBars } from "./EqualizerBars";

export const SectionTitle = memo(function SectionTitle() {
  return (
    <div className="mb-12 text-center sm:mb-16">
      {/* Eyebrow */}
      <div className="mb-4 flex items-center justify-center gap-4">
        <EqualizerBars className="hidden opacity-80 sm:flex" color={CONCERT_COLORS.NEON_PINK} />
        <span className="text-xs font-bold tracking-[0.3em] text-[#FFD700] uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.95)] sm:text-sm sm:text-[#FF1493] sm:[text-shadow:0_0_20px_#FF1493]">
          Pro Nites 2027
        </span>
        <EqualizerBars className="hidden opacity-80 sm:flex" color={CONCERT_COLORS.NEON_PINK} />
      </div>

      {/* Main title */}
      <h2 className="relative inline-block">
        <span
          className="text-4xl font-black tracking-tight uppercase sm:text-6xl"
          style={{
            background: `linear-gradient(180deg, 
              #FFFFFF 0%, 
              ${CONCERT_COLORS.NEON_PINK} 40%,
              ${CONCERT_COLORS.NEON_PURPLE} 60%,
              ${CONCERT_COLORS.NEON_CYAN} 100%
            )`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The Lineup
        </span>

        {/* Reflection - desktop only */}
        <span
          className="absolute top-full left-0 hidden w-full origin-top scale-y-[-1] text-4xl font-black tracking-tight uppercase opacity-20 sm:block sm:text-6xl"
          style={{
            background: `linear-gradient(180deg, ${CONCERT_COLORS.NEON_CYAN} 0%, transparent 60%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
          }}
          aria-hidden="true"
        >
          The Lineup
        </span>
      </h2>

      {/* Subtitle */}
      <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed font-semibold text-stone-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.95)] sm:text-base sm:font-normal sm:text-white/50 sm:[text-shadow:none]">
        Three nights. Unlimited energy. The biggest artists hit the stage.
      </p>
    </div>
  );
});
