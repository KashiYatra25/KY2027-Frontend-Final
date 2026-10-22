"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

// ═══════════════════════════════════════════════════════════════════
// SPOTLIGHT CONES - Sweeping light beams - Desktop only (just 2)
// ═══════════════════════════════════════════════════════════════════
export const SpotlightCones = memo(function SpotlightCones() {
  const { isAnimating } = useMotionZone();

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {/* Left spotlight */}
      <motion.div
        className="absolute bottom-0 left-[8%] h-[100%] w-[300px] origin-bottom"
        style={{
          background: `linear-gradient(0deg, ${FOOTER_COLORS.NEON_CYAN}30 0%, ${FOOTER_COLORS.NEON_CYAN}08 30%, transparent 100%)`,
          clipPath: "polygon(45% 100%, 55% 100%, 100% 0%, 0% 0%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={
          isAnimating
            ? {
                rotate: [-15, 15, -15],
              }
            : {}
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right spotlight */}
      <motion.div
        className="absolute right-[8%] bottom-0 h-[100%] w-[300px] origin-bottom"
        style={{
          background: `linear-gradient(0deg, ${FOOTER_COLORS.NEON_PINK}30 0%, ${FOOTER_COLORS.NEON_PINK}08 30%, transparent 100%)`,
          clipPath: "polygon(45% 100%, 55% 100%, 100% 0%, 0% 0%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={
          isAnimating
            ? {
                rotate: [15, -15, 15],
              }
            : {}
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
});
