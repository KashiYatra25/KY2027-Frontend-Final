"use client";

import { Rocket } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// CA BADGE
// Shows "Campus Ambassador" badge for approved CAs
// ═══════════════════════════════════════════════════════════════════

export function CaBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-wide"
      style={{
        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.1))",
        border: "1px solid rgba(236, 72, 153, 0.5)",
        boxShadow: "0 0 20px rgba(236, 72, 153, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
      >
        <Rocket className="h-3.5 w-3.5 text-white" />
      </div>
      <span
        style={{
          background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Campus Ambassador
      </span>
    </div>
  );
}
