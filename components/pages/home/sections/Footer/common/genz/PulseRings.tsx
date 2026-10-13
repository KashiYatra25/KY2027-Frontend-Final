"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

export const PulseRings = memo(function PulseRings() {
  const { shouldAnimate } = useAnimationPolicy();

  // Don't render pulse rings if animations should be reduced
  if (!shouldAnimate) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: i === 0 ? FOOTER_COLORS.NEON_PINK : FOOTER_COLORS.NEON_CYAN,
            width: 100,
            height: 100,
          }}
          animate={{
            scale: [1, 6],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
});
