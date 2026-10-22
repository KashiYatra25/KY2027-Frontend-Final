"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
