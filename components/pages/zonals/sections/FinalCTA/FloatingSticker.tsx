"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/zonals/constants/palette";

// ── Floating sticker chip (gentle idle bob) ───────────────────────────
interface FloatingStickerProps {
  children: React.ReactNode;
  className?: string;
  rotate: number;
  bg: string;
  color: string;
  delay: number;
  disabled: boolean;
}

export function FloatingSticker({
  children,
  className = "",
  rotate,
  bg,
  color,
  delay,
  disabled,
}: FloatingStickerProps) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute hidden rounded-full px-4 py-2 text-xs font-black tracking-widest uppercase sm:inline-block ${className}`}
      style={{
        background: bg,
        color,
        rotate: `${rotate}deg`,
        border: `2px solid ${COLORS.DEEP_INK}`,
        boxShadow: "0 4px 0 rgba(0,0,0,0.35)",
      }}
      animate={disabled ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}
