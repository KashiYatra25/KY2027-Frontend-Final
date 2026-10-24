"use client";

import { useRef, useEffect } from "react";
import { useLeaderboard } from "@/lib/api/hooks/ca/useLeaderboard";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Medal, ChevronRight, Users, Sparkles } from "lucide-react";
import { COLORS, COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// LEADERBOARD SECTION
// Shows top CAs to inspire visitors before the CTA
// ═══════════════════════════════════════════════════════════════════

export function LeaderboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { leaderboard, isLoading, isError } = useLeaderboard({
    page: 1,
    limit: 5,
    sortBy: "referrals",
    sortOrder: "desc",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".leaderboard-title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate cards with stagger
      gsap.from(".leaderboard-card", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".leaderboard-list",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [leaderboard]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-300" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
  };

  const getRankStyles = (rank: number) => {
    if (rank === 1)
      return {
        bg: "bg-gradient-to-r from-yellow-500/20 via-amber-500/15 to-yellow-500/20",
        border: "border-yellow-500/40",
        glow: "shadow-[0_0_30px_rgba(234,179,8,0.15)]",
      };
    if (rank === 2)
      return {
        bg: "bg-gradient-to-r from-gray-400/15 via-slate-400/10 to-gray-400/15",
        border: "border-gray-400/30",
        glow: "",
      };
    if (rank === 3)
      return {
        bg: "bg-gradient-to-r from-amber-600/15 via-orange-500/10 to-amber-600/15",
        border: "border-amber-600/30",
        glow: "",
      };
    return {
      bg: "bg-white/5",
      border: "border-white/10",
      glow: "",
    };
  };

  // Don't render if error
  if (isError) {
    return null;
  }

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-white/10" />
      <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-white/10 md:h-16 md:w-16" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
      </div>
      <div className="space-y-1 text-right">
        <div className="h-8 w-12 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative px-4 py-20 md:py-28">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS_RGBA.PURPLE_30} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="leaderboard-title mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Our Champions</span>
          </div>

          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Top <span className="ca-gradient-text">Campus Ambassadors</span>
          </h2>

          <p className="mx-auto max-w-2xl text-gray-400">
            Meet the leaders who are spreading the word about Kashi Yatra 2027. Join them and make
            your mark!
          </p>
        </div>

        {/* Leaderboard Container with blur background */}
        <div
          className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl md:p-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS_RGBA.PURPLE_20} 0%, rgba(10, 6, 18, 0.8) 50%, ${COLORS_RGBA.PINK_10} 100%)`,
          }}
        >
          {isLoading ? (
            <div className="leaderboard-list space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p>No ambassadors yet. Be the first!</p>
            </div>
          ) : (
            <div className="leaderboard-list space-y-3">
              {leaderboard.map((entry) => {
                const styles = getRankStyles(entry.rank);
                return (
                  <div
                    key={entry.id}
                    className={`leaderboard-card flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] md:p-5 ${styles.bg} ${styles.border} ${styles.glow}`}
                  >
                    {/* Rank */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/20">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white/10 md:h-16 md:w-16">
                      {entry.avatarUrl ? (
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white/60">
                          {entry.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-lg font-bold text-white">{entry.name}</p>
                      {entry.college && (
                        <p className="truncate text-sm text-gray-400">{entry.college}</p>
                      )}
                    </div>

                    {/* Referral Count */}
                    <div className="text-right">
                      <p className="text-2xl font-black text-purple-400 md:text-3xl">
                        {entry.referralCount}
                      </p>
                      <p className="text-xs tracking-wider text-gray-500 uppercase">referrals</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* View Full Leaderboard */}
          <div className="mt-8 text-center">
            <Link
              href="/ca-dashboard"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: GRADIENTS.PURPLE_PINK,
              }}
            >
              <Users className="h-5 w-5" />
              <span>View Full Leaderboard</span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
