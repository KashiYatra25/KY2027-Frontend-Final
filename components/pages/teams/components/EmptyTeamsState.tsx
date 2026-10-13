"use client";

import Link from "next/link";
import { TEAMS_COLORS } from "@/components/pages/teams/constants/palette";
import { Users, Plus, ShoppingCart } from "lucide-react";

interface EmptyTeamsStateProps {
  onCreateClick: () => void;
  isPaidUser?: boolean;
}

export function EmptyTeamsState({ onCreateClick, isPaidUser = false }: EmptyTeamsStateProps) {
  return (
    <div
      className="rounded-xl border p-12 text-center"
      style={{
        background: TEAMS_COLORS.BG_CARD,
        borderColor: TEAMS_COLORS.BORDER_SUBTLE,
      }}
    >
      <div
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: TEAMS_COLORS.GOLD_DIM }}
      >
        <Users className="h-8 w-8" style={{ color: TEAMS_COLORS.GOLD }} />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">No teams yet</h3>
      <p className="mb-6 text-sm" style={{ color: TEAMS_COLORS.TEXT_SECONDARY }}>
        {isPaidUser
          ? "Create a team to participate in duo and team events together with your friends."
          : "Purchase a pass to create teams and participate in duo and team events."}
      </p>

      {isPaidUser ? (
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${TEAMS_COLORS.GOLD} 0%, ${TEAMS_COLORS.GOLD_LIGHT} 100%)`,
            color: TEAMS_COLORS.BG_DEEP,
          }}
        >
          <Plus className="h-4 w-4" />
          Create Your First Team
        </button>
      ) : (
        <Link
          href="/passes"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${TEAMS_COLORS.GOLD} 0%, ${TEAMS_COLORS.GOLD_LIGHT} 100%)`,
            color: TEAMS_COLORS.BG_DEEP,
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Buy Pass to Create Teams
        </Link>
      )}
    </div>
  );
}
