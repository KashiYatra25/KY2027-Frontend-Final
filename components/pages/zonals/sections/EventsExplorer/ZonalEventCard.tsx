"use client";

// ═══════════════════════════════════════════════════════════════════
// ZONAL EVENT CARD
//
// Event card with registration functionality for college-specific pages.
// Shows register/cancel buttons based on user's pass status.
// ═══════════════════════════════════════════════════════════════════

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { COLORS } from "@/components/pages/zonals/constants/palette";
import { useMyZonalPasses, useZonalEventRegister, useZonalEventCancel } from "@/lib/api/hooks";
import type { ZonalEvent } from "@/components/pages/zonals/config/zonals.config";

// Per-category accent so each card reads at a glance.
function categoryAccent(category: string | undefined): string {
  const key = (category ?? "").trim().toUpperCase();
  const map: Record<string, string> = {
    DANCE: COLORS.HOT_PINK,
    MUSIC: COLORS.ELECTRIC_BLUE,
    ART: COLORS.SIGNAL_ORANGE,
    THEATRE: COLORS.ELECTRIC_VIOLET,
    LITERARY: COLORS.ACID_LIME,
    PERSONALITY: COLORS.HOT_PINK,
    QUIZ: COLORS.ACID_LIME,
  };
  return map[key] ?? COLORS.ELECTRIC_VIOLET;
}

interface Props {
  event: ZonalEvent;
  collegeSlug: string;
}

export function ZonalEventCard({ event, collegeSlug }: Props) {
  const { status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";

  const {
    hasPassFor,
    canRegisterAt,
    isRegisteredFor,
    getPassType,
    isLoading: passesLoading,
  } = useMyZonalPasses();
  const { register, isRegistering } = useZonalEventRegister(collegeSlug, event.slug);
  const { cancel, isCancelling } = useZonalEventCancel(collegeSlug, event.slug);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const accent = categoryAccent(event.category);

  const hasPass = hasPassFor(collegeSlug);
  const canRegister = canRegisterAt(collegeSlug);
  const isRegistered = isRegisteredFor(collegeSlug, event.slug);
  const passType = getPassType(collegeSlug);

  const handleRegister = () => {
    register();
  };

  const handleCancel = () => {
    if (showCancelConfirm) {
      cancel();
      setShowCancelConfirm(false);
    } else {
      setShowCancelConfirm(true);
    }
  };

  // Determine button state
  const renderButton = () => {
    if (!isAuthenticated) {
      return (
        <button
          disabled
          className="w-full rounded-lg px-4 py-2.5 text-sm font-bold uppercase opacity-50"
          style={{ background: `${COLORS.PAPER_WHITE}20`, color: COLORS.PAPER_WHITE }}
        >
          Login to Register
        </button>
      );
    }

    if (passesLoading) {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold uppercase"
          style={{ background: `${COLORS.PAPER_WHITE}20`, color: COLORS.PAPER_WHITE }}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </button>
      );
    }

    if (!hasPass) {
      return (
        <a
          href="#passes"
          className="block w-full rounded-lg px-4 py-2.5 text-center text-sm font-black tracking-wide uppercase transition-transform hover:scale-[1.02]"
          style={{
            background: COLORS.SIGNAL_ORANGE,
            color: COLORS.DEEP_INK,
            boxShadow: `0 6px 18px ${COLORS.SIGNAL_ORANGE}40`,
          }}
        >
          Get Pass First
        </a>
      );
    }

    if (isRegistered) {
      return (
        <div className="space-y-2">
          <div
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold uppercase"
            style={{ background: `${COLORS.ACID_LIME}20`, color: COLORS.ACID_LIME }}
          >
            <CheckCircle className="h-4 w-4" />
            Registered
          </div>
          {showCancelConfirm ? (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="flex-1 rounded-lg px-3 py-2 text-xs font-bold uppercase transition-colors"
                style={{ background: COLORS.HOT_PINK, color: COLORS.PAPER_WHITE }}
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancel"}
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 rounded-lg px-3 py-2 text-xs font-bold uppercase"
                style={{ background: `${COLORS.PAPER_WHITE}20`, color: COLORS.PAPER_WHITE }}
              >
                Keep
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full rounded-lg px-4 py-2 text-xs font-medium uppercase opacity-60 transition-opacity hover:opacity-100"
              style={{ color: COLORS.PAPER_WHITE }}
            >
              Cancel Registration
            </button>
          )}
        </div>
      );
    }

    if (!canRegister) {
      return (
        <button
          disabled
          className="w-full rounded-lg px-4 py-2.5 text-sm font-bold uppercase opacity-50"
          style={{ background: `${COLORS.PAPER_WHITE}20`, color: COLORS.PAPER_WHITE }}
        >
          {passType === "SINGLE_EVENT" ? "Single Event Used" : "Limit Reached"}
        </button>
      );
    }

    return (
      <button
        onClick={handleRegister}
        disabled={isRegistering}
        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-black tracking-wide uppercase transition-transform hover:scale-[1.02] disabled:opacity-50"
        style={{
          background: COLORS.ACID_LIME,
          color: COLORS.DEEP_INK,
          boxShadow: `0 6px 18px ${COLORS.ACID_LIME}40`,
        }}
      >
        {isRegistering ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Registering...
          </>
        ) : (
          "Register"
        )}
      </button>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-5"
      style={{
        background: `linear-gradient(160deg, ${COLORS.DEEP_INK} 0%, #16131f 100%)`,
        border: `1.5px solid ${isRegistered ? COLORS.ACID_LIME : `${accent}40`}`,
        boxShadow: isRegistered
          ? `0 0 0 1px ${COLORS.ACID_LIME}40, 0 10px 30px rgba(0,0,0,0.5)`
          : "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Accent top bar */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: isRegistered ? COLORS.ACID_LIME : accent }}
      />

      {/* Hover glow sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% -10%, ${accent}22 0%, transparent 65%)`,
        }}
      />

      {/* Decorative oversized corner glyph */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -bottom-4 text-7xl font-black opacity-[0.06] select-none"
        style={{ color: accent }}
      >
        ◆
      </span>

      {/* Registered badge */}
      {isRegistered && (
        <span
          className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase"
          style={{ background: COLORS.ACID_LIME, color: COLORS.DEEP_INK }}
        >
          <CheckCircle className="h-3 w-3" />
          Registered
        </span>
      )}

      {/* Category chip */}
      <span
        className="relative inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black tracking-[0.1em] uppercase"
        style={{
          background: `${accent}1f`,
          color: accent,
          border: `1px solid ${accent}55`,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        {event.category}
      </span>

      {/* Event name */}
      <h3
        className="relative mt-3 text-lg leading-tight font-black uppercase"
        style={{ color: COLORS.PAPER_WHITE }}
      >
        {event.name}
      </h3>

      {/* Register button (pinned to bottom) */}
      <div className="relative mt-auto pt-5">{renderButton()}</div>
    </motion.article>
  );
}
