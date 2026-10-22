"use client";

import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════
// IIT BHU USER RESTRICTED DISPLAY
// Shows message when IIT BHU student tries to access CA application
// ═══════════════════════════════════════════════════════════════════

export function IITBhuRestrictedDisplay() {
  return (
    <div className="relative mx-auto max-w-lg rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-8 backdrop-blur-sm">
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-xl"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)",
        }}
      />

      {/* Icon */}
      <div className="mb-4 text-5xl">🏛️</div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-bold text-blue-400">
        You&apos;re Already Part of the Team!
      </h3>

      {/* Description */}
      <p className="mb-4 text-gray-300">
        As an IIT BHU student, you&apos;re already part of the Kashi Yatra family! The Campus
        Ambassador program is designed to help students from other colleges spread the word about
        our fest.
      </p>

      {/* Additional info */}
      <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-sm text-blue-300">
          💡 Want to contribute? Join one of our organizing teams or volunteer during the fest!
        </p>
      </div>

      {/* Link to teams page */}
      <Link
        href="/teams"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.2))",
          border: "1px solid rgba(59, 130, 246, 0.4)",
          color: "#60a5fa",
        }}
      >
        Explore Teams
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </div>
  );
}
