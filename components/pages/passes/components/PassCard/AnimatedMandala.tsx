"use client";

import { motion } from "framer-motion";

// ============================================
// Animated Mandala Ring for Card Back
// ============================================
export function AnimatedMandala({
  color,
  size = 200,
  isAnimating = true,
}: {
  color: string;
  size?: number;
  isAnimating?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute"
      style={{ width: size, height: size }}
      animate={isAnimating ? { rotate: 360 } : undefined}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer circles */}
      <circle cx="100" cy="100" r="95" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="85" fill="none" stroke={color} strokeWidth="0.3" opacity="0.2" />
      <circle
        cx="100"
        cy="100"
        r="75"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.25"
      />
      <circle cx="100" cy="100" r="65" fill="none" stroke={color} strokeWidth="0.3" opacity="0.2" />

      {/* Radial lines */}
      {[...Array(12)].map((_, i) => (
        <line
          key={`line-${i}`}
          x1="100"
          y1="5"
          x2="100"
          y2="25"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.35"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}

      {/* Outer dots */}
      {[...Array(24)].map((_, i) => (
        <circle
          key={`dot-${i}`}
          cx="100"
          cy="12"
          r="2"
          fill={color}
          opacity="0.4"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}

      {/* Inner petals */}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={`petal-${i}`}
          cx="100"
          cy="55"
          rx="6"
          ry="12"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.3"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
    </motion.svg>
  );
}
