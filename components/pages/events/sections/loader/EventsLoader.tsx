"use client";

import { motion } from "framer-motion";
import { COLORS, JAZZ_COLORS } from "@/components/pages/events/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// EVENTS PAGE LOADER
// Lightweight loader shown while event categories are being prepared.
// ═══════════════════════════════════════════════════════════════════

export function EventsLoader() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="relative h-24 w-24">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "3px solid transparent",
            borderTopColor: JAZZ_COLORS.HOT_PINK,
            borderRightColor: COLORS.BRIGHT_GOLD,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full"
          style={{
            border: "2px solid transparent",
            borderBottomColor: JAZZ_COLORS.ROYAL_PURPLE,
            borderLeftColor: COLORS.GOLD,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.p
        className="mt-8 text-base font-light tracking-[0.2em] uppercase"
        style={{ color: COLORS.CREAM }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading Events
      </motion.p>
    </div>
  );
}
