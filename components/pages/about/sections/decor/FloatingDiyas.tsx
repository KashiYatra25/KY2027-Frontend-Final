"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";
import { useAnimationPolicy } from "@/hooks";
import { FloatingDiya } from "./FloatingDiya";
import { type DiyaState } from "./DiyaSVG";

// ═══════════════════════════════════════════════════════════════════
// FLOATING DIYAS - Click to light, interactive spiritual element
// ═══════════════════════════════════════════════════════════════════

// Main component with multiple diyas
export const FloatingDiyas = memo(function FloatingDiyas({
  className = "",
}: {
  className?: string;
}) {
  const { shouldAnimate } = useAnimationPolicy();
  const [diyas, setDiyas] = useState<DiyaState[]>([
    { id: 1, x: 10, y: 20, isLit: false, scale: 0.8, floatOffset: 0 },
    { id: 2, x: 90, y: 25, isLit: false, scale: 0.9, floatOffset: 1.5 },
    { id: 3, x: 5, y: 60, isLit: false, scale: 0.7, floatOffset: 0.8 },
    { id: 4, x: 95, y: 65, isLit: false, scale: 0.85, floatOffset: 2 },
    { id: 5, x: 15, y: 85, isLit: false, scale: 0.75, floatOffset: 1.2 },
    { id: 6, x: 85, y: 88, isLit: false, scale: 0.8, floatOffset: 0.5 },
  ]);

  const [allLitMessage, setAllLitMessage] = useState(false);

  const toggleDiya = useCallback((id: number) => {
    setDiyas((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, isLit: !d.isLit } : d));

      // Check if all diyas are lit
      if (updated.every((d) => d.isLit)) {
        setAllLitMessage(true);
        setTimeout(() => setAllLitMessage(false), 3000);
      }

      return updated;
    });
  }, []);

  const litCount = diyas.filter((d) => d.isLit).length;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[5] ${className}`}>
      {/* Counter */}
      <motion.div
        className="pointer-events-auto fixed bottom-4 left-4 rounded-full px-4 py-2"
        style={{
          background: `${COLORS.BG_DEEP}dd`,
          border: `1px solid ${COLORS.BRIGHT_GOLD}40`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-sm font-medium" style={{ color: COLORS.BRIGHT_GOLD }}>
          🪔 {litCount}/{diyas.length} Diyas Lit
        </span>
      </motion.div>

      {/* All lit celebration message */}
      <AnimatePresence>
        {allLitMessage && (
          <motion.div
            className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 rounded-lg px-8 py-4 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: `linear-gradient(135deg, ${COLORS.BG_DEEP}ee, ${COLORS.MAROON}dd)`,
              border: `2px solid ${COLORS.BRIGHT_GOLD}`,
              boxShadow: `0 0 40px ${COLORS.BRIGHT_GOLD}40`,
            }}
          >
            <p className="mb-1 text-xl font-bold" style={{ color: COLORS.BRIGHT_GOLD }}>
              ✨ शुभ दीपावली ✨
            </p>
            <p className="text-sm" style={{ color: COLORS.CREAM }}>
              All diyas illuminated. May light guide your path.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating diyas */}
      {diyas.map((diya) => (
        <div key={diya.id} className="pointer-events-auto">
          <FloatingDiya diya={diya} onToggle={toggleDiya} prefersReducedMotion={shouldAnimate} />
        </div>
      ))}
    </div>
  );
});
