"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// SCROLL REVEAL - Animate elements when they come into view
// ═══════════════════════════════════════════════════════════════════

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "stagger";
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
};

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
};

export function ScrollReveal({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
