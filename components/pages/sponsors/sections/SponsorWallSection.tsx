"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SPONSORS_2027 } from "@/components/pages/sponsors/config/sponsors.config";
import { PALETTE, GRADIENTS } from "@/components/pages/sponsors/constants/palette";
import { Starburst, Spiral } from "./decor";

// ═══════════════════════════════════════════════════════════════════
// SPONSOR WALL - PREVIOUS PARTNERS WITH VECTOR ART
// ═══════════════════════════════════════════════════════════════════

export const SponsorWallSection = memo(function SponsorWallSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allSponsors = SPONSORS_2027;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: PALETTE.DEEP_INK }}
    >
      {/* Vector decorations */}
      <div className="pointer-events-none absolute top-[10%] left-[3%] opacity-10">
        <Starburst size={80} color={PALETTE.FESTIVAL_GOLD} points={8} />
      </div>
      <div className="pointer-events-none absolute top-[15%] right-[5%] opacity-10">
        <Spiral size={70} color={PALETTE.HOT_PINK} />
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-[8%] opacity-10">
        <Spiral size={50} color={PALETTE.NEON_CYAN} />
      </div>
      <div className="pointer-events-none absolute right-[10%] bottom-[10%] opacity-10">
        <Starburst size={60} color={PALETTE.ACID_LIME} points={8} />
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
            Past Partners
          </h2>
          <p className="text-lg" style={{ color: PALETTE.TEXT_SECONDARY }}>
            Brands that made Kashiyatra 2027 unforgettable.
          </p>
        </motion.div>
      </div>

      {/* Marquee container - full width */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: `linear-gradient(90deg, ${PALETTE.DEEP_INK}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: `linear-gradient(270deg, ${PALETTE.DEEP_INK}, transparent)` }}
        />

        {/* Scrolling row 1 */}
        <div className="animate-marquee mb-6 flex">
          <div className="flex shrink-0 gap-6 pr-6">
            {allSponsors.map((sponsor, i) => (
              <div
                key={`row1-${sponsor.name}-${i}`}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border bg-white/5 p-4"
                style={{ borderColor: `${PALETTE.ELECTRIC_VIOLET}20` }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0 gap-6 pr-6">
            {allSponsors.map((sponsor, i) => (
              <div
                key={`row1-dup-${sponsor.name}-${i}`}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border bg-white/5 p-4"
                style={{ borderColor: `${PALETTE.ELECTRIC_VIOLET}20` }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling row 2 - reverse direction */}
        <div className="animate-marquee flex" style={{ animationDirection: "reverse" }}>
          <div className="flex shrink-0 gap-6 pr-6">
            {[...allSponsors].reverse().map((sponsor, i) => (
              <div
                key={`row2-${sponsor.name}-${i}`}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border bg-white/5 p-4"
                style={{ borderColor: `${PALETTE.HOT_PINK}20` }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0 gap-6 pr-6">
            {[...allSponsors].reverse().map((sponsor, i) => (
              <div
                key={`row2-dup-${sponsor.name}-${i}`}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border bg-white/5 p-4"
                style={{ borderColor: `${PALETTE.HOT_PINK}20` }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 2xl:max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg" style={{ color: PALETTE.TEXT_SECONDARY }}>
            Ready to join the lineup?
          </p>
          <a
            href="#collaboration-cta"
            className="inline-block rounded-full px-8 py-4 font-bold tracking-wider uppercase transition-transform hover:scale-105"
            style={{
              background: GRADIENTS.CTA_PRIMARY,
              color: PALETTE.TEXT_PRIMARY,
            }}
          >
            Become a Partner
          </a>
        </motion.div>
      </div>
    </section>
  );
});
