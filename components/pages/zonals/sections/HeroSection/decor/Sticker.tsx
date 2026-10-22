"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { COLORS } from "@/components/pages/zonals/constants/palette";

const stickerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: 0 },
  show: (rotate: number) => ({
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 160, damping: 14, delay: 0.6 },
  }),
};

/** Floating sticker chip. */
export function Sticker({
  label,
  bg,
  fg,
  rotate,
  className,
  float = 0,
}: {
  label: string;
  bg: string;
  fg: string;
  rotate: number;
  className?: string;
  float?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      custom={rotate}
      variants={stickerVariants}
      className={`pointer-events-none absolute select-none ${className ?? ""}`}
    >
      <motion.span
        className="inline-block rounded-full border-2 px-3 py-1.5 text-[10px] font-black tracking-[0.18em] whitespace-nowrap uppercase sm:text-xs"
        style={{
          background: bg,
          color: fg,
          borderColor: COLORS.DEEP_INK,
          boxShadow: `3px 3px 0 ${COLORS.DEEP_INK}`,
        }}
        animate={reduce ? undefined : { y: [0, float, 0] }}
        transition={{
          duration: 4 + Math.abs(float) * 0.05,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
