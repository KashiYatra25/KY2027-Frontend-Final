"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Ambient stage spotlight glows - floating/pulsing effect
 */
export function StageSpotlights() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Top-left purple/gold spotlight */}
      <motion.div
        className="absolute -top-[10%] left-[15%] h-[550px] w-[550px] rounded-full blur-[90px]"
        style={{
          background: `radial-gradient(circle, ${COLORS.MAROON}30 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top-right gold spotlight */}
      <motion.div
        className="absolute -top-[5%] right-[10%] h-[500px] w-[500px] rounded-full blur-[85px]"
        style={{
          background: `radial-gradient(circle, ${COLORS.GOLD}25 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Bottom center glow */}
      <motion.div
        className="absolute bottom-[-20%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(ellipse, ${COLORS.GOLD}20 0%, ${COLORS.MAROON}10 50%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
