"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ThemedNavbar } from "@/components/navbar";
import { useMyTeams, useMyAccount } from "@/lib/api/hooks";
import { TEAMS_COLORS } from "./constants/palette";
import { TeamCard } from "./components/TeamCard";
import { CreateTeamModal } from "./components/CreateTeamModal";
import { TeamsLoader } from "./loader/TeamsLoader";
import { EmptyTeamsState } from "./components/EmptyTeamsState";
import { Users, Plus, ShoppingCart } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// TEAMS PAGE CONTENT
// Shows user's teams and allows creating new ones
// ═══════════════════════════════════════════════════════════════════

export function TeamsPageContent() {
  const { data: session } = useSession();
  const { profile } = useMyAccount("full");
  // Use fresh profile data instead of stale session
  const isPaidUser = profile?.isPaidUser ?? false;
  const { teams, count, isLoading, isError, errorMessage, refetch } = useMyTeams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="min-h-screen px-4 pt-36 pb-20 sm:px-6 sm:pt-40 lg:pt-44"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
            linear-gradient(180deg, ${TEAMS_COLORS.BG_DEEP} 0%, ${TEAMS_COLORS.BG_ROYAL} 50%, ${TEAMS_COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="mx-auto max-w-4xl lg:max-w-5xl 2xl:max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="flex items-center justify-center gap-3 text-2xl font-bold text-white sm:justify-start sm:text-3xl">
                <Users className="h-7 w-7" style={{ color: TEAMS_COLORS.GOLD }} />
                My Teams
              </h1>
              <p
                className="mt-1 text-center text-sm sm:text-left"
                style={{ color: TEAMS_COLORS.TEXT_SECONDARY }}
              >
                Create and manage teams for event registrations
              </p>
            </div>

            {isPaidUser ? (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${TEAMS_COLORS.GOLD} 0%, ${TEAMS_COLORS.GOLD_LIGHT} 100%)`,
                  color: TEAMS_COLORS.BG_DEEP,
                }}
              >
                <Plus className="h-4 w-4" />
                Create Team
              </button>
            ) : (
              <Link
                href="/passes"
                className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: TEAMS_COLORS.GOLD + "50",
                  color: TEAMS_COLORS.GOLD,
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Pass to Create Teams
              </Link>
            )}
          </div>

          {/* Content */}
          {isLoading ? (
            <TeamsLoader />
          ) : isError ? (
            <div
              className="rounded-xl border p-8 text-center"
              style={{
                background: TEAMS_COLORS.BG_CARD,
                borderColor: TEAMS_COLORS.ERROR + "40",
              }}
            >
              <p className="text-red-400">{errorMessage ?? "Failed to load teams"}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 rounded-lg px-4 py-2 text-sm text-white underline"
              >
                Try again
              </button>
            </div>
          ) : count === 0 ? (
            <EmptyTeamsState
              onCreateClick={() => setIsCreateModalOpen(true)}
              isPaidUser={isPaidUser}
            />
          ) : (
            <div className="space-y-4">
              <p className="text-sm" style={{ color: TEAMS_COLORS.TEXT_MUTED }}>
                {count} team{count !== 1 ? "s" : ""} found
              </p>
              {teams.map((team) => (
                <TeamCard key={team.teamId} team={team} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Team Modal */}
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          refetch();
        }}
      />
    </>
  );
}
