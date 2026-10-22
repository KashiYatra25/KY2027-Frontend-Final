"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
