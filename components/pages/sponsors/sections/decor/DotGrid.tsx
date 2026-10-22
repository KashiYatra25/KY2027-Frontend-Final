"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
