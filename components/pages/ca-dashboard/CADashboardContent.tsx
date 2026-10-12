"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ThemedNavbar } from "@/components/navbar";
import { useLeaderboard, type SortField, type SortOrder } from "@/lib/api/hooks/ca/useLeaderboard";
import { COLORS } from "@/components/pages/profile/constants/palette";
import {
  Trophy,
  Crown,
  Users,
  TrendingUp,
  Loader2,
  RefreshCw,
  User,
  Medal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// CA DASHBOARD PAGE
// Leaderboard with pagination, sorting, wine/gold theme
// ═══════════════════════════════════════════════════════════════════

export function CADashboardContent() {
  // Pagination & sorting state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<SortField>("referrals");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { leaderboard, pagination, isLoading, isError, errorMessage, refetch } = useLeaderboard({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  useEffect(() => {
    // Animate leaderboard entries on load
    if (leaderboard.length > 0 && !isLoading) {
      gsap.fromTo(
        ".leaderboard-entry",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }
  }, [leaderboard, isLoading]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder(field === "referrals" ? "desc" : "asc");
    }
    setPage(1); // Reset to first page on sort change
  };

  const getSortIcon = (field: SortField) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />;
    }
    return sortOrder === "desc" ? (
      <ArrowDown className="h-3.5 w-3.5" />
    ) : (
      <ArrowUp className="h-3.5 w-3.5" />
    );
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5" style={{ color: COLORS.GOLD_SHIMMER }} />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-300" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankDisplay = (rank: number) => {
    const icon = getRankIcon(rank);
    const isTopThree = rank <= 3;

    return (
      <div className="flex items-center justify-center gap-1.5">
        <span
          className="text-base font-bold"
          style={{ color: isTopThree ? COLORS.GOLD_LIGHT : `${COLORS.GOLD}90` }}
        >
          #{rank}
        </span>
        {icon}
      </div>
    );
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return `linear-gradient(90deg, ${COLORS.GOLD}25 0%, transparent 100%)`;
      case 2:
        return `linear-gradient(90deg, rgba(192, 192, 192, 0.15) 0%, transparent 100%)`;
      case 3:
        return `linear-gradient(90deg, rgba(205, 127, 50, 0.15) 0%, transparent 100%)`;
      default:
        return "transparent";
    }
  };

  const getRankBorder = (rank: number) => {
    switch (rank) {
      case 1:
        return `${COLORS.GOLD}50`;
      case 2:
        return "rgba(192, 192, 192, 0.3)";
      case 3:
        return "rgba(205, 127, 50, 0.3)";
      default:
        return `${COLORS.GOLD}15`;
    }
  };

  // Page number buttons
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const { totalPages } = pagination;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
          linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
        `,
      }}
    >
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      {/* Main content - Added more top padding and centered vertically */}
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Trophy className="h-12 w-12" style={{ color: COLORS.GOLD }} />
              <h1
                className="text-5xl font-bold tracking-tight sm:text-6xl"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CA Leaderboard
              </h1>
            </div>
            <p className="text-lg" style={{ color: `${COLORS.CREAM}70` }}>
              Top Campus Ambassadors ranked by referrals
            </p>
          </div>

          {/* Stats row */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <div
              className="flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{
                background: `${COLORS.GOLD}10`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <Users className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              <span style={{ color: `${COLORS.CREAM}90` }}>
                <span className="font-semibold" style={{ color: COLORS.GOLD_LIGHT }}>
                  {pagination.totalCount}
                </span>{" "}
                Ambassadors
              </span>
            </div>
            <div
              className="flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{
                background: `${COLORS.GOLD}10`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              <span style={{ color: `${COLORS.CREAM}90` }}>
                <span className="font-semibold" style={{ color: COLORS.GOLD_LIGHT }}>
                  {leaderboard.reduce((sum, ca) => sum + ca.referralCount, 0)}
                </span>{" "}
                Referrals (this page)
              </span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                background: `${COLORS.GOLD}10`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                style={{ color: COLORS.GOLD }}
              />
              <span style={{ color: `${COLORS.CREAM}90` }}>Refresh</span>
            </button>
          </div>

          {/* Leaderboard Table */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.BG_WINE}80 0%, ${COLORS.BG_ROYAL}90 100%)`,
              border: `1px solid ${COLORS.GOLD}20`,
              boxShadow: `0 0 60px ${COLORS.GOLD}08, 0 20px 50px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Table header with sorting */}
            <div
              className="grid grid-cols-[50px_1fr_100px] gap-4 px-6 py-4 sm:grid-cols-[70px_1fr_200px_120px]"
              style={{
                borderBottom: `1px solid ${COLORS.GOLD}15`,
                background: `linear-gradient(90deg, ${COLORS.GOLD}08, transparent)`,
              }}
            >
              <div
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: `${COLORS.GOLD}80` }}
              >
                Rank
              </div>
              <button
                onClick={() => handleSort("name")}
                className="flex items-center gap-1.5 text-left text-xs font-semibold tracking-wider uppercase transition-opacity hover:opacity-80"
                style={{ color: `${COLORS.GOLD}80` }}
              >
                Ambassador {getSortIcon("name")}
              </button>
              <button
                onClick={() => handleSort("college")}
                className="hidden items-center gap-1.5 text-left text-xs font-semibold tracking-wider uppercase transition-opacity hover:opacity-80 sm:flex"
                style={{ color: `${COLORS.GOLD}80` }}
              >
                College {getSortIcon("college")}
              </button>
              <button
                onClick={() => handleSort("referrals")}
                className="flex items-center justify-end gap-1.5 text-right text-xs font-semibold tracking-wider uppercase transition-opacity hover:opacity-80"
                style={{ color: `${COLORS.GOLD}80` }}
              >
                Referrals {getSortIcon("referrals")}
              </button>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: COLORS.GOLD }} />
                <span className="ml-3" style={{ color: `${COLORS.CREAM}60` }}>
                  Loading leaderboard...
                </span>
              </div>
            )}

            {/* Error state */}
            {isError && !isLoading && (
              <div className="py-24 text-center">
                <p style={{ color: COLORS.ERROR }}>{errorMessage}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 rounded-lg px-4 py-2 text-sm transition-colors hover:opacity-80"
                  style={{
                    background: `${COLORS.GOLD}15`,
                    border: `1px solid ${COLORS.GOLD}30`,
                    color: COLORS.GOLD,
                  }}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !isError && leaderboard.length === 0 && (
              <div className="py-24 text-center">
                <Trophy className="mx-auto mb-4 h-12 w-12" style={{ color: `${COLORS.GOLD}30` }} />
                <p style={{ color: `${COLORS.CREAM}40` }}>No ambassadors yet. Be the first!</p>
              </div>
            )}

            {/* Leaderboard entries */}
            {!isLoading && !isError && leaderboard.length > 0 && (
              <div>
                {leaderboard.map((entry) => (
                  <div
                    key={entry.id}
                    className="leaderboard-entry grid grid-cols-[50px_1fr_100px] items-center gap-4 px-6 py-4 transition-all duration-200 hover:opacity-90 sm:grid-cols-[70px_1fr_200px_120px]"
                    style={{
                      background: getRankBackground(entry.rank),
                      borderBottom: `1px solid ${COLORS.GOLD}08`,
                      borderLeft: `3px solid ${getRankBorder(entry.rank)}`,
                    }}
                  >
                    {/* Rank */}
                    <div className="flex items-center justify-center">
                      {getRankDisplay(entry.rank)}
                    </div>

                    {/* Ambassador info */}
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full"
                        style={{
                          border: `2px solid ${entry.rank <= 3 ? COLORS.GOLD : COLORS.GOLD + "40"}`,
                        }}
                      >
                        {entry.avatarUrl ? (
                          <Image
                            src={entry.avatarUrl}
                            alt={entry.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${COLORS.BG_WINE}, ${COLORS.PURPLE_DEEP})`,
                            }}
                          >
                            <User className="h-5 w-5" style={{ color: `${COLORS.CREAM}60` }} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="truncate font-medium"
                          style={{
                            color: entry.rank <= 3 ? COLORS.GOLD_LIGHT : COLORS.CREAM,
                          }}
                        >
                          {entry.name}
                        </p>
                        <p
                          className="truncate text-xs sm:hidden"
                          style={{ color: `${COLORS.CREAM}50` }}
                        >
                          {entry.college || "—"}
                        </p>
                      </div>
                    </div>

                    {/* College (hidden on mobile) */}
                    <div
                      className="hidden truncate text-sm sm:block"
                      style={{ color: `${COLORS.CREAM}60` }}
                    >
                      {entry.college || "—"}
                    </div>

                    {/* Referral count */}
                    <div className="text-right">
                      <span
                        className="text-xl font-bold"
                        style={{
                          color: entry.rank <= 3 ? COLORS.GOLD_LIGHT : COLORS.GOLD,
                        }}
                      >
                        {entry.referralCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && !isError && pagination.totalPages > 1 && (
              <div
                className="flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row"
                style={{
                  borderTop: `1px solid ${COLORS.GOLD}15`,
                  background: `${COLORS.GOLD}05`,
                }}
              >
                {/* Page size selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: `${COLORS.CREAM}60` }}>
                    Show
                  </span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="rounded-lg px-3 py-1.5 text-sm outline-none"
                    style={{
                      background: `${COLORS.BG_WINE}`,
                      border: `1px solid ${COLORS.GOLD}30`,
                      color: COLORS.CREAM,
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm" style={{ color: `${COLORS.CREAM}60` }}>
                    per page
                  </span>
                </div>

                {/* Page info */}
                <div className="text-sm" style={{ color: `${COLORS.CREAM}60` }}>
                  Page {pagination.page} of {pagination.totalPages} ({pagination.totalCount} total)
                </div>

                {/* Page navigation */}
                <div className="flex items-center gap-1">
                  {/* First page */}
                  <button
                    onClick={() => setPage(1)}
                    disabled={!pagination.hasPrevPage}
                    className="rounded-lg p-2 transition-all hover:opacity-80 disabled:opacity-30"
                    style={{
                      background: `${COLORS.GOLD}10`,
                      border: `1px solid ${COLORS.GOLD}20`,
                    }}
                  >
                    <ChevronsLeft className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                  </button>

                  {/* Previous page */}
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.hasPrevPage}
                    className="rounded-lg p-2 transition-all hover:opacity-80 disabled:opacity-30"
                    style={{
                      background: `${COLORS.GOLD}10`,
                      border: `1px solid ${COLORS.GOLD}20`,
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1 px-2">
                    {getPageNumbers().map((pageNum, idx) =>
                      pageNum === "..." ? (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-2"
                          style={{ color: `${COLORS.CREAM}40` }}
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum as number)}
                          className="min-w-[36px] rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
                          style={{
                            background: page === pageNum ? COLORS.GOLD : `${COLORS.GOLD}10`,
                            color: page === pageNum ? COLORS.BG_DEEP : COLORS.GOLD,
                            border: `1px solid ${page === pageNum ? COLORS.GOLD : COLORS.GOLD + "20"}`,
                          }}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next page */}
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={!pagination.hasNextPage}
                    className="rounded-lg p-2 transition-all hover:opacity-80 disabled:opacity-30"
                    style={{
                      background: `${COLORS.GOLD}10`,
                      border: `1px solid ${COLORS.GOLD}20`,
                    }}
                  >
                    <ChevronRight className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                  </button>

                  {/* Last page */}
                  <button
                    onClick={() => setPage(pagination.totalPages)}
                    disabled={!pagination.hasNextPage}
                    className="rounded-lg p-2 transition-all hover:opacity-80 disabled:opacity-30"
                    style={{
                      background: `${COLORS.GOLD}10`,
                      border: `1px solid ${COLORS.GOLD}20`,
                    }}
                  >
                    <ChevronsRight className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-sm" style={{ color: `${COLORS.CREAM}40` }}>
            Leaderboard updates in real-time. Share your referral ID to climb the ranks!
          </p>
        </div>
      </main>
    </div>
  );
}
