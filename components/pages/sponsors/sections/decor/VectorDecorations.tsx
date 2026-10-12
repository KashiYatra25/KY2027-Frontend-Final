"use client";

import { memo } from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// VECTOR DECORATIONS - Reusable decorative elements
// ═══════════════════════════════════════════════════════════════════

/**
 * Animated rotating starburst
 */
export const Starburst = memo(function Starburst({
  size,
  color,
  className = "",
  duration = 20,
  points = 12,
}: {
  size: number;
  color: string;
  className?: string;
  duration?: number;
  points?: number;
}) {
  const outer = size / 2;
  const inner = outer * 0.5;
  const coords: string[] = [];

  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / points - Math.PI / 2;
    coords.push(`${outer + r * Math.cos(a)},${outer + r * Math.sin(a)}`);
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      <polygon points={coords.join(" ")} fill={color} />
    </motion.svg>
  );
});

/**
 * Animated wavy line
 */
export const WavyLine = memo(function WavyLine({
  color,
  width = 200,
  className = "",
}: {
  color: string;
  width?: number;
  className?: string;
}) {
  return (
    <svg width={width} height="20" viewBox={`0 0 ${width} 20`} className={className} fill="none">
      <motion.path
        d={`M0 10 Q ${width * 0.125} 0, ${width * 0.25} 10 T ${width * 0.5} 10 T ${width * 0.75} 10 T ${width} 10`}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
});

/**
 * Animated dashed circle ring
 */
export const CircleRing = memo(function CircleRing({
  size,
  color,
  className = "",
  strokeWidth = 2,
  duration = 30,
}: {
  size: number;
  color: string;
  className?: string;
  strokeWidth?: number;
  duration?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray="10 5"
      />
    </motion.svg>
  );
});

/**
 * Animated cross/plus decoration
 */
export const CrossDecor = memo(function CrossDecor({
  size = 24,
  color,
  className = "",
}: {
  size?: number;
  color: string;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      initial={{ rotate: 0, scale: 1 }}
      animate={{ rotate: 180, scale: [1, 1.1, 1] }}
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
    >
      <path d="M12 2v20M2 12h20" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
});

/**
 * Animated diamond shape
 */
export const Diamond = memo(function Diamond({
  size = 24,
  color,
  className = "",
}: {
  size?: number;
  color: string;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: [0, 45, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    >
      <rect x="4" y="4" width="16" height="16" fill={color} transform="rotate(45 12 12)" />
    </motion.svg>
  );
});

/**
 * Zigzag line decoration
 */
export const ZigzagLine = memo(function ZigzagLine({
  color,
  width = 100,
  className = "",
}: {
  color: string;
  width?: number;
  className?: string;
}) {
  const points = [];
  const segments = 8;
  const amplitude = 8;

  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const y = i % 2 === 0 ? 0 : amplitude;
    points.push(`${x},${y + 5}`);
  }

  return (
    <svg width={width} height="20" viewBox={`0 0 ${width} 20`} className={className}>
      <motion.polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
});

/**
 * Dot grid decoration
 */
export const DotGrid = memo(function DotGrid({
  color,
  rows = 3,
  cols = 5,
  className = "",
}: {
  color: string;
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const spacing = 12;
  const dotSize = 3;

  return (
    <svg
      width={cols * spacing}
      height={rows * spacing}
      viewBox={`0 0 ${cols * spacing} ${rows * spacing}`}
      className={className}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return (
          <motion.circle
            key={i}
            cx={col * spacing + spacing / 2}
            cy={row * spacing + spacing / 2}
            r={dotSize / 2}
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
          />
        );
      })}
    </svg>
  );
});

/**
 * Animated arrow decoration
 */
export const ArrowDecor = memo(function ArrowDecor({
  color,
  size = 40,
  className = "",
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.svg>
  );
});

/**
 * Spiral decoration
 */
export const Spiral = memo(function Spiral({
  size = 60,
  color,
  className = "",
}: {
  size?: number;
  color: string;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, ease: "linear", repeat: Infinity }}
    >
      <path
        d="M30 30 Q35 25 30 20 Q20 20 20 30 Q20 45 35 45 Q50 45 50 30 Q50 10 30 10 Q5 10 5 35 Q5 55 30 55"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
});

/**
 * Floating circles animation
 */
export const FloatingCircles = memo(function FloatingCircles({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className={className}>
      <motion.circle
        cx="20"
        cy="20"
        r="8"
        fill={color}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="50"
        cy="40"
        r="5"
        fill={color}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.circle
        cx="30"
        cy="60"
        r="6"
        fill={color}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );
});
