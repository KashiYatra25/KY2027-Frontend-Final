"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
