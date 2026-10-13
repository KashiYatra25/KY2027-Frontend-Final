"use client";

import { motion } from "framer-motion";
import { TONE_COLORS } from "@/components/pages/schedule/constants";

// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PAGE LOADER
// Lightweight overlay loader shown while the campus map / schedule data
// is being prepared.
// ═══════════════════════════════════════════════════════════════════

export function ScheduleLoader() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="relative h-24 w-24">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "3px solid transparent",
            borderTopColor: TONE_COLORS.white,
            borderRightColor: TONE_COLORS.blue,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full"
          style={{
            border: "2px solid transparent",
            borderBottomColor: TONE_COLORS.green,
            borderLeftColor: TONE_COLORS.red,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.p
        className="mt-8 text-base font-light tracking-[0.2em] uppercase"
        style={{ color: TONE_COLORS.text }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading Schedule
      </motion.p>
    </div>
  );
}
