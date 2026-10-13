"use client";

import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/cart/constants/palette";

interface ItemRemovedToastProps {
  passName?: string;
  onClose?: () => void;
}

/**
 * Success toast shown when an item is removed from cart
 */
export function ItemRemovedToast({ passName, onClose }: ItemRemovedToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="relative overflow-hidden rounded-xl p-4"
      style={{
        background: GRADIENTS.CARD_BG,
        border: `1px solid rgba(212, 168, 83, 0.4)`,
        boxShadow: SHADOWS.TOAST,
        maxWidth: "360px",
      }}
    >
      {/* Gold accent line at top */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: GRADIENTS.GOLD_LINE,
        }}
      />

      {/* Content */}
      <div className="flex gap-3">
        {/* Trash icon */}
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            background: GRADIENTS.GOLD_BUTTON,
            border: `1px solid rgba(212, 168, 83, 0.3)`,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold" style={{ color: COLORS.GOLD }}>
            Removed from Cart
          </h4>
          <p className="text-xs leading-relaxed text-gray-300">
            {passName ? (
              <>
                <span className="font-medium text-white">{passName}</span> has been removed from
                your cart.
              </>
            ) : (
              "Item has been removed from your cart."
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
