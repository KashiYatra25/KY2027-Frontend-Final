"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
