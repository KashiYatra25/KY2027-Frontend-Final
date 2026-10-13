"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PALETTE, GRADIENTS } from "@/components/pages/sponsors/constants/palette";
import { CircleRing, CrossDecor, Diamond } from "./decor/VectorDecorations";

// ═══════════════════════════════════════════════════════════════════
// WHY BRANDS SECTION - VALUE PROPOSITION WITH VECTOR ART
// ═══════════════════════════════════════════════════════════════════

const valueProps = [
  {
    title: "Gen-Z Audience",
    description:
      "Direct access to 15,000+ college students — India&apos;s future decision-makers and trendsetters.",
    color: PALETTE.ACID_LIME,
  },
  {
    title: "Massive Reach",
    description:
      "2M+ social media impressions. Your brand everywhere — stages, merch, feeds, stories.",
    color: PALETTE.HOT_PINK,
  },
  {
    title: "Premium Exposure",
    description:
      "IIT BHU&apos;s flagship event. Association with excellence, innovation, and cultural prestige.",
    color: PALETTE.NEON_CYAN,
  },
  {
    title: "Live Experiences",
    description:
      "Create memorable brand moments. Pop-ups, activations, and experiences that resonate.",
    color: PALETTE.FESTIVAL_GOLD,
  },
  {
    title: "Content Gold",
    description: "Professional media coverage. Photo, video, and social content delivered to you.",
    color: PALETTE.ELECTRIC_VIOLET,
  },
  {
    title: "4-Day Impact",
    description: "Non-stop engagement across music, dance, drama, art, and literary events.",
    color: PALETTE.SIGNAL_ORANGE,
  },
];

export const WhyBrandsSection = memo(function WhyBrandsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: PALETTE.DEEP_INK }}
    >
      {/* Vector decorations */}
      <div className="pointer-events-none absolute top-[15%] left-[3%] opacity-10">
        <CircleRing size={120} color={PALETTE.ACID_LIME} />
      </div>
      <div className="pointer-events-none absolute top-[10%] right-[5%] opacity-15">
        <CrossDecor size={40} color={PALETTE.HOT_PINK} />
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-[8%] opacity-10">
        <Diamond size={30} color={PALETTE.NEON_CYAN} />
      </div>
      <div className="pointer-events-none absolute right-[10%] bottom-[10%] opacity-10">
        <CircleRing size={80} color={PALETTE.ELECTRIC_VIOLET} strokeWidth={1} />
      </div>
      <div className="pointer-events-none absolute top-[40%] right-[20%] opacity-10">
        <CrossDecor size={24} color={PALETTE.FESTIVAL_GOLD} />
      </div>

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
            style={{
              background: GRADIENTS.TITLE,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why Partner With Us
          </h2>
          <p className="text-lg" style={{ color: PALETTE.TEXT_SECONDARY }}>
            More than sponsorship — it&apos;s a cultural partnership.
          </p>
        </motion.div>

        {/* Value props grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${prop.color}08 0%, transparent 100%)`,
                borderColor: `${prop.color}20`,
              }}
            >
              {/* Accent line */}
              <div className="mb-4 h-1 w-12 rounded-full" style={{ background: prop.color }} />

              {/* Title */}
              <h3 className="mb-2 text-xl font-bold" style={{ color: prop.color }}>
                {prop.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: PALETTE.TEXT_SECONDARY }}>
                {prop.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 30px ${prop.color}15`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
