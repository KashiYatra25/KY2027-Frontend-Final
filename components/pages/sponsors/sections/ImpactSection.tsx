"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PALETTE, GRADIENTS } from "@/components/pages/sponsors/constants/palette";
import { Starburst, WavyLine } from "./decor/VectorDecorations";

// ═══════════════════════════════════════════════════════════════════
// IMPACT SECTION - BOLD STATISTICS WITH VECTOR ART
// ═══════════════════════════════════════════════════════════════════

const stats = [
  { value: "90K+", label: "Footfall", color: PALETTE.ACID_LIME },
  { value: "200+", label: "Colleges", color: PALETTE.HOT_PINK },
  { value: "80+", label: "Events", color: PALETTE.NEON_CYAN },
  { value: "4", label: "Days", color: PALETTE.FESTIVAL_GOLD },
];

export const ImpactSection = memo(function ImpactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: PALETTE.MIDNIGHT }}
    >
      {/* Vector decorations */}
      <div className="pointer-events-none absolute top-[10%] left-[5%] opacity-15">
        <Starburst size={100} color={PALETTE.HOT_PINK} duration={25} />
      </div>
      <div className="pointer-events-none absolute top-[20%] right-[8%] opacity-10">
        <Starburst size={60} color={PALETTE.NEON_CYAN} duration={18} />
      </div>
      <div className="pointer-events-none absolute bottom-[15%] left-[12%] opacity-10">
        <Starburst size={80} color={PALETTE.ACID_LIME} duration={22} />
      </div>
      <div className="pointer-events-none absolute right-[5%] bottom-[20%] opacity-15">
        <Starburst size={50} color={PALETTE.FESTIVAL_GOLD} duration={15} />
      </div>

      {/* Subtle top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: `linear-gradient(180deg, ${PALETTE.DEEP_INK}, transparent)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 2xl:max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="mb-4 text-3xl font-black tracking-tight uppercase sm:text-4xl md:text-5xl"
            style={{ color: PALETTE.TEXT_PRIMARY }}
          >
            Not Just a Fest.
          </h2>
          <p
            className="text-xl font-bold tracking-wider uppercase"
            style={{
              background: GRADIENTS.TITLE,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            A Cultural Movement.
          </p>

          {/* Wavy line under title */}
          <div className="mt-6 flex justify-center">
            <WavyLine color={PALETTE.ELECTRIC_VIOLET} width={150} />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="mb-2 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl"
                style={{
                  color: stat.color,
                  textShadow: `0 0 40px ${stat.color}40`,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: PALETTE.TEXT_MUTED }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center text-lg"
          style={{ color: PALETTE.TEXT_SECONDARY }}
        >
          North India&apos;s largest cultural festival — and your brand could be center stage.
        </motion.p>
      </div>
    </section>
  );
});
