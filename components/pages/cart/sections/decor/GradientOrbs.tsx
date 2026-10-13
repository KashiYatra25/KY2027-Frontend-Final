"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Gradient orbs/blurs for ambient background lighting
 */
export function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gold orb - top left */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl"
        style={{ background: COLORS.GOLD }}
      />

      {/* Maroon orb - top right */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -top-20 -right-40 h-80 w-80 rounded-full blur-3xl"
        style={{ background: COLORS.MAROON }}
      />

      {/* Gold orb - bottom right */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -right-32 -bottom-32 h-72 w-72 rounded-full blur-3xl"
        style={{ background: COLORS.GOLD }}
      />

      {/* Purple/Maroon orb - center left */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -left-48 h-96 w-96 rounded-full blur-3xl"
        style={{ background: `linear-gradient(135deg, ${COLORS.MAROON}, ${COLORS.GOLD}40)` }}
      />
    </div>
  );
}
