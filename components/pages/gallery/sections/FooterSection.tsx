"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { COLORS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// FOOTER SECTION - "See you there" sign-off
// ═══════════════════════════════════════════════════════════════════

export function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <footer ref={ref} className="gallery-section relative z-10 mt-16 pb-20 text-center sm:mt-24">
      <motion.p
        className="font-serif text-[clamp(28px,5vw,48px)] font-medium italic"
        style={{
          color: COLORS.TEXT,
          fontFamily: "var(--font-cormorant), Georgia, serif",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
      >
        See you there
      </motion.p>
      <motion.p
        className="mt-2 font-mono text-[clamp(13px,2vw,17px)] tracking-[0.24em] uppercase"
        style={{ color: COLORS.MARIGOLD }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Kashiyatra, IIT BHU
      </motion.p>

      {/* Security Badge - Secured by RTS */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <a
          href="https://rudrasec.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          {/* Outer glow effect */}
          <div
            className="absolute -inset-1 rounded-xl opacity-40 blur-lg transition-all duration-500 group-hover:opacity-70 group-hover:blur-xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.MARIGOLD}40, ${COLORS.RANI}40)`,
            }}
          />

          {/* Main badge container */}
          <div
            className="relative flex items-center gap-4 rounded-xl border px-5 py-2.5 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(30,20,10,0.7))`,
              borderColor: `${COLORS.MARIGOLD}30`,
              boxShadow: `0 0 20px ${COLORS.MARIGOLD}10, inset 0 1px 0 ${COLORS.MARIGOLD}15`,
            }}
          >
            {/* Shield icon with glow */}
            <div className="relative">
              <div
                className="absolute inset-0 animate-pulse rounded-full blur-md"
                style={{ background: `${COLORS.MARIGOLD}30` }}
              />
              <svg
                className="relative h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.MARIGOLD}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" stroke={COLORS.RANI} strokeWidth="2" />
              </svg>
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-medium tracking-[0.15em] uppercase"
                  style={{ color: COLORS.TEXT_DIM }}
                >
                  Secured by
                </span>
                <span
                  className="text-base font-black tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.MARIGOLD}, ${COLORS.RANI})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  RTS
                </span>
              </div>
              <span
                className="text-[10px] tracking-wider opacity-50 transition-opacity group-hover:opacity-80"
                style={{ color: COLORS.MARIGOLD }}
              >
                rudrasec.in →
              </span>
            </div>

            {/* RTS Logo */}
            <div className="relative ml-1">
              <div
                className="absolute inset-0 animate-pulse rounded-full blur-sm"
                style={{ background: `${COLORS.RANI}25` }}
              />
              <Image
                src="/security/RTSf_logo.png"
                alt="RTS Security"
                width={32}
                height={32}
                className="relative object-contain"
              />
            </div>
          </div>
        </a>
      </motion.div>
    </footer>
  );
}
