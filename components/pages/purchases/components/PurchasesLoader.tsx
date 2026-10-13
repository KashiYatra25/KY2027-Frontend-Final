"use client";

import { motion } from "framer-motion";

export function PurchasesLoader() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
        >
          {/* Header skeleton */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
          </div>

          {/* Item skeleton */}
          <div className="mb-4 rounded-lg bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-white/10" />
              <div className="flex-1">
                <div className="mb-1 h-4 w-28 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
