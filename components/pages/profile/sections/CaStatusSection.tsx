"use client";

import Link from "next/link";
import { Rocket, Clock, CheckCircle, XCircle, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { COLORS } from "@/components/pages/profile/constants/palette";
import type { CAApplicationStatus } from "@/lib/api/helper/types/ca.types";

// ═══════════════════════════════════════════════════════════════════
// CA STATUS SECTION
// Shows CA application status and profile info in profile page
// ═══════════════════════════════════════════════════════════════════

interface CaStatusSectionProps {
  hasApplied: boolean;
  applicationStatus: CAApplicationStatus | null;
  appliedAt: string | null;
  referralId: string | null;
  numberOfReferrals: number | null;
}

export function CaStatusSection({
  hasApplied,
  applicationStatus,
  appliedAt,
  referralId,
  numberOfReferrals,
}: CaStatusSectionProps) {
  const [copied, setCopied] = useState(false);

  // Don't show anything if user hasn't applied
  if (!hasApplied) {
    return null;
  }

  const copyReferralId = async () => {
    if (referralId) {
      await navigator.clipboard.writeText(referralId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const statusConfig = {
    PENDING: {
      icon: Clock,
      title: "Application Under Review",
      description: "Your CA application is being reviewed by our team.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      iconBg: "bg-yellow-500",
      textColor: "text-yellow-400",
    },
    ACCEPTED: {
      icon: CheckCircle,
      title: "Campus Ambassador",
      description: "You are an official Kashi Yatra 2027 Campus Ambassador!",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500",
      textColor: "text-green-400",
    },
    REJECTED: {
      icon: XCircle,
      title: "Application Not Selected",
      description: "Your application was not selected this time.",
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      iconBg: "bg-red-500",
      textColor: "text-red-400",
    },
  };

  const config = applicationStatus ? statusConfig[applicationStatus] : statusConfig.PENDING;
  const StatusIcon = config.icon;

  return (
    <div
      className="mt-8 overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BG_WINE}80 0%, ${COLORS.BG_ROYAL}90 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
        boxShadow: `0 0 40px ${COLORS.GOLD}05, 0 15px 35px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{
          borderBottom: `1px solid ${COLORS.GOLD}15`,
          background: `linear-gradient(90deg, ${COLORS.GOLD}08, transparent)`,
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
          }}
        >
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3
            className="text-lg font-semibold"
            style={{
              background: `linear-gradient(135deg, ${COLORS.CREAM}, ${COLORS.GOLD_LIGHT})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Campus Ambassador
          </h3>
          <p className="text-xs text-gray-400">
            {appliedAt &&
              `Applied ${new Date(appliedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`}
          </p>
        </div>
      </div>

      {/* Status Card */}
      <div className="p-6">
        <div
          className={`rounded-xl border bg-gradient-to-br p-4 ${config.gradient} ${config.borderColor}`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
            >
              <StatusIcon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${config.textColor}`}>{config.title}</h4>
              <p className="mt-1 text-sm text-gray-400">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Referral Info - Only for ACCEPTED */}
        {applicationStatus === "ACCEPTED" && referralId && (
          <div className="mt-4 space-y-3">
            {/* Referral ID */}
            <div
              className="flex items-center justify-between rounded-xl p-4"
              style={{
                background: `${COLORS.GOLD}08`,
                border: `1px solid ${COLORS.GOLD}20`,
              }}
            >
              <div>
                <p className="text-xs text-gray-400">Your Referral ID</p>
                <p className="mt-1 font-mono text-lg font-bold" style={{ color: COLORS.GOLD }}>
                  {referralId}
                </p>
              </div>
              <button
                onClick={copyReferralId}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-white/5"
                style={{ color: COLORS.GOLD }}
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Referral Stats */}
            <div
              className="flex items-center justify-between rounded-xl p-4"
              style={{
                background: `${COLORS.GOLD}08`,
                border: `1px solid ${COLORS.GOLD}20`,
              }}
            >
              <div>
                <p className="text-xs text-gray-400">Total Referrals</p>
                <p className="mt-1 text-2xl font-bold" style={{ color: COLORS.GOLD_LIGHT }}>
                  {numberOfReferrals ?? 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4">
          <Link
            href={
              applicationStatus === "REJECTED"
                ? "/campus-ambassador/application"
                : applicationStatus === "ACCEPTED"
                  ? "/ca-dashboard"
                  : "/campus-ambassador"
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
              border: `1px solid ${COLORS.GOLD}30`,
              color: COLORS.GOLD,
            }}
          >
            {applicationStatus === "REJECTED"
              ? "View Details"
              : applicationStatus === "ACCEPTED"
                ? "View CA Dashboard"
                : "View Application Status"}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
