"use client";

import { PassCardSkeleton } from "./PassCardSkeleton";

/**
 * Grid of skeleton loaders for the passes section
 */
export function PassesLoader() {
  return (
    <div className="grid grid-cols-1 items-end justify-items-center gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
      {[0, 1, 2].map((index) => (
        <PassCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}
