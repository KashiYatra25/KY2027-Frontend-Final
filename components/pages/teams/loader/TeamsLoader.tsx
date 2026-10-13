"use client";

import { TEAMS_COLORS } from "@/components/pages/teams/constants/palette";

export function TeamsLoader() {
  return (
    <div className="space-y-4">
      {/* Skeleton cards */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border p-4"
          style={{
            background: TEAMS_COLORS.BG_CARD,
            borderColor: TEAMS_COLORS.BORDER_SUBTLE,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg"
              style={{ background: "rgba(255, 255, 255, 0.1)" }}
            />
            <div className="flex-1 space-y-2">
              <div
                className="h-4 w-32 rounded"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              />
              <div
                className="h-3 w-24 rounded"
                style={{ background: "rgba(255, 255, 255, 0.06)" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
