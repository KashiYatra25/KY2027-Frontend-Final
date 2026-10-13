"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { COLORS, SHADOWS } from "@/components/pages/cart/constants/palette";

/**
 * Displayed when the cart has no items - with royal decorative elements
 */
export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto max-w-lg"
    >
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
        style={{
          background: `linear-gradient(135deg, rgba(30, 20, 40, 0.95) 0%, rgba(45, 25, 55, 0.95) 100%)`,
          border: `2px solid ${COLORS.GOLD}25`,
          boxShadow: `0 0 60px rgba(0,0,0,0.5), inset 0 0 100px ${COLORS.GOLD}05`,
        }}
      >
        {/* Corner ornaments */}
        {[0, 90, 180, 270].map((rotate) => (
          <div
            key={rotate}
            className="absolute h-12 w-12 opacity-30"
            style={{
              top: rotate === 0 || rotate === 90 ? 0 : "auto",
              bottom: rotate === 180 || rotate === 270 ? 0 : "auto",
              left: rotate === 0 || rotate === 270 ? 0 : "auto",
              right: rotate === 90 || rotate === 180 ? 0 : "auto",
              transform: `rotate(${rotate}deg)`,
            }}
          >
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M0 0 L20 0 L20 3 L3 3 L3 20 L0 20 Z" fill={COLORS.GOLD} />
              <circle cx="12" cy="12" r="2" fill={COLORS.GOLD} opacity={0.5} />
            </svg>
          </div>
        ))}

        {/* Decorative mandala background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${COLORS.GOLD} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Floating sparkles */}
        <motion.div
          className="absolute top-8 left-12"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4" style={{ color: COLORS.GOLD }} />
        </motion.div>
        <motion.div
          className="absolute top-16 right-10"
          animate={{ y: [0, -8, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="h-3 w-3" style={{ color: COLORS.GOLD }} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-8"
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </motion.div>

        {/* Empty cart illustration */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-8 inline-block"
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 -m-4 rounded-full blur-xl"
            style={{ background: `radial-gradient(circle, ${COLORS.GOLD}20 0%, transparent 70%)` }}
          />

          {/* Icon container */}
          <div
            className="relative flex h-36 w-36 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}05)`,
              border: `3px dashed ${COLORS.GOLD}40`,
              boxShadow: `inset 0 0 30px ${COLORS.GOLD}10`,
            }}
          >
            <ShoppingBag
              className="h-16 w-16"
              style={{ color: COLORS.GOLD, opacity: 0.6 }}
              strokeWidth={1.5}
            />

            {/* Small decorative dots */}
            <div
              className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: COLORS.GOLD, opacity: 0.5 }}
            />
            <div
              className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: COLORS.GOLD, opacity: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Heading */}
        <h2
          className="mb-4 text-2xl font-bold sm:text-3xl"
          style={{
            color: COLORS.GOLD,
            fontFamily: "var(--font-ethereal), serif",
            textShadow: `0 0 30px ${COLORS.GOLD}40`,
          }}
        >
          Your Cart is Empty
        </h2>

        {/* Decorative divider */}
        <div className="mx-auto mb-4 flex w-48 items-center justify-center gap-2">
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40)` }}
          />
          <div
            className="h-1.5 w-1.5 rotate-45"
            style={{ background: COLORS.GOLD, opacity: 0.5 }}
          />
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, ${COLORS.GOLD}40, transparent)` }}
          />
        </div>

        {/* Description */}
        <p className="mb-8 text-gray-400">
          Looks like you haven&apos;t added any passes yet.
          <br />
          <span style={{ color: `${COLORS.GOLD}80` }}>Begin your journey to Kashi Yatra 2027!</span>
        </p>

        {/* CTA button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/passes"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-4 font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
              boxShadow: `0 0 30px ${COLORS.GOLD}40, 0 4px 20px rgba(0,0,0,0.3)`,
            }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                width: "50%",
              }}
            />

            <ShoppingBag className="relative h-5 w-5" />
            <span className="relative">Browse Passes</span>
            <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-40">
          <div className="h-px w-8" style={{ background: COLORS.GOLD }} />
          <div className="h-1 w-1 rotate-45" style={{ background: COLORS.GOLD }} />
          <div className="h-1.5 w-1.5 rotate-45" style={{ background: COLORS.GOLD }} />
          <div className="h-1 w-1 rotate-45" style={{ background: COLORS.GOLD }} />
          <div className="h-px w-8" style={{ background: COLORS.GOLD }} />
        </div>
      </div>
    </motion.div>
  );
}
