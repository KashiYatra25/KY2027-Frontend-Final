"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

/**
 * GlowingMoon - Large moon in top-right corner
 * Positioned so only ~half is visible (3/4 moon feel)
 * Desktop only for performance
 */
export const GlowingMoon = memo(function GlowingMoon() {
  return (
    <div className="pointer-events-none absolute -top-[36vh] -right-[100vw] z-[1] aspect-square w-[180vw] sm:-top-[50%] sm:-right-[45%] sm:left-auto sm:w-[90vw]">
      {/* Radiance rings - bluish-white glow rings around moon */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            transparent 35%, 
            rgba(173,216,255,0.05) 40%, 
            transparent 45%,
            rgba(200,230,255,0.03) 50%,
            transparent 55%,
            rgba(180,220,255,0.02) 60%,
            transparent 65%
          )`,
        }}
      />

      {/* Inner bluish-white glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(200,230,255,0.2) 0%, rgba(150,200,255,0.1) 20%, transparent 50%)`,
          filter: "blur(40px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Soft outer bluish-white radiance */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(180,220,255,0.08) 0%, rgba(140,190,255,0.04) 30%, transparent 60%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Moon image - static on mobile, slow rotation on desktop (via CSS class) */}
      <Image
        src={IMAGES.proNites.moon}
        alt=""
        fill
        className="pronites-moon-rotate object-contain"
        style={{
          filter: `drop-shadow(0 0 40px rgba(180,220,255,0.3)) drop-shadow(0 0 80px rgba(150,200,255,0.2)) drop-shadow(0 0 120px rgba(120,180,255,0.15))`,
        }}
        priority
      />
    </div>
  );
});
