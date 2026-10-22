"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/images";

export function StaticMoonFallback() {
  return (
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
  );
}
