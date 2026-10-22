"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { PaisleyDecor } from "./PaisleyDecor";
import { LotusDecor } from "./LotusDecor";
import { MandalaCorner } from "./MandalaCorner";
import { DiyaDecor } from "./DiyaDecor";
import { RangoliStar } from "./RangoliStar";
import { SwirlDecor } from "./SwirlDecor";

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
