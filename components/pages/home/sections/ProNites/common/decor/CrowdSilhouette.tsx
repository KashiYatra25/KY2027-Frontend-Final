"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

/**
 * CrowdSilhouette - Concert crowd at the bottom
 * Shows on both mobile and desktop
 */
export const CrowdSilhouette = memo(function CrowdSilhouette() {
  return (
    <div className="pointer-events-none z-[500] hidden h-[100px] sm:absolute sm:-bottom-[150px] sm:block sm:h-[400px] sm:w-[1500px]">
      {/* Glow behind the crowd */}
      <div
        className="absolute right-0 bottom-0 left-0 h-full"
        style={{
          background: `linear-gradient(to top, rgba(100,80,180,0.3) 0%, transparent 70%)`,
        }}
      />

      {/* Silhouette image */}
      <Image
        src={IMAGES.proNites.silhouette}
        alt=""
        fill
        className="object-cover object-bottom"
        style={{
          opacity: 0.85,
          filter: "drop-shadow(0 -5px 20px rgba(100,80,180,0.4))",
        }}
      />
    </div>
  );
});
