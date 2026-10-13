"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Concert-style floating dust particles - multi-colored (gold, maroon, purple)
 */
export function GoldenParticles() {
  const colors = [COLORS.GOLD, COLORS.MAROON, "#8B5CF6"]; // Gold, Maroon, Purple

  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.5 + 0.2,
    speedX: (Math.random() - 0.5) * 30,
    speedY: -(Math.random() * 50 + 30), // Upward drift
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, particle.speedY, 0],
            x: [0, particle.speedX, 0],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
