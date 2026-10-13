"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { COLORS } from "@/components/pages/passes/constants/palette";

interface FloatingCartBarProps {
  itemCount: number;
  show: boolean;
}

/**
 * Floating cart bar shown at bottom of passes page when cart has items
 */
export function FloatingCartBar({ itemCount, show }: FloatingCartBarProps) {
  return (
    <AnimatePresence>
      {show && itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 left-0 z-[100] px-4 pb-4 sm:pb-6"
        >
          <div className="mx-auto max-w-md">
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
                  boxShadow: `0 0 40px ${COLORS.GOLD}40, 0 10px 30px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Left side - cart info */}
                <div className="flex items-center gap-3">
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <ShoppingCart className="h-5 w-5 text-white" />
                    {/* Item count badge */}
                    <span
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: COLORS.MAROON,
                        color: "white",
                      }}
                    >
                      {itemCount}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {itemCount} {itemCount === 1 ? "item" : "items"} in cart
                    </p>
                    <p className="text-xs text-white/70">Tap to view your cart</p>
                  </div>
                </div>

                {/* Right side - arrow */}
                <div className="flex items-center gap-2 font-semibold text-white">
                  <span className="hidden sm:inline">Go to Cart</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
