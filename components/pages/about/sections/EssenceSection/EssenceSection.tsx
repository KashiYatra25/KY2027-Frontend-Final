"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { slider1Images, slider2Images } from "./data";
import { CSSMarquee } from "./CSSMarquee";
import { MotionMarquee } from "./MotionMarquee";

// ═══════════════════════════════════════════════════════════════════
// ESSENCE SECTION - Infinite Marquee Sliders
// ═══════════════════════════════════════════════════════════════════

export const EssenceSection = memo(function EssenceSection() {
  const { isMobile } = useAnimationPolicy();

  return (
    <section className="relative overflow-hidden py-12 sm:py-24">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, #6366f120 0%, transparent 70%)",
        }}
      />

      {/* Section header - static on mobile */}
      {isMobile ? (
        <div className="mb-8 px-4 text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.3em] text-[#6366f1] uppercase">
            The Experience
          </p>
          <h2 className="text-3xl font-black text-white uppercase">
            Feel The <span className="text-[#6366f1]">Energy</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-sm text-white/50">
            Three days of non-stop music, dance, art, and unforgettable moments
          </p>
        </div>
      ) : (
        <motion.div
          className="mb-12 px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-[#6366f1] uppercase">
            The Experience
          </p>
          <h2 className="text-4xl font-black text-white uppercase sm:text-5xl md:text-6xl">
            Feel The <span className="text-[#6366f1]">Energy</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Three days of non-stop music, dance, art, and unforgettable moments
          </p>
        </motion.div>
      )}

      {/* Sliders - CSS on mobile, Framer Motion on desktop */}
      {isMobile ? (
        <>
          <CSSMarquee images={slider1Images} direction="left" />
          <CSSMarquee images={slider2Images} direction="right" />
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <MotionMarquee images={slider1Images} direction="left" speed={35} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            <MotionMarquee images={slider2Images} direction="right" speed={40} />
          </motion.div>
        </>
      )}
    </section>
  );
});
