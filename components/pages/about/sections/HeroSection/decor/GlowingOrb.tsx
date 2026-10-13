"use client";

import { motion } from "framer-motion";

// Glowing Orb (desktop only)
export const GlowingOrb = ({
  color = "#6366f1",
  className = "",
}: {
  color?: string;
  className?: string;
}) => (
  <motion.div
    className={`rounded-full ${className}`}
    style={{
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    }}
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);
