"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { COLORS, GRADIENTS } from "@/components/pages/zonals/constants/palette";
import { ZONAL_COLLEGES, ZONALS_HERO } from "@/components/pages/zonals/config/zonals.config";
import { ZonalsNavbar } from "./sections";

export function ZonalsLandingContent() {
  return (
    <>
      <ZonalsNavbar />

      <main className="relative min-h-screen" style={{ background: GRADIENTS.PAGE_BG }}>
        {/* Hero */}
        <section className="relative px-4 pt-32 pb-16 text-center sm:pt-40 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-5xl font-black tracking-tight uppercase sm:text-7xl"
              style={{
                background: GRADIENTS.TITLE,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {ZONALS_HERO.title}
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: `${COLORS.PAPER_WHITE}cc` }}
            >
              {ZONALS_HERO.description}
            </p>
          </motion.div>
        </section>

        {/* College Cards */}
        <section className="mx-auto max-w-6xl px-4 pb-24">
          <h2
            className="mb-8 text-center text-2xl font-bold tracking-wide uppercase"
            style={{ color: COLORS.ACID_LIME }}
          >
            Select Your College
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ZONAL_COLLEGES.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/zonals/${college.slug}`}>
                  <article
                    className="group relative overflow-hidden rounded-2xl p-6 transition-transform hover:scale-[1.02]"
                    style={{
                      background: COLORS.DEEP_INK,
                      border: `2px solid ${COLORS.ACID_LIME}33`,
                    }}
                  >
                    {/* Status badge */}
                    <span
                      className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase"
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

                    {/* College info */}
                    <h3
                      className="text-2xl font-black uppercase"
                      style={{ color: COLORS.PAPER_WHITE }}
                    >
                      {college.shortName}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
                      {college.name}
                    </p>

                    {/* Location & Date */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
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

                    {/* Events count & pricing */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: COLORS.ACID_LIME }}>
                        {college.events.length} Events
                      </span>
                      <span className="text-sm" style={{ color: `${COLORS.PAPER_WHITE}aa` }}>
                        From ₹{Math.min(...college.passes.map((p) => p.price))}
                      </span>
                    </div>

                    {/* CTA */}
                    <div
                      className="group-hover:bg-opacity-100 mt-6 flex items-center justify-between rounded-lg px-4 py-3 transition-colors"
                      style={{
                        background: `${COLORS.ACID_LIME}15`,
                        border: `1px solid ${COLORS.ACID_LIME}33`,
                      }}
                    >
                      <span
                        className="text-sm font-bold uppercase"
                        style={{ color: COLORS.ACID_LIME }}
                      >
                        View Events & Register
                      </span>
                      <ArrowRight
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        style={{ color: COLORS.ACID_LIME }}
                      />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
