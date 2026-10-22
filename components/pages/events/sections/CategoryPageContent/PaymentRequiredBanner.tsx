"use client";

import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// PAYMENT REQUIRED BANNER
// ═══════════════════════════════════════════════════════════════════

export function PaymentRequiredBanner({}: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 overflow-hidden rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%)",
        border: "2px solid rgba(239, 68, 68, 0.35)",
        boxShadow: "0 0 30px rgba(239, 68, 68, 0.15)",
      }}
    >
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(239, 68, 68, 0.2)" }}
          >
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-red-300">Pass Required</p>
            <p className="text-sm text-red-200/70">Purchase a pass to register for events</p>
          </div>
        </div>
        <Link
          href="/passes"
          className="group flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg"
          style={{ boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
        >
          Buy Pass
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
