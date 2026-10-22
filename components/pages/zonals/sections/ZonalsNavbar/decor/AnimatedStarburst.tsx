"use client";

import { motion, useReducedMotion } from "framer-motion";
import { COLORS } from "@/components/pages/zonals/constants/palette";

// ───────────────────────────────────────────────────────────────────
// ANIMATED STARBURST COMPONENT
// ───────────────────────────────────────────────────────────────────

export function AnimatedStarburst({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
        fill={COLORS.ACID_LIME}
      />
    </motion.svg>
  );
}
