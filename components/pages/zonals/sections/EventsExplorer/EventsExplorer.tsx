"use client";

// ═══════════════════════════════════════════════════════════════════
// EVENTS EXPLORER
//
// "PICK YOUR PLAYGROUND" — poster-style events grid.
//  • GSAP ScrollTrigger drives the headline + eyebrow reveal
//  • Asymmetric masonry-ish grid (card sizes come from EXPLORE_EVENTS)
//  • Each EventCard handles its own tilt + viewport reveal
//
// Content is PLACEHOLDER (see zonals.config.ts → EXPLORE_EVENTS).
// ═══════════════════════════════════════════════════════════════════

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS, GRADIENTS } from "@/components/pages/zonals/constants/palette";
import {
  EXPLORE_COPY,
  ZONAL_COLLEGES,
  getExploreEventsForCollege,
  type ZonalCollege,
} from "@/components/pages/zonals/config/zonals.config";
import { EventCard } from "./EventCard";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  college?: ZonalCollege;
}

export function EventsExplorer({ college }: Props) {
  const activeCollege = college ?? ZONAL_COLLEGES[0];
  const exploreEvents = getExploreEventsForCollege(activeCollege);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".explore-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:py-32 2xl:max-w-[1600px]"
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="mb-12 sm:mb-16">
        <span
          className="explore-reveal inline-block rotate-[-2deg] rounded-full px-3 py-1 text-xs font-black tracking-[0.3em] uppercase"
          style={{ background: COLORS.ACID_LIME, color: COLORS.DEEP_INK }}
        >
          {EXPLORE_COPY.eyebrow}
        </span>

        <h2
          className="explore-reveal mt-5 font-black uppercase"
          style={{
            fontSize: "clamp(2.75rem, 9vw, 7.5rem)",
            lineHeight: 0.9,
            background: GRADIENTS.TITLE,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {EXPLORE_COPY.title}
        </h2>

        <p
          className="explore-reveal mt-5 max-w-2xl text-base font-medium sm:text-lg"
          style={{ color: `${COLORS.PAPER_WHITE}cc` }}
        >
          {EXPLORE_COPY.subtitle}
        </p>
      </header>

      {/* ── Asymmetric grid ─────────────────────────────────────── */}
      <div className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exploreEvents.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
