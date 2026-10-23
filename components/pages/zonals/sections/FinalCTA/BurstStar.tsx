"use client";

import { COLORS } from "@/components/pages/zonals/constants/palette";

// ── Burst / seal star (SVG) ───────────────────────────────────────────
export function BurstStar({ size, fill }: { size: number; fill: string }) {
  // 12-point burst built from alternating outer/inner radii.
  const points = 12;
  const outer = 50;
  const inner = 38;
  const cx = 50;
  const cy = 50;
  const path = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="presentation"
      className="opacity-90"
    >
      <polygon points={path} fill={fill} stroke={COLORS.DEEP_INK} strokeWidth="2" />
      <circle cx="50" cy="50" r="22" fill={COLORS.DEEP_INK} />
      <text
        x="50"
        y="54"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill={COLORS.ACID_LIME}
        style={{ letterSpacing: "0.1em" }}
      >
        2027
      </text>
    </svg>
  );
}
