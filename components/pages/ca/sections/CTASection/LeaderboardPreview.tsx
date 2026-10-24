"use client";

import { useLeaderboard } from "@/lib/api/hooks/ca/useLeaderboard";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Medal, ChevronRight, Loader2 } from "lucide-react";
import { COLORS_RGBA } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// LEADERBOARD PREVIEW WIDGET
// Shows top 5 CAs on the CA page with link to full leaderboard
// ═══════════════════════════════════════════════════════════════════

export function LeaderboardPreview() {
  const { leaderboard, isLoading, isError } = useLeaderboard({
    page: 1,
    limit: 5,
    sortBy: "referrals",
    sortOrder: "desc",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
      </div>
    );
  }

  if (isError || leaderboard.length === 0) {
    return null; // Hide widget if no data
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30";
    if (rank === 3)
      return "bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30";
    return "bg-white/5 border-white/10";
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">Top Ambassadors</h3>
        </div>
        <Link
          href="/ca-dashboard"
          className="flex items-center gap-1 text-sm text-purple-400 transition-colors hover:text-purple-300"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all hover:scale-[1.02] ${getRankBg(entry.rank)}`}
          >
            {/* Rank */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>

            {/* Avatar */}
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
              {entry.avatarUrl ? (
                <Image src={entry.avatarUrl} alt={entry.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white/60">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{entry.name}</p>
              {entry.college && <p className="truncate text-xs text-gray-400">{entry.college}</p>}
            </div>

            {/* Referral Count */}
            <div className="text-right">
              <p className="text-lg font-bold text-purple-400">{entry.referralCount}</p>
              <p className="text-[10px] tracking-wide text-gray-500 uppercase">referrals</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Button */}
      <Link
        href="/ca-dashboard"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${COLORS_RGBA.PURPLE_50} 0%, ${COLORS_RGBA.PINK_30} 100%)`,
          border: `1px solid ${COLORS_RGBA.PURPLE_30}`,
        }}
      >
        <Trophy className="h-4 w-4 text-yellow-400" />
        <span className="text-white">View Full Leaderboard</span>
        <ChevronRight className="h-4 w-4 text-white/60" />
      </Link>
    </div>
  );
}
