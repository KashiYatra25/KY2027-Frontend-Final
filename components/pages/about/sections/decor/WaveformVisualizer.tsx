"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// WAVEFORM VISUALIZER - Animated audio waveform SVG
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
};

interface WaveformVisualizerProps {
  bars?: number;
  width?: number;
  height?: number;
  color?: "cyan" | "magenta" | "lime" | "pink" | "gradient";
  className?: string;
  interactive?: boolean;
}

export const WaveformVisualizer = memo(function WaveformVisualizer({
  bars = 32,
  width = 300,
  height = 80,
  color = "gradient",
  className = "",
  interactive = true,
}: WaveformVisualizerProps) {
  const { shouldAnimate } = useAnimationPolicy();
  const [isActive, setIsActive] = useState(!shouldAnimate);
  // Deterministic initial heights so SSR and client match; the interval randomizes after mount
  const [heights, setHeights] = useState<number[]>(() => Array.from({ length: bars }, () => 0.6));

  // Animate heights
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setHeights((prev) => prev.map(() => Math.random() * 0.8 + 0.2));
    }, 150);

    return () => clearInterval(interval);
  }, [isActive, bars]);

  const barWidth = (width - (bars - 1) * 2) / bars;

  const colors = {
    cyan: NEON.CYAN,
    magenta: NEON.MAGENTA,
    lime: NEON.LIME,
    pink: NEON.PINK,
    gradient: "url(#waveGradient)",
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`cursor-pointer ${className}`}
      onClick={() => interactive && setIsActive(!isActive)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={NEON.CYAN} />
          <stop offset="50%" stopColor={NEON.MAGENTA} />
          <stop offset="100%" stopColor={NEON.LIME} />
        </linearGradient>

        <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Waveform bars */}
      {heights.map((h, i) => {
        const barHeight = h * height * 0.9;
        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;

        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={barWidth / 2}
            fill={colors[color]}
            filter="url(#waveGlow)"
            initial={false}
            animate={{
              height: barHeight,
              y: y,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Click hint */}
      {interactive && !isActive && (
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={NEON.CYAN}
          fontSize="12"
          fontWeight="bold"
        >
          TAP TO PLAY
        </text>
      )}
    </motion.svg>
  );
});
