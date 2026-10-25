"use client";

import { useSession } from "next-auth/react";
import { useMyZonalPasses } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/zonals/constants/palette";
import { CheckCircle, Ticket, Sparkles, AlertCircle } from "lucide-react";
import type { ZonalCollege } from "@/components/pages/zonals/config/zonals.config";

// ═══════════════════════════════════════════════════════════════════
// YOUR PASS STATUS
// Shows user's current zonal pass status for this college
// ═══════════════════════════════════════════════════════════════════

interface Props {
  college: ZonalCollege;
  className?: string;
}

export function YourPassStatus({ college, className = "" }: Props) {
  const { status: sessionStatus } = useSession();
  const { getCollegeData, isLoading } = useMyZonalPasses();

  const isAuthenticated = sessionStatus === "authenticated";
  const collegeData = getCollegeData(college.slug);

  // Not logged in - don't show anything
  if (!isAuthenticated) return null;

  // Loading
  if (isLoading) {
    return (
      <div className={`mx-auto max-w-2xl ${className}`}>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
          <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-48 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  // No pass yet
  if (!collegeData || collegeData.passes.length === 0) {
    return (
      <div className={`mx-auto max-w-2xl ${className}`}>
        <div
          className="flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, rgba(100, 100, 100, 0.1), rgba(50, 50, 50, 0.2))`,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            <Ticket className="h-6 w-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400">No Pass Yet</p>
            <p className="text-xs text-gray-500">Get your pass below to register for events!</p>
          </div>
        </div>
      </div>
    );
  }

  // Has pass - determine type
  const hasMultiPass = collegeData.eventLimit === -1;
  const registeredCount = collegeData.registeredEvents.length;
  const eventLimit = collegeData.eventLimit;

  if (hasMultiPass) {
    // Multi Event Pass
    return (
      <div className={`mx-auto max-w-2xl ${className}`}>
        <div
          className="flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))`,
            borderColor: "rgba(139, 92, 246, 0.3)",
          }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(139, 92, 246, 0.2)" }}
          >
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-purple-300">Multi Event Pass</p>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">
              Unlimited access • {registeredCount} event{registeredCount !== 1 ? "s" : ""}{" "}
              registered
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-400">∞</p>
            <p className="text-[10px] tracking-wide text-gray-500 uppercase">events</p>
          </div>
        </div>
      </div>
    );
  }

  // Single Event Pass
  const eventsRemaining = Math.max(0, eventLimit - registeredCount);
  const isUsed = eventsRemaining === 0;

  return (
    <div className={`mx-auto max-w-2xl ${className}`}>
      <div
        className="flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm"
        style={{
          background: isUsed
            ? `linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(100, 50, 50, 0.15))`
            : `linear-gradient(135deg, rgba(${COLORS.ACID_LIME}, 0.1), rgba(100, 120, 50, 0.15))`.replace(
                "ACID_LIME",
                "163, 230, 53"
              ),
          borderColor: isUsed ? "rgba(239, 68, 68, 0.3)" : "rgba(163, 230, 53, 0.3)",
        }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ background: isUsed ? "rgba(239, 68, 68, 0.2)" : "rgba(163, 230, 53, 0.2)" }}
        >
          {isUsed ? (
            <AlertCircle className="h-6 w-6 text-red-400" />
          ) : (
            <Ticket className="h-6 w-6" style={{ color: COLORS.ACID_LIME }} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className={`font-semibold ${isUsed ? "text-red-300" : "text-lime-300"}`}>
              Single Event Pass
            </p>
            {!isUsed && <CheckCircle className="h-4 w-4 text-green-400" />}
          </div>
          <p className="text-sm text-gray-400">
            {isUsed
              ? "Pass used • Upgrade to Multi Event for more!"
              : `${registeredCount} registered • ${eventsRemaining} slot remaining`}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${isUsed ? "text-red-400" : "text-lime-400"}`}>
            {eventsRemaining}
          </p>
          <p className="text-[10px] tracking-wide text-gray-500 uppercase">left</p>
        </div>
      </div>
    </div>
  );
}
