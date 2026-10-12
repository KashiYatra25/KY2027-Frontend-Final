"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  GlitchText,
  NeonText,
  InteractiveSpeaker,
  WaveformVisualizer,
} from "@/components/pages/about/sections/decor";
import { useAnimationPolicy } from "@/hooks";
import { MicrophoneIcon, TicketIcon, SparkleIcon } from "./icons";
import { StaticWaveform } from "./StaticWaveform";

// ═══════════════════════════════════════════════════════════════════
// CTA SECTION - Concert themed
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
};

export const CTASection = memo(function CTASection() {
  const { isMobile } = useAnimationPolicy();

  return (
    <section className="relative overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-32">
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 sm:h-[600px] sm:w-[600px]"
        style={{
          background: `radial-gradient(circle, ${NEON.MAGENTA}40 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Speakers - Desktop only */}
      {!isMobile && (
        <>
          <div className="absolute -bottom-1 left-12 hidden opacity-50 lg:block">
            <InteractiveSpeaker size={250} side="left" />
          </div>
          <div className="absolute right-12 -bottom-1 hidden opacity-50 lg:block">
            <InteractiveSpeaker size={250} side="right" />
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl 2xl:max-w-5xl">
        {/* Main CTA content */}
        {isMobile ? (
          <h2
            className="mb-4 text-3xl font-black tracking-wider uppercase"
            style={{
              background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA}, ${NEON.LIME})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            JOIN THE WAVE
          </h2>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <GlitchText
              text="JOIN THE WAVE"
              className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            />
          </motion.div>
        )}

        {isMobile ? (
          <p className="mx-auto mb-6 max-w-sm text-base text-white/70">
            Experience <NeonText color="cyan">music</NeonText>,{" "}
            <NeonText color="magenta">art</NeonText>, and <NeonText color="lime">culture</NeonText>{" "}
            like never before.
          </p>
        ) : (
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-white/70 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            Experience <NeonText color="cyan">music</NeonText>,{" "}
            <NeonText color="magenta">art</NeonText>, and <NeonText color="lime">culture</NeonText>{" "}
            like never before.
            <br />
            <span className="text-white/50">This is your moment.</span>
          </motion.p>
        )}

        {/* Waveform - static on mobile, animated on desktop */}
        {isMobile ? (
          <div className="mb-8 flex justify-center">
            <StaticWaveform width={200} height={40} />
          </div>
        ) : (
          <motion.div
            className="mb-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
          >
            <WaveformVisualizer bars={32} width={280} height={50} color="gradient" />
          </motion.div>
        )}

        {/* CTA Buttons */}
        {isMobile ? (
          <div className="flex flex-col items-center gap-3">
            {/* Primary Button */}
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-bold tracking-wider uppercase"
              style={{
                background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA})`,
                color: "#0a0014",
              }}
            >
              <MicrophoneIcon className="h-4 w-4" />
              <span>Explore Events</span>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/passes"
              className="flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-bold tracking-wider uppercase"
              style={{
                background: "transparent",
                border: `2px solid ${NEON.LIME}`,
                color: NEON.LIME,
              }}
            >
              <TicketIcon className="h-4 w-4" />
              <span>Get Passes</span>
            </Link>
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.7 }}
          >
            {/* Primary Button */}
            <Link href="/events" className="group relative">
              <div
                className="absolute -inset-1 rounded-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA})`,
                  filter: "blur(8px)",
                }}
              />
              <div
                className="relative flex items-center gap-3 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase sm:px-12 sm:text-base"
                style={{
                  background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA})`,
                  color: "#0a0014",
                }}
              >
                <MicrophoneIcon />
                <span>Explore Events</span>
                <MicrophoneIcon />
              </div>
            </Link>

            {/* Secondary Button */}
            <Link href="/passes" className="group relative">
              <div
                className="absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background: NEON.LIME,
                  filter: "blur(8px)",
                }}
              />
              <div
                className="relative flex items-center gap-3 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors duration-300 sm:px-12 sm:text-base"
                style={{
                  background: "transparent",
                  border: `2px solid ${NEON.LIME}`,
                  color: NEON.LIME,
                }}
              >
                <TicketIcon />
                <span>Get Passes</span>
                <TicketIcon />
              </div>
            </Link>
          </motion.div>
        )}

        {/* Bottom tagline */}
        {isMobile ? (
          <p
            className="mt-8 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase"
            style={{ color: `${NEON.CYAN}60` }}
          >
            <SparkleIcon className="h-3 w-3" />
            See you on the other side
            <SparkleIcon className="h-3 w-3" />
          </p>
        ) : (
          <motion.p
            className="mt-12 flex items-center justify-center gap-2 text-sm tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.9 }}
            style={{ color: `${NEON.CYAN}60` }}
          >
            <SparkleIcon />
            See you on the other side
            <SparkleIcon />
          </motion.p>
        )}
      </div>

      {/* Bottom neon border */}
      <div
        className="absolute right-0 bottom-0 left-0 h-[2px] sm:h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.CYAN}, ${NEON.MAGENTA}, ${NEON.LIME}, transparent)`,
          boxShadow: `0 0 20px ${NEON.MAGENTA}`,
        }}
      />
    </section>
  );
});
