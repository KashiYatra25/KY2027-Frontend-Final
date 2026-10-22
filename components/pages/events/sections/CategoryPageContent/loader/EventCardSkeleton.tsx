"use client";

import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// EVENT CARD SKELETON - FESTIVE STYLE
// ═══════════════════════════════════════════════════════════════════

export function EventCardSkeleton({ index, color }: { index: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(160deg, 
          hsl(from ${color} h s 12% / 0.95) 0%,
          hsl(from ${color} h s 6% / 0.98) 40%,
          hsl(from ${color} h s 8% / 0.95) 100%
        )`,
        border: `2px solid ${color}25`,
        minHeight: "380px",
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Title skeleton */}
        <div className="mb-4 flex items-start justify-between">
          <div
            className="h-7 w-2/3 animate-pulse rounded-lg"
            style={{ background: `${color}20` }}
          />
          <div
            className="h-7 w-20 animate-pulse rounded-full"
            style={{ background: `${color}15` }}
          />
        </div>

        {/* Divider */}
        <div className="mb-4 h-px" style={{ background: `${color}20` }} />

        {/* Tagline skeleton */}
        <div
          className="mb-3 h-4 w-1/2 animate-pulse rounded"
          style={{ background: `${color}15` }}
        />

        {/* Description skeleton */}
        <div
          className="mb-2 h-3 w-full animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="mb-2 h-3 w-5/6 animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="mb-6 h-3 w-4/6 flex-1 animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />

        {/* Button skeleton */}
        <div
          className="mt-auto h-12 w-full animate-pulse rounded-xl"
          style={{ background: `${color}20` }}
        />
      </div>
    </motion.div>
  );
}
