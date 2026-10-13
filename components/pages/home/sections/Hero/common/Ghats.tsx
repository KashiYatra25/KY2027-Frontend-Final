"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Z_HERO } from "@/components/pages/home/constants";

interface GhatsProps {
  timeOfDay: string;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Ghats component with day/night variants
 * Different images and positioning based on time of day
 */
export const Ghats = memo(function Ghats({ timeOfDay, ref }: GhatsProps) {
  const isNight = timeOfDay === "night" || timeOfDay === "dusk";

  if (isNight) {
    return (
      <div
        ref={ref}
        className="pointer-events-none absolute bottom-[31.3%] left-[-12%] w-[73%] sm:bottom-[29.5%] sm:left-[-8%] sm:w-[63%]"
        style={{
          zIndex: Z_HERO.GHATS,
        }}
      >
        {/* Soft divine glow behind ghats - Desktop only */}
        <div
          className="pointer-events-none absolute top-[20%] left-1/2 hidden h-[50%] w-[70%] -translate-x-1/2 rounded-full sm:block"
          style={{
            background: "radial-gradient(ellipse, rgba(255,200,150,0.12) 0%, transparent 70%)",
            animation: "ghatsAura 3s ease-in-out infinite",
          }}
        />

        {/* Subtle floating light particles - Desktop only */}
        <div className="hidden sm:block">
          {[...Array(6)].map((_, i) => (
            <div
              key={`ghat-particle-${i}`}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: `${25 + (i % 3) * 25}%`,
                top: `${30 + Math.floor(i / 3) * 20}%`,
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle, #FFD4A0 0%, transparent 70%)"
                    : "radial-gradient(circle, #FFA060 0%, transparent 70%)",
                animation: `floatParticle ${2.5 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: "0 0 8px rgba(255,180,100,0.6)",
              }}
            />
          ))}
        </div>

        <Image
          src={IMAGES.hero.ghatsNight}
          alt="Varanasi Ghats at Night"
          width={1000}
          height={600}
          className="h-auto max-h-[26vh] w-full object-contain sm:max-h-[100vh] sm:drop-shadow-[0_0_25px_rgba(255,180,100,0.5)]"
          priority
        />
      </div>
    );
  }

  // Day version (dawn, morning, afternoon, evening)
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-[30.18%] left-[1%] w-[65%] sm:bottom-[24.3%] sm:left-[-10%] sm:w-[62%]"
      style={{
        zIndex: Z_HERO.GHATS,
      }}
    >
      {/* Soft divine glow behind ghats - Desktop only */}
      <div
        className="pointer-events-none absolute top-[20%] left-1/2 hidden h-[50%] w-[70%] -translate-x-1/2 rounded-full sm:block"
        style={{
          background: "radial-gradient(ellipse, rgba(255,150,150,0.15) 0%, transparent 70%)",
          animation: "ghatsAura 3s ease-in-out infinite",
        }}
      />

      {/* Subtle floating light particles - Desktop only */}
      <div className="hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={`ghat-particle-${i}`}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${25 + (i % 3) * 25}%`,
              top: `${30 + Math.floor(i / 3) * 20}%`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, #FFB6C1 0%, transparent 70%)"
                  : "radial-gradient(circle, #FF6B6B 0%, transparent 70%)",
              animation: `floatParticle ${2.5 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: "0 0 8px rgba(255,150,150,0.6)",
            }}
          />
        ))}
      </div>

      <Image
        src={IMAGES.hero.ghatsDay}
        alt="Varanasi Ghats"
        width={1000}
        height={600}
        className="h-auto max-h-[26vh] w-full object-contain sm:max-h-[100vh] sm:drop-shadow-[0_0_20px_rgba(255,100,100,0.4)]"
        priority
      />
    </div>
  );
});
