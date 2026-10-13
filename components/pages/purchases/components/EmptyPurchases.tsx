"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Receipt, Sparkles, ArrowRight } from "lucide-react";

export function EmptyPurchases() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-purple-500/5 p-8 text-center backdrop-blur-sm sm:p-12"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10"
        >
          <Receipt className="h-10 w-10 text-amber-400" />
        </motion.div>

        <h3
          className="mb-2 text-xl font-bold"
          style={{
            background: "linear-gradient(135deg, #f0d890 0%, #d4a853 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          No Purchases Yet
        </h3>
        <p className="mx-auto mb-6 max-w-sm text-sm text-gray-400">
          You haven't made any purchases yet. Explore our festival passes and be part of the
          grandest cultural celebration!
        </p>

        <Link
          href="/passes"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-medium text-black transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/25"
        >
          <Sparkles className="h-4 w-4" />
          Browse Passes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
