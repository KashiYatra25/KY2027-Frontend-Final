"use client";

import { useRef } from "react";
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
    </footer>
  );
}
