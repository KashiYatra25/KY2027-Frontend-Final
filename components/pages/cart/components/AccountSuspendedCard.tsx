"use client";

import { motion } from "framer-motion";
import { ShieldX, Mail } from "lucide-react";
import { COLORS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// ACCOUNT SUSPENDED STATE - Cart Page
// Shown when user's account has been suspended
// ═══════════════════════════════════════════════════════════════════
export function AccountSuspendedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-2xl border p-8 text-center"
      style={{
        background: `linear-gradient(145deg, rgba(239,68,68,0.08) 0%, ${COLORS.BG_DEEP}90 100%)`,
        borderColor: "rgba(239, 68, 68, 0.25)",
        boxShadow: "0 0 40px rgba(239,68,68,0.1), 0 15px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Icon */}
      <div
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.1))",
          border: "2px solid rgba(239,68,68,0.4)",
          boxShadow: "0 0 25px rgba(239,68,68,0.2)",
        }}
      >
        <ShieldX className="h-8 w-8 text-red-400" />
      </div>

      <h2 className="mb-2 text-xl font-bold text-white">Account Suspended</h2>
      <p className="mb-4 text-sm text-red-300/80">
        Your account has been suspended due to a policy violation.
      </p>
      <p className="mb-6 text-xs text-gray-400">
        You cannot purchase passes while your account is suspended. Please contact our support team
        for assistance.
      </p>

      {/* Contact Support Button */}
      <a
        href="/contact"
        className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.DARK_GOLD} 100%)`,
          color: COLORS.BG_DEEP,
          boxShadow: `0 8px 25px ${COLORS.GOLD}30`,
        }}
      >
        <Mail className="h-4 w-4" />
        Contact Support
      </a>
    </motion.div>
  );
}
