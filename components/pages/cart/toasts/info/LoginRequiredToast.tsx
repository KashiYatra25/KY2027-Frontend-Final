"use client";

import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/cart/constants/palette";

interface LoginRequiredToastProps {
  message?: string;
  onClose?: () => void;
}

/**
 * Info toast shown when user needs to login
 * Displayed briefly before redirecting to login page
 */
export function LoginRequiredToast({ message, onClose }: LoginRequiredToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="relative overflow-hidden rounded-xl p-4"
      style={{
        background: GRADIENTS.CARD_BG,
        border: `1px solid rgba(59, 130, 246, 0.4)`,
        boxShadow: SHADOWS.TOAST,
        maxWidth: "360px",
      }}
    >
      {/* Info accent line at top */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.INFO}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="flex gap-3">
        {/* Info icon */}
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            background: GRADIENTS.INFO,
            border: `1px solid rgba(59, 130, 246, 0.3)`,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.INFO}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold" style={{ color: COLORS.INFO }}>
            Login Required
          </h4>
          <p className="text-xs leading-relaxed text-gray-300">
            {message || "Please sign in to access your cart. Redirecting to login..."}
          </p>

          {/* Loading indicator */}
          <div className="mt-2 flex items-center gap-2">
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: COLORS.INFO }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: COLORS.INFO }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: COLORS.INFO }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}
