"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Copy, Check, User, Mail, Ticket, AlertTriangle, LogIn } from "lucide-react";
import Link from "next/link";
import { useMyAccount } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/zonals/constants/palette";

interface UserInfoBoxProps {
  className?: string;
}

export function UserInfoBox({ className = "" }: UserInfoBoxProps) {
  const { status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";
  const { profile, isLoading } = useMyAccount("full");

  const [copiedField, setCopiedField] = useState<"id" | "email" | null>(null);

  const handleCopy = useCallback(async (text: string, field: "id" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  // Not logged in
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-4 ${className}`}
        style={{
          background: `${COLORS.DEEP_INK}`,
          borderColor: `${COLORS.SIGNAL_ORANGE}50`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: `${COLORS.SIGNAL_ORANGE}20` }}
          >
            <LogIn className="h-5 w-5" style={{ color: COLORS.SIGNAL_ORANGE }} />
          </div>
          <div className="flex-1">
            <p className="font-medium" style={{ color: COLORS.PAPER_WHITE }}>
              Login Required
            </p>
            <p className="text-sm" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
              Sign in to purchase passes and register for events
            </p>
          </div>
          <Link
            href="/auth/signin"
            className="rounded-lg px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
            style={{ background: COLORS.ACID_LIME, color: COLORS.DEEP_INK }}
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div
        className={`animate-pulse rounded-xl border p-4 ${className}`}
        style={{ background: `${COLORS.DEEP_INK}`, borderColor: `${COLORS.PAPER_WHITE}20` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full"
            style={{ background: `${COLORS.PAPER_WHITE}10` }}
          />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded" style={{ background: `${COLORS.PAPER_WHITE}10` }} />
            <div className="h-3 w-48 rounded" style={{ background: `${COLORS.PAPER_WHITE}10` }} />
          </div>
        </div>
      </div>
    );
  }

  const kyId = profile?.kyId || "Not assigned";
  const email = profile?.email || "";
  const name = profile?.firstName
    ? `${profile.firstName} ${profile.lastName || ""}`.trim()
    : "User";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border ${className}`}
      style={{
        background: COLORS.DEEP_INK,
        borderColor: `${COLORS.ACID_LIME}30`,
      }}
    >
      {/* Warning Banner */}
      <div
        className="flex items-start gap-3 rounded-t-xl border-b px-4 py-3"
        style={{
          background: `${COLORS.SIGNAL_ORANGE}10`,
          borderColor: `${COLORS.SIGNAL_ORANGE}30`,
        }}
      >
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0"
          style={{ color: COLORS.SIGNAL_ORANGE }}
        />
        <p className="text-xs" style={{ color: `${COLORS.PAPER_WHITE}cc` }}>
          Use the <strong>same email</strong> or enter your <strong>KY ID</strong> when purchasing
          on KonfHub to link your pass.
        </p>
      </div>

      {/* User Info */}
      <div className="space-y-3 p-4">
        {/* Name */}
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" style={{ color: `${COLORS.PAPER_WHITE}66` }} />
          <span className="text-sm" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
            Registered as:
          </span>
          <span className="font-medium" style={{ color: COLORS.PAPER_WHITE }}>
            {name}
          </span>
        </div>

        {/* KY ID */}
        <div
          className="flex items-center justify-between rounded-lg px-3 py-2"
          style={{ background: `${COLORS.PAPER_WHITE}08` }}
        >
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4" style={{ color: COLORS.ELECTRIC_VIOLET }} />
            <span className="text-xs" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
              KY ID:
            </span>
            <code className="font-mono text-sm" style={{ color: COLORS.ACID_LIME }}>
              {kyId}
            </code>
          </div>
          <button
            onClick={() => handleCopy(kyId, "id")}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors hover:bg-white/10"
            style={{ color: COLORS.PAPER_WHITE }}
          >
            {copiedField === "id" ? (
              <>
                <Check className="h-3 w-3" style={{ color: COLORS.ACID_LIME }} />
                <span style={{ color: COLORS.ACID_LIME }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Email */}
        <div
          className="flex items-center justify-between rounded-lg px-3 py-2"
          style={{ background: `${COLORS.PAPER_WHITE}08` }}
        >
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" style={{ color: COLORS.ELECTRIC_BLUE }} />
            <span className="text-xs" style={{ color: `${COLORS.PAPER_WHITE}88` }}>
              Email:
            </span>
            <code className="font-mono text-sm" style={{ color: COLORS.ELECTRIC_BLUE }}>
              {email}
            </code>
          </div>
          <button
            onClick={() => handleCopy(email, "email")}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors hover:bg-white/10"
            style={{ color: COLORS.PAPER_WHITE }}
          >
            {copiedField === "email" ? (
              <>
                <Check className="h-3 w-3" style={{ color: COLORS.ACID_LIME }} />
                <span style={{ color: COLORS.ACID_LIME }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
