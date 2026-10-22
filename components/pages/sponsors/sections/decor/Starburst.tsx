"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
