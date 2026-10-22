"use client";

import { CategoryCardSkeleton } from "./CategoryCardSkeleton";

// ═══════════════════════════════════════════════════════════════════
// INLINE LOADER (9 skeleton cards in grid)
// ═══════════════════════════════════════════════════════════════════

export function CategoriesLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 2xl:gap-8">
      {Array.from({ length: 9 }).map((_, index) => (
        <CategoryCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}
