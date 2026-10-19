"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import { COLORS, GRADIENTS } from "@/components/pages/zonals/constants/palette";
import type { ZonalCollege } from "@/components/pages/zonals/config/zonals.config";

interface Props {
  college: ZonalCollege;
}

export function CollegeHeroSection({ college }: Props) {
  return (
    <section className="relative px-4 pt-32 pb-16 text-center sm:pt-40 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl"
      >
        {/* Badge */}
        <span
          className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
          style={{
            background: COLORS.ACID_LIME,
            color: COLORS.DEEP_INK,
          }}
        >
          Kashi Yatra Zonals
        </span>

        {/* College Name */}
        <h1
          className="mt-6 text-5xl font-black tracking-tight uppercase sm:text-7xl"
          style={{
            background: GRADIENTS.TITLE,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {college.shortName}
        </h1>

        <p className="mt-2 text-lg" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
          {college.name}
        </p>

        {/* Meta info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-2" style={{ color: `${COLORS.PAPER_WHITE}aa` }}>
            <MapPin className="h-4 w-4" style={{ color: COLORS.ACID_LIME }} />
            {college.city}, {college.state}
          </span>
          <span className="flex items-center gap-2" style={{ color: `${COLORS.PAPER_WHITE}aa` }}>
            <Calendar className="h-4 w-4" style={{ color: COLORS.ACID_LIME }} />
            {new Date(college.date).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2" style={{ color: `${COLORS.PAPER_WHITE}aa` }}>
            <Users className="h-4 w-4" style={{ color: COLORS.ACID_LIME }} />
            {college.events.length} Events
          </span>
        </div>

        {/* Description */}
        <p
          className="mx-auto mt-6 max-w-2xl text-base"
          style={{ color: `${COLORS.PAPER_WHITE}cc` }}
        >
          {college.description}
        </p>

        {/* Prize info */}
        <div
          className="mx-auto mt-8 inline-flex items-center gap-6 rounded-xl px-6 py-4"
          style={{
            background: `${COLORS.DEEP_INK}`,
            border: `1px solid ${COLORS.ACID_LIME}33`,
          }}
        >
          <div className="text-center">
            <span className="block text-xs uppercase" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
              1st Prize
            </span>
            <span className="text-lg font-bold" style={{ color: COLORS.ACID_LIME }}>
              {college.prizeDistribution.first}
            </span>
          </div>
          <div className="h-8 w-px" style={{ background: `${COLORS.PAPER_WHITE}22` }} />
          <div className="text-center">
            <span className="block text-xs uppercase" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
              2nd Prize
            </span>
            <span className="text-lg font-bold" style={{ color: COLORS.SIGNAL_ORANGE }}>
              {college.prizeDistribution.second}
            </span>
          </div>
          <div className="h-8 w-px" style={{ background: `${COLORS.PAPER_WHITE}22` }} />
          <div className="text-center">
            <span className="block text-xs uppercase" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
              All Participants
            </span>
            <span className="text-sm font-medium" style={{ color: COLORS.PAPER_WHITE }}>
              Certificate
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
