"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Floating mandala patterns for background decoration
 */
export function FloatingMandalas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-left mandala */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -left-32 h-64 w-64 opacity-[0.03]"
        style={{
          background: `conic-gradient(from 0deg, ${COLORS.GOLD}, transparent, ${COLORS.GOLD}, transparent, ${COLORS.GOLD})`,
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Top-right mandala */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 h-48 w-48 opacity-[0.04]"
        style={{
          background: `conic-gradient(from 45deg, ${COLORS.MAROON}, transparent, ${COLORS.MAROON}, transparent)`,
          borderRadius: "50%",
        }}
      />

      {/* Bottom-left mandala */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -left-24 h-56 w-56 opacity-[0.03]"
        style={{
          background: `conic-gradient(from 90deg, ${COLORS.GOLD}, transparent, ${COLORS.GOLD}, transparent, ${COLORS.GOLD}, transparent)`,
          borderRadius: "50%",
        }}
      />

      {/* Center-right mandala */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -right-32 h-72 w-72 -translate-y-1/2 opacity-[0.02]"
        style={{
          background: `conic-gradient(from 0deg, ${COLORS.GOLD}, transparent, ${COLORS.MAROON}, transparent, ${COLORS.GOLD}, transparent)`,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
