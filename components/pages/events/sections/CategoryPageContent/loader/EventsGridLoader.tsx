"use client";

import { EventCardSkeleton } from "./EventCardSkeleton";

// ═══════════════════════════════════════════════════════════════════
// GRID LOADER
// ═══════════════════════════════════════════════════════════════════

export function EventsGridLoader({ color }: { color: string }) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCardSkeleton key={index} index={index} color={color} />
      ))}
    </div>
  );
}
