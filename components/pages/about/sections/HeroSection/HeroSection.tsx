"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { useAnimationPolicy } from "@/hooks";
import {
  StaticMusicNote,
  FloatingNotes,
  StaticEqualizer,
  EqualizerBars,
  SoundWaves,
  HeadphonesIcon,
  GlowingOrb,
} from "@/components/pages/about/sections/HeroSection/decor";

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION - Bold GenZ Concert Vibes
// Mobile: Static, Desktop: Animated SVGs
// ═══════════════════════════════════════════════════════════════════

export const HeroSection = memo(function HeroSection() {
  const { isMobile } = useAnimationPolicy();

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-4 sm:min-h-screen sm:px-6">
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full opacity-20 sm:h-[500px] sm:w-[500px]"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-[250px] w-[250px] rounded-full opacity-15 sm:h-[400px] sm:w-[400px]"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* LEFT SIDE - Vector Person Image (Desktop only) */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-0 left-0 z-20 hidden h-[500px] w-[350px] lg:block xl:h-[650px] xl:w-[450px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div
            className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, #6366f150 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <Image
            src={IMAGES.about.heroLeftAbout}
            alt="Festival performer"
            fill
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      )}

      {/* LEFT SIDE DECORATIONS - Desktop only with animations */}
      {!isMobile && (
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-1/4 lg:block">
          <motion.div
            className="absolute top-[15%] left-[8%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <SoundWaves className="h-20 w-20 opacity-50 xl:h-24 xl:w-24" />
          </motion.div>
          <motion.div
            className="absolute top-[35%] left-[20%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <FloatingNotes className="h-24 w-24 opacity-60 xl:h-28 xl:w-28" />
          </motion.div>
          <GlowingOrb color="#6366f1" className="absolute top-[25%] left-[30%] h-12 w-12" />
          <GlowingOrb color="#8b5cf6" className="absolute top-[50%] left-[5%] h-10 w-10" />
        </div>
      )}

      {/* RIGHT SIDE - Dancer Girl Image (Desktop only) */}
      {!isMobile && (
        <motion.div
          className="absolute right-0 bottom-0 z-20 hidden h-[500px] w-[350px] lg:block xl:h-[650px] xl:w-[450px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div
            className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, #8b5cf650 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <Image
            src={IMAGES.about.dancerGirlHeroAbout}
            alt="Festival dancer"
            fill
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      )}

      {/* RIGHT SIDE DECORATIONS - Desktop only */}
      {!isMobile && (
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/4 lg:block">
          <motion.div
            className="absolute top-[15%] right-[8%]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <HeadphonesIcon className="h-16 w-20 opacity-50 xl:h-20 xl:w-24" />
          </motion.div>
          <motion.div
            className="absolute top-[30%] right-[20%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <EqualizerBars className="h-16 w-24 opacity-60 xl:h-20 xl:w-28" />
          </motion.div>
          <GlowingOrb color="#8b5cf6" className="absolute top-[22%] right-[30%] h-12 w-12" />
          <GlowingOrb color="#a855f7" className="absolute top-[45%] right-[5%] h-10 w-10" />
        </div>
      )}

      {/* MOBILE DECORATIONS - Static, minimal */}
      {isMobile && (
        <div className="absolute top-16 right-0 left-0 flex justify-between px-4 opacity-30 lg:hidden">
          <StaticMusicNote className="h-12 w-12" />
          <StaticEqualizer className="h-10 w-16" />
        </div>
      )}

      {/* Center Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl py-8 text-center sm:py-20 2xl:max-w-5xl">
        {/* Eyebrow badge */}
        {isMobile ? (
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
            }}
          >
            <span className="h-2 w-2 rounded-full bg-[#6366f1]" />
            <span className="text-xs font-bold tracking-wider text-white uppercase">
              IIT BHU Varanasi
            </span>
          </div>
        ) : (
          <motion.div
            className="relative mb-8 inline-flex items-center gap-3 overflow-hidden rounded-full px-5 py-2.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#6366f1]" />
            <span className="text-sm font-bold tracking-wider text-white uppercase">
              IIT BHU Varanasi
            </span>
            <span className="text-xs font-medium text-[#8b5cf6]">EST. 2010</span>
          </motion.div>
        )}

        {/* Main Title */}
        {isMobile ? (
          <div className="mb-4">
            <h1 className="text-6xl leading-none font-black tracking-tighter whitespace-nowrap uppercase">
              <span className="text-white">KASHI</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                YATRA
              </span>
            </h1>
          </div>
        ) : (
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1
              className="absolute inset-0 text-7xl leading-none font-black tracking-tighter text-[#6366f1]/10 uppercase blur-sm sm:text-8xl md:text-9xl"
              aria-hidden="true"
            >
              <span className="whitespace-nowrap">KASHI YATRA</span>
            </h1>
            <h1 className="relative text-7xl leading-none font-black tracking-tighter whitespace-nowrap uppercase sm:text-8xl md:text-9xl">
              <span className="text-white drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">KASHI</span>{" "}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))",
                }}
              >
                YATRA
              </span>
            </h1>
          </motion.div>
        )}

        {/* Tagline */}
        {isMobile ? (
          <p className="mb-4 text-lg font-light text-white/70">
            Where Culture <span className="font-semibold text-[#6366f1]">Drops</span> the Beat
          </p>
        ) : (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl font-light text-white/70 sm:text-2xl md:text-3xl">
              Where Culture{" "}
              <span className="relative font-semibold text-[#6366f1]">
                Drops
                <motion.span
                  className="absolute right-0 -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </span>{" "}
              the Beat
            </p>
          </motion.div>
        )}

        {/* Description - shorter on mobile */}
        <p className="mx-auto mb-6 max-w-xs text-xs leading-relaxed text-white/50 sm:mb-10 sm:max-w-xl sm:text-base">
          {isMobile
            ? "North India's largest cultural festival. Three days of music, art, and magic."
            : "North India's largest cultural festival blending ancient traditions with electric performances. Three days of music, art, and unforgettable moments."}
        </p>

        {/* Stats row */}
        {isMobile ? (
          <div className="mb-6 flex justify-center gap-4">
            {[
              { value: "15+", label: "YEARS" },
              { value: "90K+", label: "FOOTFALL" },
              { value: "80+", label: "EVENTS" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3"
                style={{
                  background: i === 1 ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border:
                    i === 1
                      ? "1px solid rgba(99, 102, 241, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <p
                  className="text-2xl font-black"
                  style={{ color: i === 1 ? "#ffffff" : "#6366f1" }}
                >
                  {stat.value}
                </p>
                <p className="text-[9px] tracking-wider text-white/40 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: "15+", label: "YEARS OF LEGACY", icon: "🎭" },
              { value: "90K+", label: "FOOTFALL", icon: "🔥" },
              { value: "80+", label: "EPIC EVENTS", icon: "🎪" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="group relative"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl px-6 py-4 sm:px-8"
                  style={{
                    background:
                      i === 1
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)"
                        : "rgba(255, 255, 255, 0.03)",
                    border:
                      i === 1
                        ? "1px solid rgba(99, 102, 241, 0.4)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <span className="mb-1 block text-lg">{stat.icon}</span>
                    <p
                      className="text-3xl font-black sm:text-4xl"
                      style={{ color: i === 1 ? "#ffffff" : "#6366f1" }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom tagline */}
        <p className="mt-6 text-[10px] tracking-widest text-white/30 uppercase sm:mt-10 sm:text-sm">
          January 2027 • Varanasi
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 sm:h-40"
        style={{
          background: "linear-gradient(to top, #08080c, transparent)",
        }}
      />
    </section>
  );
});
