"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// PARALLAX - Subtle parallax effect on scroll
// ═══════════════════════════════════════════════════════════════════

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = slower, positive = faster
};

export function Parallax({ children, className = "", speed = 0.2 }: ParallaxProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 0 }}
      animate={isInView ? { y: 0 } : { y: 0 }}
      style={{
        willChange: "transform",
      }}
      whileInView={{
        y: [0, speed * -50],
        transition: {
          duration: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
