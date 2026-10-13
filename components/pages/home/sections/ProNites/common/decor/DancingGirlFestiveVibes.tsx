"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

/**
 * DancingGirlFestiveVibes - Top-left corner (static image)
 * Shown on all screens; lower z-index on mobile.
 */
export const DancingGirlFestiveVibes = memo(function DancingGirlFestiveVibes() {
  return (
    <div className="pointer-events-none absolute top-[15%] -left-[2%] z-[40] w-[55vw] sm:top-[3%] sm:w-[38vw]">
      {/* Glow behind DancingGirlFestiveVibes - subtle dark blue */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(30,30,80,0.4) 0%, rgba(20,20,60,0.2) 40%, transparent 70%)`,
          filter: "blur(30px)",
          transform: "scale(1.3)",
        }}
      />

      {/* DancingGirlFestiveVibes image - Static */}
      <Image
        src={IMAGES.proNites.aerobics}
        alt="DancingGirlFestiveVibes"
        width={400}
        height={500}
        className="relative h-auto w-full"
        style={{
          filter: `drop-shadow(0 0 25px rgba(50,50,120,0.5)) drop-shadow(0 0 50px rgba(30,30,80,0.3))`,
        }}
      />
    </div>
  );
});
