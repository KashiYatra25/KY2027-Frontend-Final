"use client";

import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Floating circles animation
 */
export const FloatingCircles = memo(function FloatingCircles({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className={className}>
      <motion.circle
        cx="20"
        cy="20"
        r="8"
        fill={color}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="50"
        cy="40"
        r="5"
        fill={color}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.circle
        cx="30"
        cy="60"
        r="6"
        fill={color}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );
});
