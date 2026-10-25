"use client";

import { ShieldX, Mail } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  BG_WINE: "#2a1020",
  GOLD: "#d4a853",
  GOLD_DARK: "#8b6914",
  CREAM: "#fdf6e3",
  ERROR: "#ef4444",
};

// ═══════════════════════════════════════════════════════════════════
// ACCOUNT SUSPENDED STATE COMPONENT
// Shown when user's account has been suspended
// ═══════════════════════════════════════════════════════════════════
export function AccountSuspendedState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div
        className="mx-auto max-w-md rounded-3xl p-10 text-center sm:p-14"
        style={{
          background: `linear-gradient(145deg, ${COLORS.BG_WINE}60 0%, ${COLORS.BG_ROYAL}80 100%)`,
          border: `1px solid ${COLORS.ERROR}25`,
          boxShadow: `0 0 60px ${COLORS.ERROR}10, 0 20px 40px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Animated Icon */}
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            background: `linear-gradient(135deg, ${COLORS.ERROR}20, ${COLORS.ERROR}10)`,
            border: `2px solid ${COLORS.ERROR}40`,
            boxShadow: `0 0 30px ${COLORS.ERROR}20`,
          }}
        >
          <ShieldX className="h-10 w-10" style={{ color: COLORS.ERROR }} />
        </div>

        <h2 className="mb-3 text-2xl font-bold sm:text-3xl" style={{ color: COLORS.CREAM }}>
          Account Suspended
        </h2>
        <p className="mb-4 text-base" style={{ color: `${COLORS.CREAM}80` }}>
          Your account has been suspended due to a policy violation.
        </p>
        <p className="mb-8 text-sm" style={{ color: `${COLORS.CREAM}50` }}>
          Access to your profile and Kashiyatra features has been restricted. If you believe this is
          a mistake, please contact our support team.
        </p>

        {/* Contact Support Button */}
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
            color: COLORS.BG_DEEP,
            boxShadow: `0 10px 30px ${COLORS.GOLD}30`,
          }}
        >
          <Mail className="h-5 w-5" />
          Contact Support
        </a>

        {/* Help text */}
        <p className="mt-6 text-xs" style={{ color: `${COLORS.CREAM}40` }}>
          Include your registered email address when contacting support.
        </p>
      </div>
    </div>
  );
}
