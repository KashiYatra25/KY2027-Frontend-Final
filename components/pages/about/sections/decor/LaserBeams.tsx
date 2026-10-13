"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";

// LASER BEAMS - Top to bottom diagonal lasers across the About page

export const LaserBeams = memo(function LaserBeams() {
  const { shouldAnimate } = useAnimationPolicy();

  // Don't render on mobile or if user prefers reduced motion
  if (!shouldAnimate) return null;

  const lasers = [
    { startX: "5%", delay: 0, duration: 4, opacity: 0.15 },
    { startX: "15%", delay: 1.5, duration: 5, opacity: 0.1 },
    { startX: "25%", delay: 0.8, duration: 4.5, opacity: 0.12 },
    { startX: "40%", delay: 2, duration: 5.5, opacity: 0.08 },
    { startX: "60%", delay: 0.5, duration: 4, opacity: 0.1 },
    { startX: "75%", delay: 1.8, duration: 5, opacity: 0.12 },
    { startX: "85%", delay: 0.3, duration: 4.2, opacity: 0.15 },
    { startX: "95%", delay: 2.5, duration: 5, opacity: 0.1 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* SVG for laser beams */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          {/* Gradient for laser glow effect */}
          <linearGradient id="laserGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="20%" stopColor="#6366f1" stopOpacity="1" />
            <stop offset="80%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lasers.map((laser, i) => (
          <motion.line
            key={i}
            x1={laser.startX}
            y1="0%"
            x2={`calc(${laser.startX} + 15%)`}
            y2="100%"
            stroke="url(#laserGradient)"
            strokeWidth="2"
            filter="url(#laserGlow)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0, laser.opacity, laser.opacity, 0],
              pathLength: [0, 1, 1, 1],
            }}
            transition={{
              duration: laser.duration,
              delay: laser.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Additional animated laser streaks using divs */}
      {[
        { left: "10%", angle: 15, delay: 0 },
        { left: "30%", angle: 12, delay: 1 },
        { left: "50%", angle: 8, delay: 2 },
        { left: "70%", angle: 10, delay: 1.5 },
        { left: "90%", angle: 14, delay: 0.5 },
      ].map((beam, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute top-0 h-[150vh] w-[2px]"
          style={{
            left: beam.left,
            background: `linear-gradient(180deg, 
              transparent 0%, 
              #6366f1 10%, 
              #8b5cf6 50%, 
              #a855f7 90%, 
              transparent 100%
            )`,
            transform: `rotate(${beam.angle}deg)`,
            transformOrigin: "top center",
            boxShadow: "0 0 10px #6366f1, 0 0 20px #8b5cf640",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            scaleY: [0, 1, 1, 1],
          }}
          transition={{
            duration: 6,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle moving spotlight effect at top */}
      <motion.div
        className="absolute -top-20 h-[300px] w-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, #6366f130 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          left: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
});
