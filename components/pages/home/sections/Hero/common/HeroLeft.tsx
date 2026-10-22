"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Z_HERO } from "@/components/pages/home/constants";

interface HeroLeftProps {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * HeroLeft component — the left-side hero artwork.
 * Single image used at all times (no day/night variants).
 */
export const HeroLeft = memo(function HeroLeft({ ref }: HeroLeftProps) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-[30.18%] left-[-5%] w-[65%] sm:bottom-[25.7%] sm:left-[-9%] sm:w-[56%]"
      style={{
        zIndex: Z_HERO.HERO_LEFT,
      }}
    >
      <Image
        src={IMAGES.hero.heroLeft}
        alt="Kashiyatra hero artwork"
        width={1000}
        height={600}
        className="block h-auto w-full"
        priority
      />
    </div>
  );
});
