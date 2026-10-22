"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// EMPTY STATE - FESTIVE STYLE
// ═══════════════════════════════════════════════════════════════════

export function EmptyEvents({ categoryName, color }: { categoryName: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          background: `${color}20`,
          border: `2px solid ${color}40`,
          boxShadow: `0 0 30px ${color}20`,
        }}
      >
        <Sparkles className="h-10 w-10" style={{ color }} />
      </div>
      <h3
        className="mb-2 text-xl font-bold italic"
        style={{ fontFamily: "Georgia, serif", color: "#FDF6E3" }}
      >
        Coming Soon
      </h3>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Events for {categoryName} will be announced soon!
      </p>
    </motion.div>
  );
}
