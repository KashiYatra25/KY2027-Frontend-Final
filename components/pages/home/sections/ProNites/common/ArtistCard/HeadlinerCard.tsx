"use client";

import { memo } from "react";
import { CONCERT_COLORS, Artist } from "@/components/pages/home/sections/ProNites/constants";
import { EqualizerBars } from "@/components/pages/home/sections/ProNites/common/EqualizerBars";
import { MysterySilhouette } from "./MysterySilhouette";
import { RevealedArtist } from "./RevealedArtist";

// ═══════════════════════════════════════════════════════════════════
// HEADLINER CARD - Premium large card
// ═══════════════════════════════════════════════════════════════════
export const HeadlinerCard = memo(function HeadlinerCard({
  artist,
  index,
}: {
  artist: Artist;
  index: number;
}) {
  const accentColor = artist.accentColor || CONCERT_COLORS.NEON_GOLD;

  return (
    <div className="group relative" style={{ animationDelay: `${index * 0.15}s` }}>
      {/* Border glow - desktop only */}
      <div
        className="absolute -inset-[2px] hidden rounded-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 sm:block"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${CONCERT_COLORS.NEON_PURPLE} 50%, ${accentColor} 100%)`,
          filter: "blur(2px)",
        }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-5 sm:p-6"
        style={{
          background: `linear-gradient(160deg, rgba(20,10,40,0.95) 0%, rgba(10,5,20,0.98) 100%)`,
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColor}15`,
        }}
      >
        {/* Genre tag */}
        <div className="mb-4 flex justify-center">
          <div
            className="rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
            style={{
              background: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}50`,
            }}
          >
            ★ {artist.genre} ★
          </div>
        </div>

        {/* Silhouette or Image */}
        <div
          className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-2xl sm:h-36 sm:w-36"
          style={{
            background: `linear-gradient(180deg, ${CONCERT_COLORS.STAGE_PURPLE} 0%, ${CONCERT_COLORS.STAGE_DARK} 100%)`,
            border: `2px solid ${accentColor}30`,
          }}
        >
          {artist.isRevealed && artist.image ? (
            <RevealedArtist image={artist.image} name={artist.name} accentColor={accentColor} />
          ) : (
            <MysterySilhouette accentColor={accentColor} isHeadliner={true} />
          )}
        </div>

        {/* Name */}
        <h3
          className="mb-3 text-center text-xl font-black tracking-wide sm:text-2xl"
          style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}` }}
        >
          {artist.name}
        </h3>

        <div className="hidden justify-center sm:flex">
          <EqualizerBars color={accentColor} size="lg" />
        </div>

        {!artist.isRevealed && (
          <p
            className="mt-3 text-center text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Reveal Coming Soon
          </p>
        )}
      </div>
    </div>
  );
});
