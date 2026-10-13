"use client";

import { motion } from "framer-motion";

// Headphones Icon (desktop only - animated)
export const HeadphonesIcon = ({ className = "" }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 60 50"
    className={className}
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <path
      d="M10,35 Q10,12 30,12 Q50,12 50,35"
      fill="none"
      stroke="#6366f1"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <rect
      x="3"
      y="30"
      width="12"
      height="18"
      rx="4"
      fill="#1a1a2e"
      stroke="#6366f1"
      strokeWidth="2"
    />
    <rect
      x="45"
      y="30"
      width="12"
      height="18"
      rx="4"
      fill="#1a1a2e"
      stroke="#6366f1"
      strokeWidth="2"
    />
  </motion.svg>
);
