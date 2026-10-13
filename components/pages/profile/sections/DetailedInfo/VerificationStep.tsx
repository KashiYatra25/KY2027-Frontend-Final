"use client";

import { CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// VERIFICATION STEP ITEM
// ═══════════════════════════════════════════════════════════════════
export function VerificationStep({
  icon: Icon,
  label,
  isCompleted,
  description,
}: {
  icon: LucideIcon;
  label: string;
  isCompleted: boolean;
  description: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl p-4 transition-all duration-300"
      style={{
        background: isCompleted ? `${COLORS.SUCCESS}08` : `${COLORS.ERROR}05`,
        border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}30` : `${COLORS.ERROR}20`}`,
      }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: isCompleted
            ? `linear-gradient(135deg, ${COLORS.SUCCESS}20, ${COLORS.SUCCESS}10)`
            : `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
          border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}40` : `${COLORS.GOLD}25`}`,
        }}
      >
        <Icon className="h-5 w-5" color={isCompleted ? COLORS.SUCCESS : COLORS.GOLD} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className="font-semibold"
            style={{ color: isCompleted ? COLORS.SUCCESS : COLORS.CREAM }}
          >
            {label}
          </p>
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4" color={COLORS.SUCCESS} />
          ) : (
            <XCircle className="h-4 w-4" color={COLORS.ERROR} />
          )}
        </div>
        <p className="text-sm" style={{ color: `${COLORS.CREAM}50` }}>
          {description}
        </p>
      </div>
    </div>
  );
}
