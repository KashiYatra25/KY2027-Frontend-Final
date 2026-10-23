"use client";

import { type Team } from "@/lib/api/hooks";
import { Users, Check, Loader2 } from "lucide-react";

const COLORS = {
  BG_CARD: "rgba(255, 255, 255, 0.03)",
  BORDER_SUBTLE: "rgba(255, 255, 255, 0.08)",
  GOLD: "#D4A853",
  GOLD_DIM: "rgba(212, 168, 83, 0.2)",
};

// Team option component
export function TeamOption({
  team,
  onSelect,
  isRegistering,
}: {
  team: Team;
  onSelect: (teamId: string) => void;
  isRegistering: boolean;
}) {
  return (
    <button
      onClick={() => onSelect(team.teamId)}
      disabled={isRegistering}
      className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-all hover:border-[#D4A853]/40 hover:bg-white/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        background: COLORS.BG_CARD,
        borderColor: COLORS.BORDER_SUBTLE,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: COLORS.GOLD_DIM }}
        >
          <Users className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </div>
        <div>
          <p className="font-medium text-white">{team.name}</p>
          <p className="text-xs text-white/50">
            {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      {isRegistering ? (
        <Loader2 className="h-5 w-5 animate-spin text-white/40" />
      ) : (
        <Check className="h-5 w-5 text-white/20" />
      )}
    </button>
  );
}
