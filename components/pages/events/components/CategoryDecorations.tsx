"use client";

import { memo } from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE SVG ELEMENTS FOR EVENTS PAGES
// Custom vector art inspired by Indian cultural motifs
// ═══════════════════════════════════════════════════════════════════

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Paisley/Mango motif - traditional Indian design
export const PaisleyDecor = memo(function PaisleyDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 100 150" fill="none" className={className} style={{ opacity: 0.15 }}>
      <path
        d="M50 10 C20 10 5 40 5 70 C5 110 30 140 50 140 C70 140 95 110 95 70 C95 40 80 10 50 10 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M50 25 C30 25 20 45 20 65 C20 95 35 120 50 120 C65 120 80 95 80 65 C80 45 70 25 50 25 Z"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      <circle cx="50" cy="55" r="8" fill={color} opacity="0.3" />
      <path d="M50 70 Q40 85 50 100 Q60 85 50 70" stroke={color} strokeWidth="1" fill="none" />
      <path d="M35 45 Q50 35 65 45" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
});

// Lotus flower - symbol of purity and celebration
export const LotusDecor = memo(function LotusDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={className} style={{ opacity: 0.12 }}>
      {/* Center petal */}
      <path
        d="M60 10 Q70 30 60 55 Q50 30 60 10"
        stroke={color}
        strokeWidth="1.5"
        fill={`${color}20`}
      />
      {/* Left petals */}
      <path
        d="M40 25 Q55 40 45 60 Q30 40 40 25"
        stroke={color}
        strokeWidth="1.2"
        fill={`${color}15`}
        transform="rotate(-15, 60, 50)"
      />
      <path
        d="M25 40 Q45 50 35 70 Q15 55 25 40"
        stroke={color}
        strokeWidth="1"
        fill={`${color}10`}
        transform="rotate(-25, 60, 50)"
      />
      {/* Right petals */}
      <path
        d="M80 25 Q65 40 75 60 Q90 40 80 25"
        stroke={color}
        strokeWidth="1.2"
        fill={`${color}15`}
        transform="rotate(15, 60, 50)"
      />
      <path
        d="M95 40 Q75 50 85 70 Q105 55 95 40"
        stroke={color}
        strokeWidth="1"
        fill={`${color}10`}
        transform="rotate(25, 60, 50)"
      />
      {/* Base */}
      <ellipse
        cx="60"
        cy="70"
        rx="25"
        ry="8"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      {/* Center dot */}
      <circle cx="60" cy="45" r="4" fill={color} opacity="0.4" />
    </svg>
  );
});

// Mandala corner piece - ornate geometric pattern
export const MandalaCorner = memo(function MandalaCorner({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} style={{ opacity: 0.1 }}>
      {/* Concentric arcs */}
      <path d="M0 200 Q0 0 200 0" stroke={color} strokeWidth="2" fill="none" />
      <path d="M0 160 Q0 40 160 0" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M0 120 Q0 80 120 0" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M0 80 Q0 120 80 0" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Decorative dots along the arc */}
      {[40, 80, 120, 160].map((pos, i) => (
        <circle
          key={i}
          cx={pos * 0.3}
          cy={200 - pos}
          r={3 - i * 0.5}
          fill={color}
          opacity={0.5 - i * 0.1}
        />
      ))}
      {/* Inner ornament */}
      <path d="M20 180 L40 160 L20 140" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
});

// Diya/lamp flame - festive element
export const DiyaDecor = memo(function DiyaDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={className} style={{ opacity: 0.15 }}>
      {/* Flame */}
      <path
        d="M30 5 Q45 25 30 45 Q15 25 30 5"
        stroke={color}
        strokeWidth="1.5"
        fill={`${color}30`}
      />
      <path
        d="M30 15 Q38 28 30 38 Q22 28 30 15"
        stroke={color}
        strokeWidth="1"
        fill={`${color}20`}
      />
      {/* Lamp base */}
      <ellipse
        cx="30"
        cy="55"
        rx="20"
        ry="6"
        stroke={color}
        strokeWidth="1.5"
        fill={`${color}15`}
      />
      <path
        d="M10 55 Q10 75 20 80 L40 80 Q50 75 50 55"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Base stand */}
      <ellipse
        cx="30"
        cy="85"
        rx="15"
        ry="4"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path d="M20 80 L20 85 M40 80 L40 85" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
});

// Rangoli star pattern
export const RangoliStar = memo(function RangoliStar({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} style={{ opacity: 0.12 }}>
      {/* 8-pointed star */}
      <path
        d="M50 5 L55 40 L90 35 L60 50 L90 65 L55 60 L50 95 L45 60 L10 65 L40 50 L10 35 L45 40 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner star */}
      <path
        d="M50 20 L53 45 L75 42 L55 50 L75 58 L53 55 L50 80 L47 55 L25 58 L45 50 L25 42 L47 45 Z"
        stroke={color}
        strokeWidth="1"
        fill={`${color}15`}
        opacity="0.7"
      />
      {/* Center */}
      <circle cx="50" cy="50" r="8" stroke={color} strokeWidth="1" fill={`${color}25`} />
      <circle cx="50" cy="50" r="3" fill={color} opacity="0.5" />
    </svg>
  );
});

// Swirl/wave pattern
export const SwirlDecor = memo(function SwirlDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 150 50" fill="none" className={className} style={{ opacity: 0.1 }}>
      <path
        d="M0 25 Q15 5 30 25 Q45 45 60 25 Q75 5 90 25 Q105 45 120 25 Q135 5 150 25"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0 25 Q15 15 30 25 Q45 35 60 25 Q75 15 90 25 Q105 35 120 25 Q135 15 150 25"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND DECORATIONS
// ═══════════════════════════════════════════════════════════════════

interface BackgroundDecorationsProps {
  color: string;
}

export const BackgroundDecorations = memo(function BackgroundDecorations({
  color,
}: BackgroundDecorationsProps) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Top left corner mandala */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute -top-10 -left-10 h-64 w-64"
      >
        <MandalaCorner color={color} className="h-full w-full" />
      </motion.div>

      {/* Top right corner mandala (mirrored) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute -top-10 -right-10 h-64 w-64"
        style={{ transform: "scaleX(-1)" }}
      >
        <MandalaCorner color={color} className="h-full w-full" />
      </motion.div>

      {/* Floating paisley - left side */}
      <motion.div
        className="absolute top-[30%] left-[5%] h-32 w-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PaisleyDecor color={color} className="h-full w-full" />
      </motion.div>

      {/* Floating paisley - right side (mirrored) */}
      <motion.div
        className="absolute top-[45%] right-[5%] h-28 w-18"
        style={{ transform: "scaleX(-1)" }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <PaisleyDecor color={color} className="h-full w-full" />
      </motion.div>

      {/* Lotus - bottom left */}
      <motion.div
        className="absolute bottom-[15%] left-[8%] h-24 w-28"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <LotusDecor color={color} className="h-full w-full" />
      </motion.div>

      {/* Diya - right side */}
      <motion.div
        className="absolute top-[25%] right-[10%] h-24 w-14"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <DiyaDecor color={color} className="h-full w-full" />
      </motion.div>

      {/* Rangoli star - center bottom */}
      <motion.div
        className="absolute bottom-[20%] left-1/2 h-20 w-20 -translate-x-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <RangoliStar color={color} className="h-full w-full" />
      </motion.div>

      {/* Swirl decoration - top */}
      <motion.div
        className="absolute top-[15%] left-1/2 h-12 w-36 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <SwirlDecor color={color} className="h-full w-full" />
      </motion.div>

      {/* Additional small rangoli stars scattered */}
      {[
        { top: "20%", left: "15%", size: 12, delay: 0 },
        { top: "60%", right: "12%", size: 10, delay: 2 },
        { top: "75%", left: "20%", size: 8, delay: 4 },
        { top: "35%", right: "18%", size: 10, delay: 1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            width: pos.size * 4,
            height: pos.size * 4,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30 + i * 5, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
          }}
        >
          <RangoliStar color={color} className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  );
});
