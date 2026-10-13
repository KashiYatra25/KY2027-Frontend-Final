"use client";

import { useMyTeams } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { Users, Crown, ChevronRight } from "lucide-react";
import Link from "next/link";

export function MyTeamsSection() {
  const { teams, count, isLoading } = useMyTeams();

  if (isLoading) {
    return (
      <SectionWrapper title="My Teams" icon={<Users className="h-5 w-5" />}>
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-white/5" />
          ))}
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      title="My Teams"
      icon={<Users className="h-5 w-5" />}
      count={count}
      linkHref="/teams"
      linkText="Manage Teams"
    >
      {count === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
          <Users className="mx-auto mb-2 h-8 w-8 text-white/30" />
          <p className="text-sm text-white/50">You haven&apos;t joined any teams yet</p>
          <Link
            href="/teams"
            className="mt-3 inline-block text-sm font-medium"
            style={{ color: COLORS.GOLD }}
          >
            Create a Team →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {teams.slice(0, 3).map((team) => (
            <div
              key={team.teamId}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `${COLORS.GOLD}20` }}
                >
                  <Users className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                </div>
                <div>
                  <p className="font-medium text-white">{team.name}</p>
                  <p className="text-xs text-white/50">
                    {team.memberCount} members
                    {team.isCreator && (
                      <span className="ml-2" style={{ color: COLORS.GOLD }}>
                        <Crown className="inline h-3 w-3" /> Creator
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {count > 3 && (
            <p className="text-center text-xs text-white/40">
              +{count - 3} more team{count - 3 > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}

// Wrapper component for consistent section styling
function SectionWrapper({
  title,
  icon,
  count,
  linkHref,
  linkText,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  linkHref?: string;
  linkText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: COLORS.GOLD }}>{icon}</span>
          <h3 className="font-semibold text-white">{title}</h3>
          {count !== undefined && count > 0 && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
              {count}
            </span>
          )}
        </div>
        {linkHref && (
          <Link
            href={linkHref}
            className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white/80"
          >
            {linkText} <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
