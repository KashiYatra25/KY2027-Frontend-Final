"use client";

import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface ChoiceCardProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function ChoiceCard({ active, onClick, icon, title, desc }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all"
      style={{
        background: active
          ? `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}12 100%)`
          : `${COLORS.BG_DEEP}80`,
        border: active ? `1.5px solid ${COLORS.GOLD}70` : `1px solid ${COLORS.GOLD}20`,
        boxShadow: active ? `0 0 20px ${COLORS.GOLD}20` : "none",
      }}
    >
      <div className="flex w-full items-center justify-between">
        <span style={{ color: active ? COLORS.GOLD : `${COLORS.CREAM}60` }}>{icon}</span>
        {active && (
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
            style={{ background: COLORS.GOLD, color: COLORS.BG_DEEP }}
          >
            ✓
          </span>
        )}
      </div>
      <span
        className="text-base font-semibold"
        style={{ color: active ? COLORS.CREAM : `${COLORS.CREAM}80` }}
      >
        {title}
      </span>
      <span className="text-xs leading-relaxed" style={{ color: `${COLORS.CREAM}50` }}>
        {desc}
      </span>
    </button>
  );
}
