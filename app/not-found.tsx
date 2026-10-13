"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";

/**
 * Custom 404 Page - "Lost in Kashi"
 *
 * Themed to match the spiritual Varanasi aesthetic of Kashiyatra.
 * Shows floating diyas and a poetic "lost pilgrim" message.
 */
export default function NotFound() {
  const { shouldAnimate } = useAnimationPolicy();

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: `linear-gradient(180deg, 
          #0c0810 0%, 
          #150a14 30%,
          #1f0c18 60%,
          #150a14 80%,
          #0c0810 100%
        )`,
      }}
    >
      {/* Floating Diyas - decorative background */}
      {shouldAnimate && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-3 w-3 rounded-full"
              style={{
                background: "radial-gradient(circle, #FFD700 0%, #FF6B00 60%, transparent 100%)",
                boxShadow: "0 0 20px 8px rgba(255, 215, 0, 0.3)",
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* 404 Number */}
        <motion.h1
          className="text-[100px] leading-none font-black tracking-wide sm:text-[140px] md:text-[180px]"
          style={{
            fontFamily: "var(--font-cinzel-decorative), serif",
            background:
              "linear-gradient(180deg, #FFFAF0 0%, #FFD700 20%, #DAA520 45%, #B8860B 70%, #996515 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 40px rgba(255,215,0,0.5))",
          }}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          404
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3"
          initial={shouldAnimate ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-500/80 to-amber-400 sm:w-16 md:w-24" />
          <span
            className="text-base text-amber-400 sm:text-lg"
            style={{ textShadow: "0 0 15px rgba(255,215,0,0.9), 0 0 30px rgba(255,165,0,0.5)" }}
          >
            ✦ 🪷 ✦
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-500/80 to-amber-400 sm:w-16 md:w-24" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-lg font-semibold tracking-[0.3em] uppercase sm:text-xl sm:tracking-[0.4em]"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            background: "linear-gradient(180deg, #FFE4B5 0%, #FFD700 50%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,165,0,0.4))",
          }}
          initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Lost in the Ghats
        </motion.p>

        {/* Description */}
        <motion.p
          className="mx-auto mt-6 max-w-md text-base leading-relaxed tracking-wide sm:text-lg"
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            color: "rgba(253, 246, 227, 0.75)",
          }}
          initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The path you seek does not exist in this realm.
          <br />
          Let us guide you back to the festival.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-8"
          initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-500/40 px-8 py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-amber-400/70 hover:shadow-[0_0_30px_rgba(255,215,0,0.25)]"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(218,165,32,0.12) 100%)",
              color: "#FFD700",
            }}
          >
            <span className="relative z-10">Return Home</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            {/* Hover glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-500/15 to-amber-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Ganga wave hint */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 opacity-15"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #1A5F7A 70%, #0f3d52 100%)",
        }}
      />
    </main>
  );
}
