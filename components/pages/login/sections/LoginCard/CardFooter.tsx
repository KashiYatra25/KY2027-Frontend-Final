"use client";

import Image from "next/image";
import { ROYAL_COLORS } from "@/components/pages/login/constants/palette";

export function CardFooter() {
  return (
    <div className="relative z-10 mt-8">
      <div className="flex items-center justify-center gap-3">
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${ROYAL_COLORS.GOLD}40)`,
          }}
        />
        <span className="text-2xl">🪔</span>
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, ${ROYAL_COLORS.GOLD}40, transparent)`,
          }}
        />
      </div>
      <p
        className="mt-3 text-center text-xs tracking-wider"
        style={{ color: `${ROYAL_COLORS.GOLD}60` }}
      >
        ✦ IIT (BHU) Varanasi ✦
      </p>

      {/* Security Badge - Secured by RTS */}
      <a
        href="https://rudrasec.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
      >
        <Image
          src="/security/RTSf_logo.png"
          alt="RTS Security"
          width={36}
          height={36}
          className="object-contain"
        />
        <span className="text-xs tracking-wider" style={{ color: `${ROYAL_COLORS.GOLD}50` }}>
          Secured by RTS
        </span>
      </a>
    </div>
  );
}
