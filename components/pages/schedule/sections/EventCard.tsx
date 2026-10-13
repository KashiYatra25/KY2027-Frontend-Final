"use client";

import Link from "next/link";
import { getCategoryMeta } from "@/lib/api/hooks";
import type { ScheduledEvent, FestDaysMap } from "@/lib/api/helper/types";

// Default fest days fallback - will be overridden when passed from parent
const DEFAULT_FEST_DAYS: FestDaysMap = {
  1: "14 Jan",
  2: "15 Jan",
  3: "16 Jan",
  4: "17 Jan",
};

interface EventCardProps {
  item: ScheduledEvent;
  tabIndex?: number;
  festDays?: FestDaysMap;
}

export function EventCard({ item, tabIndex, festDays = DEFAULT_FEST_DAYS }: EventCardProps) {
  const { event, category, venue, day } = item;
  const categoryMeta = getCategoryMeta(category.slug);
  const categoryColor = categoryMeta?.color ?? "#D4A853";

  return (
    <Link
      href={`/schedule/${venue.slug}`}
      tabIndex={tabIndex}
      className="group block shrink-0 rounded-sm border border-white/[0.07] bg-[#10132a]/80 px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#161a36]"
      style={{ borderLeft: `2px solid ${categoryColor}` }}
    >
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] uppercase">
        <span className="flex items-center gap-1.5" style={{ color: categoryColor }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: categoryColor }} />
          {category.name}
        </span>
        <span className="text-white/60" title={festDays[day]}>
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
