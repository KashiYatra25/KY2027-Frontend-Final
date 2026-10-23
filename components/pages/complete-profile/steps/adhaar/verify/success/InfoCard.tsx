"use client";

import { type LucideIcon } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_DEEP}60 0%, ${COLORS.BG_ROYAL}60 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="rounded-lg p-2"
          style={{
            background: `${COLORS.GOLD}15`,
            border: `1px solid ${COLORS.GOLD}25`,
          }}
        >
          <Icon className="h-4 w-4" color={COLORS.GOLD} />
        </div>
        <div>
          <p className="mb-0.5 text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            {label}
          </p>
          <p className="font-medium" style={{ color: COLORS.CREAM }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
