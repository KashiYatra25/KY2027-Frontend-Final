"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE DIVIDER (shared)
// ═══════════════════════════════════════════════════════════════════
export const MysticDivider = memo(function MysticDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative">
        {/* Golden glow behind divider - Desktop only */}
        <div
          className="absolute inset-0 -inset-x-10 hidden lg:block"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, rgba(255,180,50,0.15) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <Image
          src={IMAGES.contact.mysticDivider}
          alt=""
          width={600}
          height={60}
          className="relative h-auto w-full max-w-[400px] opacity-90 sm:max-w-[550px]"
          style={{ filter: "drop-shadow(0 0 15px rgba(255,215,0,0.4))" }}
        />
      </div>
    </div>
  );
});
