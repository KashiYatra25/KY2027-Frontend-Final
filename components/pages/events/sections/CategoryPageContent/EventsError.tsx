"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// ERROR STATE - FESTIVE STYLE
// ═══════════════════════════════════════════════════════════════════

export function EventsError({
  message,
  onRetry,
  color,
}: {
  message: string;
  onRetry: () => void;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "2px solid rgba(239, 68, 68, 0.3)",
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.2)",
        }}
      >
        <AlertCircle className="h-10 w-10 text-red-400" />
      </div>
      <h3
        className="mb-2 text-xl font-bold italic"
        style={{ fontFamily: "Georgia, serif", color: "#FDF6E3" }}
      >
        Failed to load events
      </h3>
      <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        {message}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, hsl(from ${color} h s 30%) 100%)`,
          border: `2px solid ${color}`,
          color: "#FDF6E3",
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </motion.button>
    </motion.div>
  );
}
