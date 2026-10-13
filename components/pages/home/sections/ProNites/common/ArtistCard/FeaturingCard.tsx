"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { CONCERT_COLORS, Artist } from "@/components/pages/home/sections/ProNites/constants";
import { MysterySilhouette } from "./MysterySilhouette";

// ═══════════════════════════════════════════════════════════════════
// FEATURING CARD - Simplified with static diamond gradient
// ═══════════════════════════════════════════════════════════════════
export const FeaturingCard = memo(function FeaturingCard({
  artist,
  index,
}: {
  artist: Artist;
  index: number;
}) {
  const accentColor = artist.accentColor || CONCERT_COLORS.NEON_PURPLE;

  // Secondary color for gradients
  const secondaryColor = useMemo(() => {
    const colors = [
      CONCERT_COLORS.NEON_PINK,
      CONCERT_COLORS.NEON_CYAN,
      CONCERT_COLORS.NEON_PURPLE,
      CONCERT_COLORS.NEON_GOLD,
    ];
    return colors[(index + 1) % colors.length];
  }, [index]);

  return (
    <div
      className="group relative"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Static diamond gradient border */}
      <div
        className="absolute -inset-[2px] rounded-xl opacity-60 transition-opacity duration-300 sm:rounded-2xl sm:group-hover:opacity-100"
        style={{
          background: `linear-gradient(45deg, 
            ${accentColor} 0%, 
            ${secondaryColor} 25%, 
            ${CONCERT_COLORS.NEON_GOLD} 50%, 
            ${secondaryColor} 75%, 
            ${accentColor} 100%)`,
          filter: "blur(1px)",
        }}
      />

      {/* Main card */}
      <div
        className="relative overflow-hidden rounded-xl transition-all duration-300 sm:rounded-2xl sm:group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, 
            rgba(15,5,25,0.95) 0%, 
            rgba(25,10,35,0.9) 50%, 
            rgba(10,5,20,0.95) 100%)`,
          border: `2px solid ${accentColor}30`,
          boxShadow: `0 15px 40px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Corner accent cuts */}
        <div
          className="absolute top-0 left-0 h-3 w-3 sm:h-4 sm:w-4"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 50%, transparent 50%)`,
            opacity: 0.8,
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-3 w-3 sm:h-4 sm:w-4"
          style={{
            background: `linear-gradient(-45deg, ${secondaryColor} 50%, transparent 50%)`,
            opacity: 0.8,
          }}
        />

        {/* Inner content container - reduced padding on mobile */}
        <div className="relative p-1.5 sm:p-4">
          {/* Artist image with static diamond frame - smaller on mobile */}
          <div className="relative mx-auto mb-1.5 aspect-square w-full max-w-[70px] sm:mb-3 sm:max-w-[140px]">
            {/* Static diamond gradient glow at 45deg */}
            <div
              className="absolute -inset-1 rounded-lg opacity-50 transition-opacity duration-300 sm:rounded-xl sm:group-hover:opacity-90"
              style={{
                background: `conic-gradient(from 45deg, ${accentColor}, ${secondaryColor}, ${CONCERT_COLORS.NEON_GOLD}, ${accentColor})`,
                transform: "rotate(45deg)",
                filter: "blur(4px)",
              }}
            />

            {/* Image container */}
            <div
              className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl"
              style={{
                background: `linear-gradient(180deg, ${CONCERT_COLORS.STAGE_PURPLE} 0%, ${CONCERT_COLORS.STAGE_DARK} 100%)`,
              }}
            >
              {artist.isRevealed && artist.image ? (
                <>
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-300 sm:group-hover:scale-105"
                  />
                  {/* Bottom gradient for text readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${CONCERT_COLORS.STAGE_DARK} 0%, transparent 50%)`,
                    }}
                  />
                </>
              ) : (
                <MysterySilhouette accentColor={accentColor} isHeadliner={false} />
              )}
            </div>
          </div>

          {/* Artist name only - smaller on mobile */}
          <h4
            className="text-center text-xs font-bold tracking-wide transition-all duration-300 sm:text-base sm:group-hover:scale-105"
            style={{
              color: "#fff",
              textShadow: `0 0 20px ${accentColor}60`,
            }}
          >
            {artist.name}
          </h4>
        </div>
      </div>
    </div>
  );
});
