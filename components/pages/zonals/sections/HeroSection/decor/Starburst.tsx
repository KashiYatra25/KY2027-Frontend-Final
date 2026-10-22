"use client";

import { motion } from "framer-motion";

/** Rotating many-pointed starburst (pure SVG). */
export function Starburst({
  size,
  color,
  points = 12,
  duration = 24,
  reverse = false,
}: {
  size: number;
  color: string;
  points?: number;
  duration?: number;
  reverse?: boolean;
}) {
  const outer = size / 2;
  const inner = outer * 0.52;
  const cx = outer;
  const cy = outer;
  const coords: string[] = [];
  const step = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    coords.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      style={{ display: "block" }}
    >
      <polygon points={coords.join(" ")} fill={color} />
    </motion.svg>
  );
}
