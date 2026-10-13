"use client";

import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// NEON TEXT - Simple static neon-styled text
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
};

// Simpler static neon text
export const NeonText = memo(function NeonText({
  children,
  color = "cyan",
  className = "",
  glow = true,
}: {
  children: React.ReactNode;
  color?: "cyan" | "magenta" | "lime" | "pink" | "orange";
  className?: string;
  glow?: boolean;
}) {
  const colors = {
    cyan: NEON.CYAN,
    magenta: NEON.MAGENTA,
    lime: NEON.LIME,
    pink: NEON.PINK,
    orange: "#FF6B00",
  };

  return (
    <span
      className={className}
      style={{
        color: colors[color],
        textShadow: glow
          ? `0 0 10px ${colors[color]}, 0 0 20px ${colors[color]}50, 0 0 40px ${colors[color]}30`
          : undefined,
      }}
    >
      {children}
    </span>
  );
});
