"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Z_HERO } from "@/components/pages/home/constants";

interface HeroRightProps {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * HeroRight component — the right-side hero artwork.
 * Single image used at all times (no day/night variants).
 */
export const HeroRight = memo(function HeroRight({ ref }: HeroRightProps) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-[0%] bottom-[31%] w-[35%] sm:right-[4%] sm:bottom-[29.6%] sm:w-[20%]"
      style={{
        zIndex: Z_HERO.HERO_RIGHT,
      }}
    >
      {/* Floating divine particles - Desktop only */}
      <div className="hidden sm:block">
        {[...Array(12)].map((_, i) => (
          <div
            key={`hero-right-particle-${i}`}
            className="pointer-events-none absolute h-2 w-2 rounded-full"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${15 + Math.floor(i / 4) * 25}%`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, #FFD700 0%, transparent 70%)"
                  : "radial-gradient(circle, #FFA500 0%, transparent 70%)",
              animation: `floatParticle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              boxShadow: "0 0 6px rgba(255,215,0,0.5)",
            }}
          />
        ))}
      </div>

      <Image
        src={IMAGES.hero.heroRight}
        alt="Kashiyatra hero artwork"
        width={1000}
        height={1100}
        className="h-auto w-full"
        priority
      />
    </div>
  );
});
