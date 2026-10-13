"use client";

import Link from "next/link";
import { FEST_DAYS } from "@/components/pages/schedule/config/campusMap.config";
import type { ScheduledEvent } from "@/lib/api/helper/types";

export function EventCard({ item, tabIndex }: { item: ScheduledEvent; tabIndex?: number }) {
  const { event, category, venue, day } = item;
  return (
    <Link
      href={`/schedule/${venue.slug}`}
      tabIndex={tabIndex}
      className="group block shrink-0 rounded-sm border border-white/[0.07] bg-[#10132a]/80 px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#161a36]"
      style={{ borderLeft: `2px solid ${category.color}` }}
    >
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] uppercase">
        <span className="flex items-center gap-1.5" style={{ color: category.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: category.color }} />
          {category.name}
        </span>
        <span className="text-white/60" title={FEST_DAYS[day]}>
          Day {day}
        </span>
      </div>
      <p className="mt-1.5 font-[family-name:var(--font-cormorant)] text-[19px] leading-tight font-semibold text-[#f3ead6] group-hover:text-white">
        {event.name}
      </p>
      <p className="mt-1 text-[11px] font-medium tracking-[0.06em] text-white/45">{venue.name}</p>
    </Link>
  );
}
