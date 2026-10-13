"use client";

import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { JazzIcon } from "@/components/pages/home/sections/TheExperience/icons";
import { OrnateFrame } from "@/components/pages/home/sections/TheExperience/decor";
import type { ExperienceTile } from "@/components/pages/home/sections/TheExperience/data/experiences.config";

// ═══════════════════════════════════════════════════════════════════
// JAZZY BENTO TILE COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface JazzTileProps {
  tile: ExperienceTile;
  index: number;
}

export const JazzTile = memo(function JazzTile({ tile, index }: JazzTileProps) {
  const isHero = tile.size === "hero";
  const isFeature = tile.size === "feature";

  return (
    <div
      className={`group relative overflow-hidden ${
        isHero
          ? "col-span-2 row-span-2 rounded-[2rem]"
          : isFeature
            ? "col-span-1 row-span-2 rounded-3xl"
            : "col-span-1 row-span-1 rounded-2xl"
      }`}
      style={{
        background: `
          linear-gradient(145deg, 
            ${JAZZ_COLORS.BG_ROYAL} 0%, 
            ${JAZZ_COLORS.BG_WINE} 50%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )
        `,
        border: `2px solid ${tile.color}30`,
        boxShadow: `
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,255,255,0.05),
          inset 0 0 60px ${tile.color}08
        `,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute -inset-[2px] -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(45deg, ${tile.color}, ${tile.accentColor}, ${tile.color})`,
          backgroundSize: "200% 200%",
          animation: "gradientShift 3s ease infinite",
          filter: "blur(3px)",
        }}
      />

      {/* Ornate frame */}
      <OrnateFrame color={tile.color} />

      {/* Spotlight cone from top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[60%] w-[80%] -translate-x-1/2"
        style={{
          background: `linear-gradient(180deg, ${tile.color}15 0%, transparent 100%)`,
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          filter: "blur(20px)",
        }}
      />

      {/* Content */}
      <div
        className={`relative flex h-full flex-col items-center justify-center ${
          isHero ? "p-6 sm:p-10" : isFeature ? "p-4 sm:p-6" : "p-4 sm:p-5"
        }`}
      >
        {/* Icon with glow */}
        <div
          className={`relative ${
            isHero
              ? "h-20 w-20 sm:h-28 sm:w-28"
              : isFeature
                ? "h-14 w-14 sm:h-20 sm:w-20"
                : "h-10 w-10 sm:h-14 sm:w-14"
          } mb-2 sm:mb-4`}
        >
          {/* Icon glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${tile.color}40 0%, transparent 70%)`,
              filter: "blur(10px)",
              animation: "pulseSlow 3s ease-in-out infinite",
            }}
          />
          <div className="relative">
            <JazzIcon type={tile.icon} color={tile.color} />
          </div>
        </div>

        {/* Stat number - jazzy typography */}
        <div className="relative">
          {/* Shadow/outline effect */}
          <div
            className={`absolute inset-0 font-black ${
              isHero
                ? "text-5xl sm:text-7xl md:text-8xl"
                : isFeature
                  ? "text-4xl sm:text-5xl"
                  : "text-3xl sm:text-4xl"
            }`}
            style={{
              color: "transparent",
              WebkitTextStroke: `2px ${tile.accentColor}30`,
              transform: "translate(2px, 2px)",
            }}
          >
            {tile.stat}
          </div>

          {/* Main number */}
          <div
            className={`relative font-black ${
              isHero
                ? "text-5xl sm:text-7xl md:text-8xl"
                : isFeature
                  ? "text-4xl sm:text-5xl"
                  : "text-3xl sm:text-4xl"
            }`}
            style={{
              background: `linear-gradient(180deg, ${JAZZ_COLORS.CREAM} 0%, ${tile.color} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `drop-shadow(0 0 20px ${tile.color}60)`,
            }}
          >
            {tile.stat}
          </div>
        </div>

        {/* Label - stacked elegant typography */}
        <div className={`mt-1 text-center sm:mt-2 ${isHero ? "space-y-0" : ""}`}>
          <div
            className={`font-bold tracking-widest uppercase ${
              isHero
                ? "text-base sm:text-lg"
                : isFeature
                  ? "text-sm sm:text-base"
                  : "text-xs sm:text-sm"
            }`}
            style={{ color: tile.color }}
          >
            {tile.label}
          </div>
          {tile.sublabel && (
            <div
              className={`font-medium tracking-wider uppercase ${
                isHero ? "text-sm sm:text-base" : "text-xs sm:text-sm"
              }`}
              style={{ color: JAZZ_COLORS.CREAM, opacity: 0.6 }}
            >
              {tile.sublabel}
            </div>
          )}
        </div>

        {/* Decorative line under label */}
        <div
          className={`mt-2 h-[2px] rounded-full sm:mt-3 ${
            isHero ? "w-20 sm:w-32" : isFeature ? "w-12 sm:w-20" : "w-8 sm:w-12"
          }`}
          style={{
            background: `linear-gradient(90deg, transparent, ${tile.color}, transparent)`,
          }}
        />
      </div>

      {/* Sparkle particles - hero only */}
      {isHero && (
        <>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 2) * 15}%`,
                background: JAZZ_COLORS.GOLD,
                boxShadow: `0 0 6px ${JAZZ_COLORS.GOLD}`,
                animation: `sparkleFloat ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
});
