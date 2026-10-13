"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { FLOATING_STICKERS } from "@/components/pages/home/sections/Footer/common/constants";

export const FloatingStickers = memo(function FloatingStickers() {
  const { shouldAnimate } = useAnimationPolicy();

  // Don't render floating stickers if animations should be reduced
  if (!shouldAnimate) return null;

  const positions = [
    { top: "15%", left: "5%" },
    { top: "25%", right: "8%" },
    { top: "60%", left: "3%" },
    { top: "45%", right: "5%" },
    { top: "75%", left: "8%" },
    { top: "70%", right: "3%" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {FLOATING_STICKERS.map((sticker, i) => (
        <motion.div
          key={sticker.label}
          className="absolute flex flex-col items-center gap-1"
          style={positions[i]}
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <span className="text-3xl">{sticker.emoji}</span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider"
            style={{
              backgroundColor: `${sticker.color}20`,
              color: sticker.color,
              border: `1px solid ${sticker.color}50`,
              textShadow: `0 0 10px ${sticker.color}`,
            }}
          >
            {sticker.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
});
