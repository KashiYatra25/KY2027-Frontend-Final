"use client";

import { ROYAL_COLORS } from "@/components/pages/login/constants/palette";

export function CardDescription() {
  return (
    <div className="relative z-10 mb-8">
      <div
        className="space-y-4 rounded-xl p-6 text-center"
        style={{
          background: `${ROYAL_COLORS.BG_DEEP}40`,
          border: `1px solid ${ROYAL_COLORS.GOLD}15`,
        }}
      >
        <p
          className="text-base leading-relaxed"
          style={{
            color: `${ROYAL_COLORS.CREAM}90`,
            fontFamily: "Georgia, serif",
          }}
        >
          Dive into{" "}
          <span style={{ color: ROYAL_COLORS.GOLD, fontWeight: 600 }}>
            IIT BHU&apos;s biggest fest
          </span>{" "}
          — three electric concert nights and three days packed with competitions and events in the
          heart of Varanasi.
        </p>

        <div className="flex items-center justify-center gap-2">
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: `${ROYAL_COLORS.CREAM}70`,
          }}
        >
          Sign in to register for events, book passes, and become part of
          <span style={{ color: ROYAL_COLORS.GOLD }}> Kashi Yatra 2027</span> — North India&apos;s
          grandest cultural extravaganza.
        </p>
      </div>
    </div>
  );
}
