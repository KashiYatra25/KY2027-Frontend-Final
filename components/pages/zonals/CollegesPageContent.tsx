"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/zonals/constants/palette";
import { ZONAL_COLLEGES } from "@/components/pages/zonals/config/zonals.config";
import { IMAGES } from "@/lib/images";
import { ZonalsNavbar } from "./sections";

// ═══════════════════════════════════════════════════════════════════
// ZONALS — COLLEGES PAGE
//
// Dedicated, vibrant, animated page where the COLLEGE CARDS are the hero.
// Decorated with the single/multi pass artwork as floating elements.
// ═══════════════════════════════════════════════════════════════════

// Floating pass-artwork decor — tagged with position + motion params.
const FLOATING_PASSES = [
  {
    src: IMAGES.zonals.singlePassPortrait,
    alt: "Single event pass",
    className: "left-[-3%] top-[14%] w-28 rotate-[-10deg] sm:w-40 lg:w-52",
    drift: 18,
    duration: 7,
  },
  {
    src: IMAGES.zonals.multiPassLandscape,
    alt: "Multi event pass",
    className: "right-[-4%] top-[8%] w-40 rotate-[8deg] sm:w-56 lg:w-72",
    drift: -22,
    duration: 9,
  },
  {
    src: IMAGES.zonals.multiPassPortrait,
    alt: "Multi event pass",
    className: "left-[2%] bottom-[10%] w-24 rotate-[7deg] sm:w-36 lg:w-44",
    drift: 24,
    duration: 8,
  },
  {
    src: IMAGES.zonals.singlePassLandscape,
    alt: "Single event pass",
    className: "right-[1%] bottom-[14%] w-36 rotate-[-6deg] sm:w-52 lg:w-64",
    drift: -16,
    duration: 10,
  },
] as const;

export function CollegesPageContent() {
  const reduce = useReducedMotion();

  return (
    <>
      <ZonalsNavbar />

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: GRADIENTS.PAGE_BG }}
      >
        {/* ── Floating pass artwork (decorative) ── */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          {FLOATING_PASSES.map((pass, i) => (
            <motion.div
              key={i}
              className={`absolute ${pass.className}`}
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                reduce
                  ? { opacity: 0.85, scale: 1 }
                  : { opacity: 0.9, scale: 1, y: [0, pass.drift, 0] }
              }
              transition={
                reduce
                  ? { duration: 0.6 }
                  : {
                      opacity: { duration: 0.6, delay: i * 0.1 },
                      scale: { duration: 0.6, delay: i * 0.1 },
                      y: { duration: pass.duration, repeat: Infinity, ease: "easeInOut" },
                    }
              }
            >
              <Image
                src={pass.src}
                alt={pass.alt}
                width={320}
                height={320}
                className="h-auto w-full select-none"
                unoptimized
              />
            </motion.div>
          ))}
        </div>

        {/* Ambient neon glows */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 z-0 h-[40vh] w-[80vw] -translate-x-1/2 opacity-40 blur-[120px]"
          style={{
            background: `radial-gradient(ellipse, ${COLORS.ELECTRIC_VIOLET}55 0%, transparent 70%)`,
          }}
          aria-hidden
        />

        {/* ── Header ── */}
        <section className="relative z-10 px-4 pt-32 pb-10 text-center sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-black tracking-[0.2em] uppercase"
              style={{
                background: COLORS.ACID_LIME,
                color: COLORS.DEEP_INK,
                boxShadow: SHADOWS.LIME_GLOW,
              }}
            >
              Zonals · Partner Colleges
            </span>

            <h1
              className="mt-5 text-5xl font-black tracking-tight uppercase sm:text-7xl lg:text-8xl"
              style={{
                background: GRADIENTS.TITLE,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: SHADOWS.TITLE_DROP,
              }}
            >
              Pick Your College
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
              style={{ color: `${COLORS.PAPER_WHITE}cc` }}
            >
              Your campus, your stage. Choose your zonal and jump straight into the events.
            </p>
          </motion.div>
        </section>

        {/* ── College cards (the hero of this page) ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ZONAL_COLLEGES.map((college, index) => {
              const isTrending = college.slug === "rgipt"; // RGIPT is the first active zonal

              return (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  whileHover={reduce ? undefined : { y: -6 }}
                >
                  <Link href={`/zonals/${college.slug}`}>
                    <article
                      className="group relative h-full overflow-hidden rounded-3xl p-6 backdrop-blur-sm transition-shadow"
                      style={{
                        background: `${COLORS.DEEP_INK}cc`,
                        border: isTrending
                          ? `2px solid ${COLORS.SIGNAL_ORANGE}66`
                          : `2px solid ${COLORS.ACID_LIME}33`,
                        boxShadow: isTrending
                          ? `${SHADOWS.CARD}, 0 0 40px ${COLORS.SIGNAL_ORANGE}33`
                          : SHADOWS.CARD,
                      }}
                    >
                      {/* Hover glow sweep */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${isTrending ? COLORS.SIGNAL_ORANGE : COLORS.ACID_LIME}18 0%, transparent 60%)`,
                        }}
                      />

                      {/* Trending badge - only for RGIPT */}
                      {isTrending && (
                        <span
                          className="absolute top-5 left-5 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black uppercase"
                          style={{
                            background: `linear-gradient(90deg, ${COLORS.SIGNAL_ORANGE}, ${COLORS.ELECTRIC_VIOLET})`,
                            color: COLORS.PAPER_WHITE,
                            boxShadow: `0 0 12px ${COLORS.SIGNAL_ORANGE}55`,
                          }}
                        >
                          <span className="text-sm">🔥</span>
                          Trending
                        </span>
                      )}

                      {/* Status badge */}
                      <span
                        className="absolute top-5 right-5 rounded-full px-3 py-1 text-xs font-black uppercase"
                        style={{
                          background:
                            college.status === "registration-open"
                              ? COLORS.ACID_LIME
                              : college.status === "upcoming"
                                ? COLORS.SIGNAL_ORANGE
                                : COLORS.ELECTRIC_BLUE,
                          color: COLORS.DEEP_INK,
                        }}
                      >
                        {college.status === "registration-open"
                          ? "Open"
                          : college.status === "upcoming"
                            ? "Coming Soon"
                            : "Completed"}
                      </span>

                      <h3
                        className="relative text-3xl font-black uppercase"
                        style={{ color: COLORS.PAPER_WHITE }}
                      >
                        {college.shortName}
                      </h3>
                      <p
                        className="relative mt-1 text-sm"
                        style={{ color: `${COLORS.PAPER_WHITE}88` }}
                      >
                        {college.name}
                      </p>

                      <div className="relative mt-4 flex flex-wrap gap-4 text-sm">
                        <span
                          className="flex items-center gap-1.5"
                          style={{ color: `${COLORS.PAPER_WHITE}aa` }}
                        >
                          <MapPin className="h-4 w-4" />
                          {college.city}, {college.state}
                        </span>
                        <span
                          className="flex items-center gap-1.5"
                          style={{ color: `${COLORS.PAPER_WHITE}aa` }}
                        >
                          <Calendar className="h-4 w-4" />
                          {new Date(college.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="relative mt-4 flex items-center justify-between">
                        <span className="text-sm font-bold" style={{ color: COLORS.ACID_LIME }}>
                          {college.events.length} Events
                        </span>
                        <span className="text-sm" style={{ color: `${COLORS.PAPER_WHITE}aa` }}>
                          From ₹{Math.min(...college.passes.map((p) => p.price))}
                        </span>
                      </div>

                      <div
                        className="relative mt-6 flex items-center justify-between rounded-xl px-4 py-3 transition-colors"
                        style={{
                          background: `${COLORS.ACID_LIME}15`,
                          border: `1px solid ${COLORS.ACID_LIME}33`,
                        }}
                      >
                        <span
                          className="text-sm font-black uppercase"
                          style={{ color: COLORS.ACID_LIME }}
                        >
                          View Events &amp; Register
                        </span>
                        <ArrowRight
                          className="h-5 w-5 transition-transform group-hover:translate-x-1"
                          style={{ color: COLORS.ACID_LIME }}
                        />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Back to Zonals */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/zonals"
              className="group inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-black tracking-[0.14em] uppercase transition-colors"
              style={{ borderColor: `${COLORS.PAPER_WHITE}33`, color: COLORS.PAPER_WHITE }}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Zonals
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
