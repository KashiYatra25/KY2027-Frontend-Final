"use client";

import { motion, useReducedMotion } from "framer-motion";
import { COLORS } from "@/components/pages/zonals/constants/palette";

// ───────────────────────────────────────────────────────────────────
// MINI EQUALIZER (decorative)
// ───────────────────────────────────────────────────────────────────

export function MiniEqualizer() {
  const shouldReduceMotion = useReducedMotion();
  const bars = [0.6, 1, 0.4, 0.8, 0.5];

  return (
    <div className="flex h-3 items-end gap-[2px]">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ backgroundColor: COLORS.ACID_LIME }}
          animate={
            shouldReduceMotion
              ? { height: `${height * 100}%` }
              : {
                  height: ["40%", `${height * 100}%`, "60%", `${height * 80}%`, "40%"],
                }
          }
          transition={{
            duration: 0.8 + i * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
