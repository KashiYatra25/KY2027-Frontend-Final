"use client";

import { motion } from "framer-motion";

// Animated Music Notes (desktop only)
export const FloatingNotes = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <motion.g
      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="20" cy="70" r="8" fill="#6366f1" />
      <rect x="26" y="30" width="3" height="42" fill="#6366f1" />
      <path
        d="M29,30 Q50,20 45,45"
        fill="none"
        stroke="#6366f1"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.g>
    <motion.g
      animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <circle cx="65" cy="60" r="6" fill="#8b5cf6" />
      <rect x="69" y="30" width="3" height="32" fill="#8b5cf6" />
    </motion.g>
  </svg>
);
