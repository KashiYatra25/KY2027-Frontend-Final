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
        className="mt-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <a
          href="https://rudrasec.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-row items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/security/RTSf_logo.png"
            alt="RTS Security"
            width={32}
            height={32}
            className="object-contain"
          />
          <span
            className="flex items-center gap-2 text-xs tracking-wider"
            style={{ color: COLORS.TEXT_DIM }}
          >
            <svg
              className="h-3.5 w-3.5 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secured by <span className="font-bold">RTS</span>
          </span>
        </a>
        <a
          href="https://rudrasec.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-wider underline underline-offset-2 transition-opacity hover:opacity-80"
          style={{ color: COLORS.TEXT_DIM }}
        >
          rudrasec.in
        </a>
      </motion.div>
    </footer>
  );
}
