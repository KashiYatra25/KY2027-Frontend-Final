"use client";

import { COLORS } from "@/components/pages/zonals/constants/palette";

// ── Crowd silhouette: layered SVG of heads + raised hands ─────────────
export function CrowdSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="block h-[26vh] max-h-[260px] w-full"
      role="presentation"
    >
      {/* Back row (lighter) */}
      <path
        fill={COLORS.DEEP_INK}
        opacity="0.65"
        d="M0 160 Q 40 120 80 150 T 160 150 Q 200 110 240 150 T 320 150 Q 360 115 400 150 T 480 150 Q 520 120 560 150 T 640 150 Q 680 110 720 150 T 800 150 Q 840 120 880 150 T 960 150 Q 1000 110 1040 150 T 1120 150 Q 1160 120 1200 150 T 1280 150 Q 1320 115 1360 150 T 1440 150 L1440 220 L0 220 Z"
      />
      {/* Front row (solid black heads + hands) */}
      <path
        fill={COLORS.DEEP_INK}
        d="M0 185 Q 30 150 60 180 Q 72 150 90 180 Q 120 150 150 182 Q 165 148 185 182 Q 220 150 250 184 Q 270 150 290 184 Q 320 152 352 184 Q 372 150 392 184 Q 430 150 460 185 Q 480 150 500 185 Q 535 152 568 185 Q 588 150 608 185 Q 645 150 675 185 Q 695 150 715 185 Q 752 152 785 185 Q 805 150 825 185 Q 862 150 892 185 Q 912 150 932 185 Q 968 152 1000 185 Q 1020 150 1040 185 Q 1078 150 1108 185 Q 1128 150 1148 185 Q 1185 152 1218 185 Q 1238 150 1258 185 Q 1295 150 1325 185 Q 1345 150 1365 185 Q 1402 152 1440 185 L1440 220 L0 220 Z"
      />
      {/* A few raised hands/phones over the crowd */}
      {[120, 340, 560, 820, 1050, 1290].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={i % 2 === 0 ? 120 : 132}
          width="6"
          height={i % 2 === 0 ? 44 : 32}
          rx="3"
          fill={COLORS.DEEP_INK}
        />
      ))}
    </svg>
  );
}
