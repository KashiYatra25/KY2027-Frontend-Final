"use client";

import { motion } from "framer-motion";

/**
 * Skeleton loader for a single pass card
 * Matches the dimensions and structure of PassCard
 */
export function PassCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative w-full max-w-[340px]"
    >
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Image skeleton */}
        <div className="relative h-[280px] overflow-hidden sm:h-[320px] lg:h-[380px]">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: `linear-gradient(135deg, rgba(212, 168, 83, 0.05) 0%, rgba(139, 69, 19, 0.08) 100%)`,
            }}
          />
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(212, 168, 83, 0.08) 50%, transparent 100%)`,
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 p-5">
          {/* Name skeleton */}
          <div className="flex items-center justify-between">
            <div
              className="h-7 w-32 animate-pulse rounded-md"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div
              className="h-6 w-16 animate-pulse rounded-full"
              style={{ background: "rgba(212, 168, 83, 0.15)" }}
            />
          </div>

          {/* Tagline skeleton */}
          <div
            className="h-4 w-40 animate-pulse rounded"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Benefits skeleton */}
          <div className="space-y-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-4 w-4 animate-pulse rounded-full"
                  style={{
                    background: "rgba(212, 168, 83, 0.2)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <div
                  className="h-3 animate-pulse rounded"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    width: `${60 + Math.random() * 30}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Button skeleton */}
          <div
            className="mt-4 h-12 w-full animate-pulse rounded-xl"
            style={{
              background: `linear-gradient(135deg, rgba(212, 168, 83, 0.15) 0%, rgba(139, 69, 19, 0.2) 100%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
