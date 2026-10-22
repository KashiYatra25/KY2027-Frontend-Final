"use client";

import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Animated cross/plus decoration
 */
export const CrossDecor = memo(function CrossDecor({
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
      initial={{ rotate: 0, scale: 1 }}
      animate={{ rotate: 180, scale: [1, 1.1, 1] }}
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
    >
      <path d="M12 2v20M2 12h20" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
});
