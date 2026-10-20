"use client";

// ═══════════════════════════════════════════════════════════════════
// ZONAL PASSES SECTION
// Shows user's zonal passes and registered events in profile page
// ═══════════════════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import { Ticket, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { useMyZonalPasses } from "@/lib/api/hooks";
import { COLORS } from "../constants/palette";

export function ZonalPassesSection() {
  const { colleges, count, isLoading, isError } = useMyZonalPasses();

  // Don't show section if loading, error, or no passes
  if (isLoading || isError || count === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${COLORS.GOLD}20` }}
        >
          <Ticket className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: COLORS.CREAM }}>
            Zonal Passes
          </h2>
          <p className="text-xs" style={{ color: `${COLORS.CREAM}77` }}>
            Your regional event passes
          </p>
        </div>
      </div>

      {/* Passes Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {colleges.map((college) => (
          <article
            key={college.collegeSlug}
            className="rounded-xl border p-4"
            style={{
              background: `${COLORS.PURPLE_DEEP}50`,
              borderColor: `${COLORS.GOLD}33`,
            }}
          >
            {/* College Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                <h3 className="text-sm font-bold uppercase" style={{ color: COLORS.CREAM }}>
                  {college.collegeSlug.toUpperCase()}
                </h3>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{
                  background:
                    college.eventLimit === -1 ? `${COLORS.GOLD}20` : `${COLORS.SUCCESS}20`,
                  color: college.eventLimit === -1 ? COLORS.GOLD : COLORS.SUCCESS,
                }}
              >
                {college.eventLimit === -1 ? "Multi Event" : "Single Event"}
              </span>
            </div>

            {/* Pass Details */}
            <div className="mt-3 space-y-2">
              {college.passes.map((pass, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs"
                  style={{ background: `${COLORS.CREAM}08` }}
                >
                  <span style={{ color: `${COLORS.CREAM}cc` }}>
                    {pass.passType === "MULTI_EVENT" ? "Multi Event Pass" : "Single Event Pass"}
                  </span>
                  <span style={{ color: `${COLORS.CREAM}77` }}>₹{pass.amount}</span>
                </div>
              ))}
            </div>

            {/* Registered Events */}
            {college.registeredEvents.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-xs font-medium" style={{ color: `${COLORS.CREAM}77` }}>
                  Registered Events ({college.registeredEvents.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {college.registeredEvents.map((eventSlug) => (
                    <span
                      key={eventSlug}
                      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: `${COLORS.SUCCESS}15`,
                        color: COLORS.SUCCESS,
                      }}
                    >
                      <CheckCircle className="h-3 w-3" />
                      {eventSlug}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* View College Link */}
            <Link
              href={`/zonals/${college.collegeSlug}`}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:opacity-80"
              style={{
                background: `${COLORS.GOLD}15`,
                color: COLORS.GOLD,
              }}
            >
              View Events
              <ExternalLink className="h-3 w-3" />
            </Link>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
