"use client";

import { motion } from "framer-motion";

// Animated Equalizer Bars (desktop only)
export const EqualizerBars = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 40" className={className}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <motion.rect
        key={i}
        x={i * 8 + 2}
        width="5"
        rx="2"
        fill={i % 2 === 0 ? "#6366f1" : "#8b5cf6"}
        animate={{
          height: [8, 25 + Math.random() * 12, 10, 30, 15],
          y: [32, 15 - Math.random() * 5, 30, 10, 25],
        }}
        transition={{
          duration: 0.6 + Math.random() * 0.4,
          repeat: Infinity,
          delay: i * 0.08,
          ease: "easeInOut",
        }}
      />
    ))}
  </svg>
);
