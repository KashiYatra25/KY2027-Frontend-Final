"use client";

import { motion } from "framer-motion";

// Sound Wave Circles (desktop only)
export const SoundWaves = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {[1, 2, 3].map((i) => (
      <motion.circle
        key={i}
        cx="50"
        cy="50"
        r={15 + i * 12}
        fill="none"
        stroke="#6366f1"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0.5, 0], scale: [0.8, 1.2] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeOut",
        }}
      />
    ))}
    <circle cx="50" cy="50" r="12" fill="#6366f1" />
  </svg>
);
