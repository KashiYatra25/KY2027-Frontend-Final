"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PALETTE } from "@/components/pages/sponsors/constants/palette";
import { ZigzagLine, DotGrid, ArrowDecor } from "./decor";

// ═══════════════════════════════════════════════════════════════════
// ACTIVATIONS SECTION - BRAND OPPORTUNITIES WITH VECTOR ART
// ═══════════════════════════════════════════════════════════════════

const activations = [
  {
    icon: "🎪",
    title: "Brand Zones",
    description: "Set up immersive brand experiences — photo booths, games, product demos.",
    color: PALETTE.HOT_PINK,
  },
  {
    icon: "🎤",
    title: "Stage Branding",
    description: "Your brand name on stage backdrops, LED displays, and announcements.",
    color: PALETTE.NEON_CYAN,
  },
  {
    icon: "👕",
    title: "Merchandise",
    description: "Logo on official fest merch — t-shirts, caps, wristbands, and more.",
    color: PALETTE.ACID_LIME,
  },
  {
    icon: "📱",
    title: "Digital Presence",
    description: "Social media takeovers, hashtag campaigns, and influencer collaborations.",
    color: PALETTE.ELECTRIC_VIOLET,
  },
  {
    icon: "🎮",
    title: "Engagement Activities",
    description: "Contests, challenges, and interactive games to engage attendees.",
    color: PALETTE.FESTIVAL_GOLD,
  },
  {
    icon: "🎬",
    title: "Content Creation",
    description: "Professional photo and video coverage delivered to your brand.",
    color: PALETTE.SIGNAL_ORANGE,
  },
];

export const ActivationsSection = memo(function ActivationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: PALETTE.MIDNIGHT }}
    >
      {/* Vector decorations */}
      <div className="pointer-events-none absolute top-[15%] left-[5%] opacity-20">
        <DotGrid color={PALETTE.HOT_PINK} rows={4} cols={6} />
      </div>
      <div className="pointer-events-none absolute top-[20%] right-[8%] opacity-15">
        <ZigzagLine color={PALETTE.ACID_LIME} width={80} />
      </div>
      <div className="pointer-events-none absolute bottom-[25%] left-[10%] opacity-15">
        <ArrowDecor color={PALETTE.NEON_CYAN} size={50} />
      </div>
      <div className="pointer-events-none absolute right-[5%] bottom-[15%] opacity-20">
        <DotGrid color={PALETTE.ELECTRIC_VIOLET} rows={3} cols={4} />
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
            style={{ color: PALETTE.TEXT_PRIMARY }}
          >
            Brand Activations
          </h2>
          <p className="text-lg" style={{ color: PALETTE.TEXT_SECONDARY }}>
            Multiple touchpoints to connect with your audience.
          </p>

          {/* Zigzag under title */}
          <div className="mt-6 flex justify-center">
            <ZigzagLine color={PALETTE.HOT_PINK} width={120} />
          </div>
        </motion.div>

        {/* Activations grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${item.color}08 0%, transparent 100%)`,
                borderColor: `${item.color}20`,
              }}
            >
              {/* Icon */}
              <div className="mb-4 text-4xl">{item.icon}</div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold" style={{ color: item.color }}>
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: PALETTE.TEXT_SECONDARY }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
