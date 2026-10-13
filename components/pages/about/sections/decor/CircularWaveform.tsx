"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// CIRCULAR WAVEFORM - Radial animated audio waveform SVG
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
};

// Circular waveform variant
export const CircularWaveform = memo(function CircularWaveform({
  size = 200,
  bars = 48,
  color = "gradient",
  className = "",
}: {
  size?: number;
  bars?: number;
  color?: "cyan" | "magenta" | "lime" | "gradient";
  className?: string;
}) {
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, () => Math.random() * 0.5 + 0.5)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prev) => prev.map(() => Math.random() * 0.5 + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [bars]);

  const center = size / 2;
  const innerRadius = size * 0.25;
  const maxBarLength = size * 0.2;

  const colors = {
    cyan: NEON.CYAN,
    magenta: NEON.MAGENTA,
    lime: NEON.LIME,
    gradient: "url(#circleWaveGradient)",
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <defs>
        <linearGradient id="circleWaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={NEON.CYAN} />
          <stop offset="50%" stopColor={NEON.MAGENTA} />
          <stop offset="100%" stopColor={NEON.LIME} />
        </linearGradient>

        <filter id="circleWaveGlow">
          <feGaussianBlur stdDeviation="1.5" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {heights.map((h, i) => {
        const angle = (i * 360) / bars - 90;
        const rad = (angle * Math.PI) / 180;
        const barLength = h * maxBarLength;

        const x1 = center + Math.cos(rad) * innerRadius;
        const y1 = center + Math.sin(rad) * innerRadius;
        const x2 = center + Math.cos(rad) * (innerRadius + barLength);
        const y2 = center + Math.sin(rad) * (innerRadius + barLength);

        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={colors[color]}
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#circleWaveGlow)"
            initial={false}
            animate={{ x2, y2 }}
            transition={{ duration: 0.1 }}
          />
        );
      })}

      {/* Center circle */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius * 0.8}
        fill="none"
        stroke={colors[color]}
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
});
