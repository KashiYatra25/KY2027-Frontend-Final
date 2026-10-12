"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAnimationPolicy } from "@/hooks";
import { stats, stamps } from "./data";

// ═══════════════════════════════════════════════════════════════════
// STATS SECTION - Bold GenZ Concert Vibes with Custom SVG Icons
// ═══════════════════════════════════════════════════════════════════

export const StatsSection = memo(function StatsSection() {
  const { isMobile } = useAnimationPolicy();

  return (
    <section className="relative overflow-visible px-4 py-16 sm:px-6 sm:py-28">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, #6366f120 0%, transparent 70%)",
        }}
      />

      {/* Floating Stamps - Desktop only with animations */}
      {!isMobile &&
        stamps.map((stamp, i) => (
          <motion.div
            key={i}
            className={`absolute hidden lg:block ${stamp.position} ${stamp.size} pointer-events-none z-[100] h-auto`}
            initial={{ opacity: 0, y: 30, rotate: stamp.rotate - 10 }}
            whileInView={{ opacity: 1, y: 0, rotate: stamp.rotate }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: stamp.floatDelay,
              }}
            >
              <Image
                src={stamp.src}
                alt={stamp.alt}
                width={stamp.imgSize}
                height={Math.round(stamp.imgSize * 1.25)}
                className="drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.4))",
                }}
              />
            </motion.div>
          </motion.div>
        ))}

      <div className="relative z-10 mx-auto max-w-5xl 2xl:max-w-6xl">
        {/* Section title - static on mobile */}
        {isMobile ? (
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold tracking-[0.3em] text-[#6366f1] uppercase">
              By The Numbers
            </p>
            <h2 className="text-3xl font-black text-white uppercase">The Stats Don&apos;t Lie</h2>
          </div>
        ) : (
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <p className="mb-3 text-sm font-bold tracking-[0.3em] text-[#6366f1] uppercase">
              By The Numbers
            </p>
            <h2 className="text-4xl font-black text-white uppercase sm:text-5xl">
              The Stats Don&apos;t Lie
            </h2>
          </motion.div>
        )}

        {/* Stats grid - static on mobile */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) =>
            isMobile ? (
              <div
                key={i}
                className="relative rounded-xl p-5 text-center"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
                  border: `1px solid ${stat.color}30`,
                }}
              >
                <div className="mb-3 flex justify-center">
                  <stat.Icon />
                </div>
                <p className="mb-1 text-3xl font-black" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-wider text-white/50 uppercase">{stat.label}</p>
              </div>
            ) : (
              <motion.div
                key={i}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl p-6 text-center sm:p-8"
                  style={{
                    background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
                    border: `2px solid ${stat.color}30`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${stat.color}20 0%, transparent 70%)`,
                    }}
                  />
                  <div className="mb-4 flex justify-center">
                    <stat.Icon />
                  </div>
                  <p className="mb-2 text-4xl font-black sm:text-5xl" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-wider text-white/50 uppercase sm:text-sm">
                    {stat.label}
                  </p>
                  <div
                    className="absolute top-0 right-0 h-16 w-16"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${stat.color}10 50%)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
});
