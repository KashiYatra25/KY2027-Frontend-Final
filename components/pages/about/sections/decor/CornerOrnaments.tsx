"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// CORNER ORNAMENTS FOR CARDS
// ═══════════════════════════════════════════════════════════════════
export const CornerOrnaments = memo(function CornerOrnaments() {
  return (
    <>
      {/* Top-left */}
      <div className="pointer-events-none absolute -top-2 -left-2 h-16 w-16 opacity-60 sm:h-20 sm:w-20">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      {/* Top-right */}
      <div className="pointer-events-none absolute -top-2 -right-2 h-16 w-16 -scale-x-100 opacity-60 sm:h-20 sm:w-20">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      {/* Bottom-left */}
      <div className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16 -scale-y-100 opacity-60 sm:h-20 sm:w-20">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      {/* Bottom-right */}
      <div className="pointer-events-none absolute -right-2 -bottom-2 h-16 w-16 scale-[-1] opacity-60 sm:h-20 sm:w-20">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
    </>
  );
});
