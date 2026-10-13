"use client";

import { COLORS } from "@/components/pages/passes/constants/palette";

export function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotations = { tl: 0, tr: 90, bl: -90, br: 180 };
  const positions = {
    tl: "top-2 left-2",
    tr: "top-2 right-2",
    bl: "bottom-2 left-2",
    br: "bottom-2 right-2",
  };

  return (
    <div
      className={`absolute ${positions[position]} pointer-events-none h-10 w-10`}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
    >
      <svg viewBox="0 0 50 50" className="h-full w-full">
        <path
          d="M5 5 Q5 25 25 25 Q15 15 5 5"
          fill="none"
          stroke="url(#goldGradCorner)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path d="M2 2 Q2 28 28 28" fill="none" stroke={COLORS.GOLD} strokeWidth="1" opacity="0.4" />
        <ellipse
          cx="10"
          cy="10"
          rx="3"
          ry="5"
          fill="none"
          stroke={COLORS.BRIGHT_GOLD}
          strokeWidth="0.8"
          opacity="0.5"
          transform="rotate(-45 10 10)"
        />
        <circle cx="6" cy="6" r="2" fill={COLORS.GOLD} opacity="0.6" />
        <defs>
          <linearGradient id="goldGradCorner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} />
            <stop offset="100%" stopColor={COLORS.GOLD_BROWN} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
