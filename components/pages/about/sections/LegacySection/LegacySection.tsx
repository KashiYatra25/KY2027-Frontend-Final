"use client";

import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { useAnimationPolicy } from "@/hooks";
import { StageLightsSVG, TicketSVG, MusicNotesSVG } from "./icons";

// ═══════════════════════════════════════════════════════════════════
// LEGACY SECTION - Bold GenZ Concert Vibes
// ═══════════════════════════════════════════════════════════════════

export const LegacySection = memo(function LegacySection() {
  const { isMobile } = useAnimationPolicy();

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-32">
      {/* Stage lights background */}
      <div className="absolute top-0 left-1/2 w-full max-w-4xl -translate-x-1/2">
        <StageLightsSVG className="h-40 w-full opacity-50" animate={!isMobile} />
      </div>

      {/* Floating music notes - desktop only */}
      <div className="absolute top-1/3 left-10 hidden md:block">
        <MusicNotesSVG className="h-20 w-20 opacity-40" animate={!isMobile} />
      </div>

      {/* Floating music notes - right - desktop only */}
      <div className="absolute top-1/2 right-10 hidden md:block">
        <MusicNotesSVG className="h-16 w-16 opacity-30" animate={!isMobile} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl">
        {/* Section header */}
        {isMobile ? (
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold tracking-[0.3em] text-[#6366f1] uppercase">
              Est. 2010
            </p>
            <h2 className="text-3xl font-black text-white uppercase">The Legacy</h2>
          </div>
        ) : (
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <p className="mb-3 text-sm font-bold tracking-[0.3em] text-[#6366f1] uppercase">
              Est. 2010
            </p>
            <h2 className="text-4xl font-black text-white uppercase sm:text-5xl md:text-6xl">
              The Legacy
            </h2>
          </motion.div>
        )}

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image with ticket overlay */}
          {isMobile ? (
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl border border-[#6366f1]/30">
                <Image
                  src={IMAGES.about.bhuGate}
                  alt="IIT BHU Gate"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(8,8,12,0.9) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-[#6366f1] px-3 py-1.5">
                  <span className="text-xs font-bold text-white">Since 1916</span>
                </div>
              </div>
              {/* Static ticket on mobile */}
              <div className="absolute -right-2 -bottom-4 rotate-[5deg]">
                <TicketSVG className="h-auto w-28 drop-shadow-xl" />
              </div>
            </div>
          ) : (
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
            >
              {/* Glowing border */}
              <div
                className="absolute -inset-2 rounded-xl opacity-50"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #6366f1)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative overflow-hidden rounded-xl border-2 border-[#6366f1]/30">
                <Image
                  src={IMAGES.about.bhuGate}
                  alt="IIT BHU Gate"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                />

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(8,8,12,0.9) 0%, transparent 50%)",
                  }}
                />

                {/* Year badge */}
                <div className="absolute bottom-4 left-4 rounded-full bg-[#6366f1] px-4 py-2">
                  <span className="text-sm font-bold text-white">Since 1916</span>
                </div>
              </div>

              {/* Floating ticket - animated on desktop */}
              <motion.div
                className="absolute -right-6 -bottom-6 sm:-right-8 sm:bottom-4"
                animate={{ rotate: [5, -5, 5], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <TicketSVG className="h-auto w-32 drop-shadow-2xl sm:w-40" />
              </motion.div>
            </motion.div>
          )}

          {/* Content */}
          {isMobile ? (
            <div>
              <div className="space-y-4 text-base leading-relaxed text-white/70">
                <p>
                  <span className="text-xl font-bold text-white">Kashi Yatra</span> isn&apos;t just
                  a fest — it&apos;s a whole vibe. Born in the heart of{" "}
                  <span className="font-semibold text-[#6366f1]">IIT BHU Varanasi</span>, we&apos;ve
                  been dropping beats and breaking records since day one.
                </p>
                <p>
                  From a small campus gathering to{" "}
                  <span className="font-semibold text-[#8b5cf6]">
                    North India&apos;s biggest cultural explosion
                  </span>
                  .
                </p>
              </div>

              {/* Mini stats */}
              <div className="mt-6 flex gap-6 border-t border-white/10 pt-6">
                {[
                  { value: "100+", label: "Colleges" },
                  { value: "3", label: "Days" },
                  { value: "1", label: "Epic Vibe" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-xl font-black text-[#6366f1]">{stat.value}</p>
                    <p className="text-[10px] tracking-wider text-white/40 uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6 text-lg leading-relaxed text-white/70">
                <p>
                  <span className="text-2xl font-bold text-white">Kashi Yatra</span> isn&apos;t just
                  a fest — it&apos;s a whole vibe. Born in the heart of{" "}
                  <span className="font-semibold text-[#6366f1]">IIT BHU Varanasi</span>, we&apos;ve
                  been dropping beats and breaking records since day one.
                </p>
                <p>
                  From a small campus gathering to{" "}
                  <span className="font-semibold text-[#8b5cf6]">
                    North India&apos;s biggest cultural explosion
                  </span>{" "}
                  — that&apos;s the kind of glow-up we&apos;re talking about.
                </p>
                <p className="text-base text-white/50">
                  100+ years of IIT BHU legacy. 15+ years of pure cultural chaos. And we&apos;re
                  just getting started. 🚀
                </p>
              </div>

              {/* Mini stats */}
              <div className="mt-8 flex gap-8 border-t border-white/10 pt-8">
                {[
                  { value: "100+", label: "Colleges" },
                  { value: "3", label: "Days" },
                  { value: "1", label: "Epic Vibe" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-black text-[#6366f1]">{stat.value}</p>
                    <p className="text-xs tracking-wider text-white/40 uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});
