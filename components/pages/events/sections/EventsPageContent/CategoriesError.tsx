"use client";

import { COLORS } from "@/components/pages/events/constants/palette";
import { AlertCircle, RefreshCw } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// ERROR STATE
// ═══════════════════════════════════════════════════════════════════

export function CategoriesError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "rgba(239, 68, 68, 0.1)" }}
      >
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">Failed to load events</h3>
      <p className="mb-6 text-sm text-gray-400">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        style={{
          background: COLORS.BRIGHT_GOLD,
          color: "#000",
        }}
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
