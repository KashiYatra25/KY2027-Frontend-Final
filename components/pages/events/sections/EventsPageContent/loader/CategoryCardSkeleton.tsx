"use client";

import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY CARD SKELETON
// ═══════════════════════════════════════════════════════════════════

export function CategoryCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl p-4 sm:p-5"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Icon skeleton */}
      <div
        className="mx-auto mb-3 h-12 w-12 animate-pulse rounded-xl sm:h-14 sm:w-14"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />

      {/* Name skeleton */}
      <div
        className="mx-auto mb-2 h-5 w-24 animate-pulse rounded"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />

      {/* Tagline skeleton */}
      <div
        className="mx-auto mb-3 h-3 w-20 animate-pulse rounded"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Events count skeleton */}
      <div
        className="mx-auto h-6 w-16 animate-pulse rounded-full"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    </motion.div>
  );
}
