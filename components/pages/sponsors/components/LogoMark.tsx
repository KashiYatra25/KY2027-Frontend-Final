"use client";

// ───────────────────────────────────────────────────────────────────
// ANIMATED LOGO MARK
// ───────────────────────────────────────────────────────────────────

import Image from "next/image";
import { PALETTE } from "@/components/pages/sponsors/constants/palette";

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 8px ${PALETTE.ELECTRIC_VIOLET}55)`,
      }}
    >
      <Image
        src="/favicon.ico"
        alt="Kashiyatra"
        fill
        sizes="40px"
        className="object-contain"
        priority
      />
    </div>
  );
}
