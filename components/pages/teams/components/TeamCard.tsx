"use client";

import { useState } from "react";
import { type Team } from "@/lib/api/hooks";
import { TEAMS_COLORS } from "@/components/pages/teams/constants/palette";
import { Users, Crown, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-xl border transition-all"
      style={{
        background: TEAMS_COLORS.BG_CARD,
        borderColor: TEAMS_COLORS.BORDER_SUBTLE,
      }}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-3">
          {/* Team icon */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ background: TEAMS_COLORS.GOLD_DIM }}
          >
            <Users className="h-5 w-5" style={{ color: TEAMS_COLORS.GOLD }} />
          </div>

          <div>
            <h3 className="font-semibold text-white">{team.name}</h3>
            <p className="text-sm" style={{ color: TEAMS_COLORS.TEXT_MUTED }}>
              {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
              {team.isCreator && (
                <span
                  className="ml-2 inline-flex items-center gap-1 text-xs"
                  style={{ color: TEAMS_COLORS.GOLD }}
                >
                  <Crown className="h-3 w-3" />
                  Creator
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: TEAMS_COLORS.TEXT_MUTED }}>
            {team.teamId}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" style={{ color: TEAMS_COLORS.TEXT_MUTED }} />
          ) : (
            <ChevronDown className="h-5 w-5" style={{ color: TEAMS_COLORS.TEXT_MUTED }} />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t px-4 py-3" style={{ borderColor: TEAMS_COLORS.BORDER_SUBTLE }}>
          <p
            className="mb-3 text-xs font-medium tracking-wider uppercase"
            style={{ color: TEAMS_COLORS.TEXT_MUTED }}
          >
            Team Members
          </p>
          <div className="space-y-2">
            {team.members.map((member) => (
              <div
                key={member.userId}
                className="flex items-center gap-3 rounded-lg p-2"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                {/* Avatar */}
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10">
                  {member.candidatePhotoUrl || member.googleAvatarUrl ? (
                    <Image
                      src={member.candidatePhotoUrl ?? member.googleAvatarUrl ?? ""}
                      alt={member.firstName ?? "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-white/60">
                      {(member.firstName?.[0] ?? member.email[0]).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">
                    {member.firstName ?? "Unknown"} {member.lastName ?? ""}
                    {member.isYou && (
                      <span className="ml-2 text-xs" style={{ color: TEAMS_COLORS.GOLD }}>
                        (You)
                      </span>
                    )}
                  </p>
                  <p className="truncate text-xs" style={{ color: TEAMS_COLORS.TEXT_MUTED }}>
                    {member.email}
                  </p>
                </div>

                {/* Role indicator */}
                {member.userId === team.createdBy && (
                  <Crown className="h-4 w-4 flex-shrink-0" style={{ color: TEAMS_COLORS.GOLD }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
