"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
