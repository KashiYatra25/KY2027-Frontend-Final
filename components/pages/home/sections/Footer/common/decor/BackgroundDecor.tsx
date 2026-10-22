"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";
import { SpotlightCones } from "./SpotlightCones";
import { FooterDancer } from "./FooterDancer";
import { AmbientParticles } from "./AmbientParticles";

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT - BackgroundDecor
// ═══════════════════════════════════════════════════════════════════
export const BackgroundDecor = memo(function BackgroundDecor() {
  return (
    <>
      {/* Concert floor background - Desktop only */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 hidden h-[50%] sm:block">
        <Image
          src={IMAGES.footer.concertFloor}
          alt=""
          fill
          className="object-cover object-top"
          style={{
            opacity: 0.7,
          }}
        />
      </div>

      {/* Spotlight beams - Desktop only (handled inside component) */}
      <SpotlightCones />

      {/* Footer dancer on the right - Desktop only (handled inside component) */}
      <FooterDancer />

      {/* Ambient floating particles - Desktop only (handled inside component) */}
      <AmbientParticles />

      {/* Top edge glow - Both mobile and desktop */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${FOOTER_COLORS.NEON_CYAN} 25%, 
            ${FOOTER_COLORS.NEON_PINK} 50%, 
            ${FOOTER_COLORS.NEON_PURPLE} 75%, 
            transparent 100%
          )`,
          boxShadow: `0 0 20px ${FOOTER_COLORS.NEON_PINK}60`,
        }}
      />
    </>
  );
});
