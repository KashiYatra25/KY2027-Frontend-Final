"use client";

import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { useAnimationPolicy } from "@/hooks";

// Animated Laser Beams - Only 2 (extreme left and extreme right) - Desktop only
export function LaserBeams() {
  const { isAnimating } = useMotionZone();
  const { isMobile } = useAnimationPolicy();

  if (!isAnimating || isMobile) return null;

  const beams = [
    { color: "#EC4899", top: "20%", fromLeft: true },
    { color: "#8B5CF6", top: "60%", fromLeft: false },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px]"
          style={{
            width: "100%",
            background: `linear-gradient(90deg, transparent, ${beam.color}, transparent)`,
            top: beam.top,
            transformOrigin: beam.fromLeft ? "left" : "right",
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.7, 0],
            rotate: beam.fromLeft ? [0, 15, 0] : [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
