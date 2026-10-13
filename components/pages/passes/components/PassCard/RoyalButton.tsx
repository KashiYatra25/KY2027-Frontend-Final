"use client";

import { motion } from "framer-motion";
import {
  COLORS,
  SHADOWS,
  GRADIENT_BUTTON_ROYAL,
} from "@/components/pages/passes/constants/palette";

// ============================================
// RoyalButton Component
// ============================================
export function RoyalButton({
  children,
  onClick,
  icon,
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <motion.button
      whileHover={disabled || loading ? {} : { scale: 1.03 }}
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`relative w-full overflow-hidden rounded-lg px-4 py-3 text-sm font-bold tracking-wider uppercase ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      style={{
        background: disabled ? "rgba(100, 100, 100, 0.3)" : GRADIENT_BUTTON_ROYAL,
        border: `2px solid ${disabled ? "rgba(150, 150, 150, 0.5)" : COLORS.BRIGHT_GOLD}`,
        color: disabled ? "rgba(180, 180, 180, 0.8)" : COLORS.CARD_DARK_PURPLE,
        boxShadow: disabled ? "none" : SHADOWS.BUTTON_GOLD,
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeOpacity="0.3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          icon
        )}
        {loading ? "Loading..." : children}
      </span>
    </motion.button>
  );
}
