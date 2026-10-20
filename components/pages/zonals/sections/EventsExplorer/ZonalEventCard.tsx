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
          className="block w-full rounded-lg px-4 py-2.5 text-center text-sm font-bold uppercase transition-transform hover:scale-[1.02]"
          style={{ background: COLORS.SIGNAL_ORANGE, color: COLORS.DEEP_INK }}
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
        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold uppercase transition-transform hover:scale-[1.02] disabled:opacity-50"
        style={{ background: COLORS.ACID_LIME, color: COLORS.DEEP_INK }}
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
      className="group relative overflow-hidden rounded-2xl p-5"
      style={{
        background: COLORS.DEEP_INK,
        border: `2px solid ${isRegistered ? COLORS.ACID_LIME : `${COLORS.PAPER_WHITE}20`}`,
      }}
    >
      {/* Registered badge */}
      {isRegistered && (
        <span
          className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
          style={{ background: COLORS.ACID_LIME, color: COLORS.DEEP_INK }}
        >
          Registered
        </span>
      )}

      {/* Category chip */}
      <span
        className="inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
        style={{
          background: `${COLORS.ELECTRIC_VIOLET}30`,
          color: COLORS.ELECTRIC_VIOLET,
        }}
      >
        {event.category}
      </span>

      {/* Event name */}
      <h3
        className="mt-3 text-lg leading-tight font-black uppercase"
        style={{ color: COLORS.PAPER_WHITE }}
      >
        {event.name}
      </h3>

      {/* Register button */}
      <div className="mt-4">{renderButton()}</div>
    </motion.article>
  );
}
