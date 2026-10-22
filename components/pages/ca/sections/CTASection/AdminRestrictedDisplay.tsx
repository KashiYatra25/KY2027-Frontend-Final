"use client";

// ═══════════════════════════════════════════════════════════════════
// ADMIN USER RESTRICTED DISPLAY
// Shows message when admin tries to access CA application
// ═══════════════════════════════════════════════════════════════════

export function AdminRestrictedDisplay() {
  return (
    <div className="relative mx-auto max-w-lg rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-sm">
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-xl"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)",
        }}
      />

      {/* Icon */}
      <div className="mb-4 text-5xl">👑</div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-bold text-purple-400">You&apos;re Already an Admin!</h3>

      {/* Description */}
      <p className="mb-4 text-gray-300">
        As an admin of Kashi Yatra, you&apos;re already part of the core team! The Campus Ambassador
        program is designed for students who want to promote the fest at their colleges.
      </p>

      {/* Additional info */}
      <div className="mt-6 rounded-lg border border-purple-500/20 bg-purple-500/10 p-4">
        <p className="text-sm text-purple-300">
          🎯 Head to the admin dashboard to manage CA applications and more!
        </p>
      </div>
    </div>
  );
}
