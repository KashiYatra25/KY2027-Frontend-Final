"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

// ═══════════════════════════════════════════════════════════════════
// AMBIENT PARTICLES - Floating pixel dust (reduced for performance)
// ═══════════════════════════════════════════════════════════════════
export const AmbientParticles = memo(function AmbientParticles() {
  const { isAnimating } = useMotionZone();

  // Reduced to 6 particles for better performance
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${10 + i * 15}%`,
    delay: i * 1.5,
    duration: 10 + (i % 3) * 3,
    size: 2,
    color: [FOOTER_COLORS.NEON_CYAN, FOOTER_COLORS.NEON_PINK, FOOTER_COLORS.NEON_PURPLE][i % 3],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "15%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            opacity: 0.5,
            willChange: "transform",
          }}
          animate={
            isAnimating
              ? {
                  y: [0, -400],
                }
              : {}
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});
