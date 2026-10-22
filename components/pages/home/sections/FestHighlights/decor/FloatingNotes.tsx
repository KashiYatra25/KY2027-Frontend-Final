"use client";

import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { useAnimationPolicy } from "@/hooks";

// Floating Music Notes - Desktop only
export function FloatingNotes() {
  const { isAnimating } = useMotionZone();
  const { isMobile } = useAnimationPolicy();
  const notes = ["♪", "♫", "♬"];

  if (!isAnimating || isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-xl sm:text-2xl"
          style={{
            left: `${15 + i * 15}%`,
            color: ["#EC4899", "#8B5CF6", "#06B6D4", "#F59E0B"][i % 4],
            textShadow: `0 0 10px currentColor`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear",
          }}
        >
          {notes[i % notes.length]}
        </motion.span>
      ))}
    </div>
  );
}
