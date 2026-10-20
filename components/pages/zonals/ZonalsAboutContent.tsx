"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Trophy, Ticket, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/zonals/constants/palette";
import { ZonalsNavbar } from "./sections";

// ═══════════════════════════════════════════════════════════════════
// ZONALS — ABOUT PAGE
//
// Explains what Zonals are (KY-team events hosted at partner colleges)
// and the headline reward: winning teams get a heavy discount on
// Kashi Yatra festival tickets.
// ═══════════════════════════════════════════════════════════════════

const STEPS = [
  {
    icon: MapPin,
    title: "We Come To You",
    body: "The Kashi Yatra team takes the fest on the road — hosting Zonal events right inside partner colleges across the region.",
    color: COLORS.ELECTRIC_BLUE,
  },
  {
    icon: Sparkles,
    title: "Compete On Your Turf",
    body: "Dance, music, art, theatre, quizzing and more — battle it out in your own campus against the best crews around.",
    color: COLORS.HOT_PINK,
  },
  {
    icon: Trophy,
    title: "Win Big",
    body: "Top the Zonal and your team unlocks a reward that carries all the way to the main fest at IIT (BHU).",
    color: COLORS.ACID_LIME,
  },
] as const;

export function ZonalsAboutContent() {
  return (
    <>
      <ZonalsNavbar />

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: GRADIENTS.PAGE_BG }}
      >
        {/* Ambient neon glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 z-0 h-[40vh] w-[80vw] -translate-x-1/2 opacity-40 blur-[120px]"
          style={{
            background: `radial-gradient(ellipse, ${COLORS.HOT_PINK}44 0%, transparent 70%)`,
          }}
          aria-hidden
        />

        {/* ── Header ── */}
        <section className="relative z-10 px-4 pt-32 pb-12 text-center sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-black tracking-[0.2em] uppercase"
              style={{
                background: COLORS.ACID_LIME,
                color: COLORS.DEEP_INK,
                boxShadow: SHADOWS.LIME_GLOW,
              }}
            >
              What Are Zonals?
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
              The Fest, On Tour
            </h1>
            <p
              className="mx-auto mt-5 max-w-2xl text-base sm:text-lg"
              style={{ color: `${COLORS.PAPER_WHITE}cc` }}
            >
              Zonals are regional events curated by the Kashi Yatra team and hosted at partner
              colleges. Same energy, same competition — brought straight to your campus, ahead of
              the main fest at IIT (BHU) Varanasi.
            </p>
          </motion.div>
        </section>

        {/* ── How it works (3 steps) ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl p-6"
                  style={{
                    background: `${COLORS.DEEP_INK}cc`,
                    border: `2px solid ${step.color}44`,
                    boxShadow: SHADOWS.CARD,
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${step.color}1f`, border: `1px solid ${step.color}55` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: step.color }} />
                  </div>
                  <h3
                    className="text-xl font-black uppercase"
                    style={{ color: COLORS.PAPER_WHITE }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: `${COLORS.PAPER_WHITE}aa` }}>
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── The reward (hero highlight) ── */}
        <section className="relative z-10 mx-auto max-w-5xl px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl p-8 text-center sm:p-12"
            style={{
              background: GRADIENTS.VIOLET_PINK,
              boxShadow: SHADOWS.PINK_GLOW,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #fff2 0 2px, transparent 2px), radial-gradient(circle at 80% 60%, #fff2 0 2px, transparent 2px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="mb-4 flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "#ffffff22", border: "1px solid #ffffff55" }}
                >
                  <Ticket className="h-8 w-8" style={{ color: COLORS.PAPER_WHITE }} />
                </div>
              </div>
              <p
                className="text-sm font-black tracking-[0.2em] uppercase"
                style={{ color: `${COLORS.PAPER_WHITE}cc` }}
              >
                Winners&apos; Reward
              </p>
              <h2
                className="mt-2 text-4xl font-black uppercase sm:text-6xl"
                style={{ color: COLORS.PAPER_WHITE }}
              >
                Up to 35–40% OFF
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base sm:text-lg"
                style={{ color: `${COLORS.PAPER_WHITE}dd` }}
              >
                Win your Zonal and your team earns a heavy discount — around <strong>35–40%</strong>{" "}
                — on Kashi Yatra festival tickets. Compete locally, celebrate at the main stage for
                less.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/zonals/colleges"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black tracking-[0.14em] uppercase"
                  style={{
                    background: COLORS.DEEP_INK,
                    color: COLORS.ACID_LIME,
                    boxShadow: `4px 4px 0 ${COLORS.DEEP_INK}66`,
                  }}
                >
                  Find Your College
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

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
