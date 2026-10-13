"use client";

import { BadgeCheck, type LucideIcon } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// INFO CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function InfoCard({
  icon: Icon,
  label,
  value,
  isVerified,
}: {
  icon: LucideIcon;
  label: string;
  value: string | null;
  isVerified?: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="shrink-0 rounded-xl p-3.5 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
            border: `1px solid ${COLORS.GOLD}25`,
            boxShadow: `0 4px 15px ${COLORS.GOLD}10`,
          }}
        >
          <Icon className="h-5 w-5" color={COLORS.GOLD} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
            style={{ color: `${COLORS.GOLD}80` }}
          >
            {label}
            {isVerified && <BadgeCheck className="h-3.5 w-3.5" color={COLORS.SUCCESS} />}
          </p>
          <p
            className="truncate text-base font-medium"
            style={{ color: value ? COLORS.CREAM : `${COLORS.CREAM}40` }}
          >
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}
