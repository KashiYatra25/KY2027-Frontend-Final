"use client";

import { IMAGES } from "@/lib/images";

// Silhouette Image at bottom
export function SilhouetteImage() {
  return (
    <div
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-[450px] sm:h-[180px]"
      style={{ zIndex: 50 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGES.proNites.silhouette}
        alt="Crowd silhouette"
        className="h-full w-full object-cover object-top"
        onError={(e) => {
          (e.target as HTMLImageElement).src = IMAGES.proNites.silhouette;
        }}
      />
    </div>
  );
}
