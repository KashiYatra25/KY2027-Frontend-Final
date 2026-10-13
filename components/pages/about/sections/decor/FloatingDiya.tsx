"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";
import { DiyaSVG, type DiyaState } from "./DiyaSVG";

// ═══════════════════════════════════════════════════════════════════
// FLOATING DIYA - Single interactive click-to-light diya
// ═══════════════════════════════════════════════════════════════════

// Individual floating diya
export const FloatingDiya = memo(function FloatingDiya({
  diya,
  onToggle,
  prefersReducedMotion,
}: {
  diya: DiyaState;
  onToggle: (id: number) => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${diya.x}%`,
        top: `${diya.y}%`,
        transform: `translate(-50%, -50%) scale(${diya.scale})`,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -10, 0],
            }
      }
      transition={{
        duration: 4 + diya.floatOffset,
        repeat: Infinity,
        ease: "easeInOut",
        delay: diya.floatOffset,
      }}
      onClick={() => onToggle(diya.id)}
      whileHover={{ scale: diya.scale * 1.2 }}
      whileTap={{ scale: diya.scale * 0.9 }}
    >
      {/* Light halo (when lit) */}
      <AnimatePresence>
        {diya.isLit && (
          <motion.div
            className="pointer-events-none absolute -inset-8 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              background: `radial-gradient(circle, ${COLORS.BRIGHT_GOLD}40 0%, ${COLORS.SAFFRON}20 40%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <DiyaSVG isLit={diya.isLit} size={45} />

      {/* Tooltip */}
      <motion.span
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ color: `${COLORS.BRIGHT_GOLD}80` }}
      >
        {diya.isLit ? "✧ Blessed ✧" : "Click to light"}
      </motion.span>
    </motion.div>
  );
});
