"use client";

import { GraduationCap } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// IIT BHU BADGE
// Shows "IIT (BHU)" badge for verified IIT BHU students
// ═══════════════════════════════════════════════════════════════════

export function IITBhuBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-wide"
      style={{
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.1))",
        border: "1px solid rgba(59, 130, 246, 0.5)",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: "linear-gradient(135deg, #3b82f6, #0ea5e9)" }}
      >
        <GraduationCap className="h-3.5 w-3.5 text-white" />
      </div>
      <span
        style={{
          background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        IIT (BHU)
      </span>
    </div>
  );
}
