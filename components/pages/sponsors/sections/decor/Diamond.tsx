"use client";

import { memo } from "react";
import { motion } from "framer-motion";

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
