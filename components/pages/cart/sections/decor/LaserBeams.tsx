"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Animated laser beam sweeps - concert stage effect adapted for royal theme
 */
export function LaserBeams() {
  const beams = [
    { left: "15%", delay: 0, duration: 9 },
    { left: "50%", delay: 2, duration: 12 },
    { left: "85%", delay: 1, duration: 10 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute -top-[20%] h-[140vh] w-[2px]"
          style={{
            left: beam.left,
            background: `linear-gradient(to bottom, transparent, ${COLORS.GOLD}60, ${COLORS.MAROON}40, transparent)`,
            boxShadow: `0 0 15px ${COLORS.GOLD}60, 0 0 30px ${COLORS.MAROON}40`,
            transformOrigin: "top center",
            opacity: 0.4,
          }}
          animate={{
            rotate: [
              i === 2 ? 30 : -35 + i * 20,
              i === 2 ? -15 : 10 + i * 5,
              i === 2 ? 25 : -20 + i * 10,
            ],
            scaleY: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: beam.delay,
          }}
        />
      ))}
    </div>
  );
}
