"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useMyTeams, useEventRegisterTeam, type Team } from "@/lib/api/hooks";
import { X, Users, Check, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface TeamSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventSlug: string;
  eventName: string;
  eventType: "team" | "duo";
  minTeamSize?: number;
  maxTeamSize?: number;
}

const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#110a1f",
  BG_CARD: "rgba(255, 255, 255, 0.03)",
  BORDER_SUBTLE: "rgba(255, 255, 255, 0.08)",
  GOLD: "#D4A853",
  GOLD_LIGHT: "#E8C97A",
  GOLD_DIM: "rgba(212, 168, 83, 0.2)",
  TEXT_MUTED: "rgba(255, 255, 255, 0.5)",
  SUCCESS: "#22C55E",
  ERROR: "#EF4444",
};

export function TeamSelectorModal({
  isOpen,
  onClose,
  onSuccess,
  eventSlug,
  eventName,
  eventType,
  minTeamSize,
  maxTeamSize,
}: TeamSelectorModalProps) {
  const { teams, isLoading: isLoadingTeams, refetch } = useMyTeams();
  const { registerWithTeam, isRegistering, isSuccess, isError, errorMessage, reset } =
    useEventRegisterTeam(eventSlug);

  // Filter teams by size requirements
  const eligibleTeams = useMemo(() => {
    if (!teams.length) return [];

    if (eventType === "duo") {
      // Duo events need exactly 2 members
      return teams.filter((team) => team.memberCount === 2);
    }

    // Team events with size requirements
    if (minTeamSize || maxTeamSize) {
      return teams.filter((team) => {
        const meetsMin = !minTeamSize || team.memberCount >= minTeamSize;
        const meetsMax = !maxTeamSize || team.memberCount <= maxTeamSize;
        return meetsMin && meetsMax;
      });
    }

    return teams;
  }, [teams, eventType, minTeamSize, maxTeamSize]);

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleSelectTeam = useCallback(
    (teamId: string) => {
      registerWithTeam(teamId);
    },
    [registerWithTeam]
  );

  if (!isOpen) return null;

  const getSizeRequirementText = () => {
    if (eventType === "duo") return "exactly 2 members";
    if (minTeamSize && maxTeamSize) return `${minTeamSize}-${maxTeamSize} members`;
    if (minTeamSize) return `at least ${minTeamSize} members`;
    if (maxTeamSize) return `up to ${maxTeamSize} members`;
    return null;
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-xl border shadow-2xl"
        style={{
          background: COLORS.BG_ROYAL,
          borderColor: COLORS.BORDER_SUBTLE,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: COLORS.BORDER_SUBTLE }}
        >
          <div>
            <h2 className="text-lg font-semibold text-white">Select Team</h2>
            <p className="mt-0.5 text-sm text-white/60">{eventName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Size requirement notice */}
          {getSizeRequirementText() && (
            <div
              className="mb-4 flex items-start gap-2 rounded-lg border px-3 py-2 text-sm"
              style={{
                background: COLORS.GOLD_DIM,
                borderColor: COLORS.GOLD + "40",
                color: COLORS.GOLD_LIGHT,
              }}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                This {eventType} event requires teams with {getSizeRequirementText()}
              </span>
            </div>
          )}

          {/* Loading state */}
          {isLoadingTeams ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-white/40" />
            </div>
          ) : eligibleTeams.length === 0 ? (
            /* No eligible teams */
            <div className="py-6 text-center">
              <Users className="mx-auto mb-3 h-12 w-12 text-white/20" />
              <p className="mb-2 text-white/70">
                {teams.length === 0
                  ? "You don't have any teams yet"
                  : `No teams match the size requirement`}
              </p>
              <p className="mb-4 text-sm text-white/50">
                {eventType === "duo"
                  ? "Create a team with exactly 2 members to register"
                  : "Create a team with the required number of members"}
              </p>
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_LIGHT} 100%)`,
                  color: COLORS.BG_DEEP,
                }}
              >
                <Users className="h-4 w-4" />
                Create Team
              </Link>
            </div>
          ) : (
            /* Team list */
            <div className="space-y-2">
              <p className="mb-3 text-xs font-medium tracking-wider text-white/50 uppercase">
                Your Eligible Teams ({eligibleTeams.length})
              </p>
              {eligibleTeams.map((team) => (
                <TeamOption
                  key={team.teamId}
                  team={team}
                  onSelect={handleSelectTeam}
                  isRegistering={isRegistering}
                />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && <p className="mt-4 text-sm text-red-400">{errorMessage}</p>}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t px-5 py-4"
          style={{ borderColor: COLORS.BORDER_SUBTLE }}
        >
          <Link href="/teams" className="text-sm text-white/60 hover:text-white/80">
            Manage Teams
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Team option component
function TeamOption({
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
