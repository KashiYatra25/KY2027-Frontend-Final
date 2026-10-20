"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { EventCard } from "./EventCard";
import type { ScheduledEvent } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// WHAT'S ON
// Auto-scrolling list of every scheduled event. Each card opens the
// venue the event is held at.
// On hover: pauses auto-scroll and enables manual wheel/touch scrolling.
// ═══════════════════════════════════════════════════════════════════

interface WhatsOnSidebarProps {
  className?: string;
  scheduledEvents: ScheduledEvent[];
}

export function WhatsOnSidebar({ className = "", scheduledEvents }: WhatsOnSidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sort events by category name then day for a nice mix in the feed
  const feed = useMemo(() => {
    return [...scheduledEvents].sort(
      (a, b) => a.category.name.localeCompare(b.category.name) || a.day - b.day
    );
  }, [scheduledEvents]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (feed.length === 0) {
    return (
      <aside className={`flex min-h-0 flex-col ${className}`} aria-label="What's on">
        <h2 className="mb-3 flex items-center gap-2 px-1 text-[11px] font-bold tracking-[0.3em] text-[#f3ead6] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f0b54a] shadow-[0_0_8px_#f0b54a]" />
          What&apos;s On
        </h2>
        <div className="flex flex-1 items-center justify-center px-2">
          <div
            className="flex w-full max-w-[220px] flex-col items-center gap-4 rounded-2xl px-5 py-8 text-center"
            style={{
              background: "linear-gradient(160deg, rgba(240,181,74,0.06), rgba(10,6,18,0.3))",
              border: "1px solid rgba(240,181,74,0.15)",
            }}
          >
            {/* Glowing icon */}
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(240,181,74,0.18) 0%, transparent 70%)",
                border: "1px solid rgba(240,181,74,0.3)",
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 24px rgba(240,181,74,0.25)" }}
              />
              <CalendarDays className="h-6 w-6" style={{ color: "#f0b54a" }} />
            </div>

            <div className="space-y-1.5">
              <p
                className="font-[family-name:var(--font-cinzel)] text-sm font-semibold tracking-wide"
                style={{ color: "#f3ead6" }}
              >
                No events scheduled yet
              </p>
              <p className="text-xs leading-relaxed text-white/45">
                The lineup is being prepared. Check back soon to see what&apos;s on across the
                campus.
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`flex min-h-0 flex-col ${className}`} aria-label="What's on">
      <h2 className="mb-3 flex items-center gap-2 px-1 text-[11px] font-bold tracking-[0.3em] text-[#f3ead6] uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f0b54a] shadow-[0_0_8px_#f0b54a]" />
        What&apos;s On
      </h2>

      <div
        ref={scrollRef}
        className={`whats-on-viewport min-h-0 flex-1 ${isHovered ? "is-hovered" : ""}`}
        data-lenis-prevent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="whats-on-track"
          style={{ "--duration": `${feed.length * 3.5}s` } as React.CSSProperties}
        >
          {feed.map((item) => (
            <EventCard key={`${item.event.id}-${item.venue.slug}`} item={item} />
          ))}
          {/* Duplicate for a seamless loop (hidden from assistive tech) */}
          {/* Always present - CSS handles pausing animation on hover */}
          <div aria-hidden className="flex flex-col gap-2">
            {feed.map((item) => (
              <EventCard
                key={`dup-${item.event.id}-${item.venue.slug}`}
                item={item}
                tabIndex={-1}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
