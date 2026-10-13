"use client";

import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/cart/constants/palette";

interface ItemAddedToastProps {
  passName?: string;
  onClose?: () => void;
}

/**
 * Success toast shown when an item is added to cart
 */
export function ItemAddedToast({ passName, onClose }: ItemAddedToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="relative overflow-hidden rounded-xl p-4"
      style={{
        background: GRADIENTS.CARD_BG,
        border: `1px solid rgba(16, 185, 129, 0.4)`,
        boxShadow: SHADOWS.TOAST,
        maxWidth: "360px",
      }}
    >
      {/* Success accent line at top */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.SUCCESS}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="flex gap-3">
        {/* Animated checkmark icon */}
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            background: GRADIENTS.SUCCESS,
            border: `1px solid rgba(16, 185, 129, 0.3)`,
          }}
        >
          <motion.svg
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.SUCCESS}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold" style={{ color: COLORS.SUCCESS }}>
            Added to Cart
          </h4>
          <p className="text-xs leading-relaxed text-gray-300">
            {passName ? (
              <>
                <span className="font-medium text-white">{passName}</span> has been added to your
                cart.
              </>
            ) : (
              "Item has been added to your cart."
            )}
          </p>
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
