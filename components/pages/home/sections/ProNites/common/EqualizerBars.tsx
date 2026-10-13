"use client";

import { memo } from "react";
import { CONCERT_COLORS } from "@/components/pages/home/sections/ProNites/constants";

interface EqualizerBarsProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export const EqualizerBars = memo(function EqualizerBars({
  className = "",
  color = CONCERT_COLORS.NEON_PINK,
  size = "md",
}: EqualizerBarsProps) {
  const heights = { sm: "h-4", md: "h-6", lg: "h-8" };
  const widths = { sm: "w-[2px]", md: "w-1", lg: "w-1.5" };

  return (
    <div className={`flex items-end gap-[2px] ${heights[size]} ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`${widths[size]} rounded-full`}
          style={{
            background: `linear-gradient(to top, ${color}, ${CONCERT_COLORS.NEON_CYAN})`,
            animation: `equalizerBounce ${0.4 + i * 0.1}s ease-in-out infinite`,
            animationDelay: `${i * 0.08}s`,
            height: "100%",
            transformOrigin: "bottom",
            willChange: "transform",
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      ))}
    </div>
  );
});
