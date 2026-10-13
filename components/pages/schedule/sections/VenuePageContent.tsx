"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FEST_DAYS } from "@/components/pages/schedule/config/campusMap.config";
import type { ScheduledEvent, Venue } from "@/lib/api/helper/types";
import { CampusMap } from "./CampusMap";

// ═══════════════════════════════════════════════════════════════════
// VENUE PAGE CONTENT
// "Walk-in" view of one venue: map zoomed onto the venue on the left,
// every event held there on the right.
// ═══════════════════════════════════════════════════════════════════

interface VenuePageContentProps {
  venue: Venue;
  events: ScheduledEvent[];
}

export function VenuePageContent({ venue, events }: VenuePageContentProps) {
  const categories = [...new Set(events.map((e) => e.category.name))];

  return (
    <>
      <main className="relative min-h-[100dvh] bg-[#080b18] text-white lg:h-[100dvh] lg:overflow-hidden">
        <div className="flex h-full flex-col lg:flex-row">
          {/* Zoomed map */}
          <div className="relative h-[45vh] shrink-0 overflow-hidden lg:h-full lg:flex-1">
            <CampusMap
              key={venue.slug}
              focusSlug={venue.slug}
              showControls={false}
              className="absolute top-1/2 left-1/2 w-[max(100%,calc(45vh*1.064))] -translate-x-1/2 -translate-y-1/2 lg:w-[max(100%,calc((100dvh_-_112px)*1.064))]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080b18] lg:bg-gradient-to-r" />
          </div>

          {/* Events at this venue */}
          <section
            className="relative border-white/10 bg-[#0b0e1f]/95 px-5 py-6 sm:px-8 lg:w-[min(560px,45vw)] lg:overflow-y-auto lg:border-l"
            data-lenis-prevent
          >
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#f3e6c8] uppercase transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> The Campus
            </Link>

            {categories.length > 0 && (
              <p className="mt-5 text-[11px] font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                {categories.join(" · ")}
              </p>
            )}
            <h1 className="mt-1 font-[family-name:var(--font-cinzel)] text-3xl leading-tight font-bold text-[#f3e6c8] sm:text-4xl">
              {venue.name}
            </h1>
            <p className="mt-2 text-[11px] font-semibold tracking-[0.25em] text-white/50 uppercase">
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </p>

            <div className="my-6 h-px bg-gradient-to-r from-[#D4A853]/50 via-white/10 to-transparent" />

            {events.length === 0 ? (
              <p className="text-sm leading-relaxed text-white/60">
                No events are scheduled at {venue.name} yet. Head back to the campus map to explore
                other venues.
              </p>
            ) : (
              <ol className="space-y-3">
                {events.map(({ event, category, day }) => (
                  <li
                    key={event.id}
                    className="grid grid-cols-[64px_1fr] gap-4 border-l-2 border-[#D4A853]/70 py-3 pl-4"
                  >
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-[#D4A853] uppercase">
                      Day {day}
                      <span className="mt-0.5 block text-[10px] tracking-normal text-white/40 normal-case">
                        {FEST_DAYS[day]}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-[family-name:var(--font-cinzel)] text-lg leading-snug font-semibold text-[#f3e6c8]">
                        {event.name}
                      </h2>
                      <p
                        className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] uppercase"
                        style={{ color: category.color }}
                      >
                        {category.name}
                      </p>
                      <p className="mt-1 text-sm text-white/70">{event.tagline}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/45">
                        <span className="capitalize">
                          {event.type}
                          {event.teamSize ? ` · ${event.teamSize}` : ""}
                        </span>
                        <Link
                          href={`/events/${category.slug}`}
                          className="inline-flex items-center gap-1 text-[#D4A853] hover:underline"
                        >
                          View event <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
