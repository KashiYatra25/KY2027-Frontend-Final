"use client";

import { memo, useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { SubEvent } from "@/lib/api/helper/types";
import { useEventRegisterIndividual } from "@/lib/api/hooks";
import { TeamSelectorModal } from "./TeamSelectorModal";
import { Loader2, Users, Clock, Sparkles, ChevronRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// TYPE BADGE CONFIG
// ═══════════════════════════════════════════════════════════════════

const TYPE_CONFIG = {
  individual: {
    label: "Individual",
    gradient: "linear-gradient(135deg, #FF1493 0%, #DB2777 100%)",
    glow: "rgba(255, 20, 147, 0.4)",
    textColor: "#FDF6E3",
  },
  duo: {
    label: "Duo",
    gradient: "linear-gradient(135deg, #00D4FF 0%, #0EA5E9 100%)",
    glow: "rgba(0, 212, 255, 0.4)",
    textColor: "#FDF6E3",
  },
  team: {
    label: "Team",
    gradient: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)",
    glow: "rgba(168, 85, 247, 0.4)",
    textColor: "#FDF6E3",
  },
};

// ═══════════════════════════════════════════════════════════════════
// SUB-EVENT CARD COMPONENT - FESTIVE DESIGN
// ═══════════════════════════════════════════════════════════════════

interface SubEventCardProps {
  event: SubEvent;
  categoryColor: string;
  index: number;
  eventSlug?: string;
  isRegistered?: boolean;
  onRegistrationSuccess?: () => void;
  canRegister?: boolean;
}

export const SubEventCard = memo(function SubEventCard({
  event,
  categoryColor,
  index,
  eventSlug,
  isRegistered = false,
  onRegistrationSuccess,
  canRegister = true,
}: SubEventCardProps) {
  const typeConfig = TYPE_CONFIG[event.type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.individual;

  const [showTeamModal, setShowTeamModal] = useState(false);
  const hasCalledSuccessRef = useRef(false);

  const slug = event.slug ?? eventSlug ?? event.id;

  const {
    register: registerIndividual,
    isRegistering,
    isSuccess,
    isError,
    errorMessage,
    reset,
  } = useEventRegisterIndividual(slug);

  useEffect(() => {
    if (isSuccess && !hasCalledSuccessRef.current) {
      hasCalledSuccessRef.current = true;
      onRegistrationSuccess?.();
    }
  }, [isSuccess, onRegistrationSuccess]);

  useEffect(() => {
    if (!isSuccess) {
      hasCalledSuccessRef.current = false;
    }
  }, [isSuccess]);

  const handleRegisterClick = useCallback(() => {
    if (!event.registrationOpen || isRegistered || !canRegister) return;

    if (event.type === "team" || event.type === "duo") {
      setShowTeamModal(true);
      return;
    }

    registerIndividual();
  }, [event.registrationOpen, event.type, isRegistered, canRegister, registerIndividual]);

  const handleTeamRegisterSuccess = useCallback(() => {
    setShowTeamModal(false);
    onRegistrationSuccess?.();
  }, [onRegistrationSuccess]);

  const showAsRegistered = isRegistered || isSuccess;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        className="group relative flex h-full flex-col"
      >
        {/* Card Container - uses flex to maintain equal heights */}
        <div
          className="relative flex flex-1 flex-col overflow-hidden rounded-2xl transition-all duration-500 sm:hover:-translate-y-2 sm:hover:scale-[1.02]"
          style={{
            background: `linear-gradient(160deg, 
              hsl(from ${categoryColor} h s 12% / 0.95) 0%,
              hsl(from ${categoryColor} h s 6% / 0.98) 40%,
              hsl(from ${categoryColor} h s 8% / 0.95) 100%
            )`,
            border: `2px solid ${categoryColor}35`,
            boxShadow: `
              0 10px 40px rgba(0,0,0,0.4),
              0 0 0 1px ${categoryColor}10,
              inset 0 1px 0 ${categoryColor}15
            `,
          }}
        >
          {/* Outer glow on hover - wraps the card */}
          <div
            className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}60, ${categoryColor}30)`,
              filter: "blur(8px)",
              zIndex: -1,
            }}
          />

          {/* Ornate top border */}
          <div
            className="absolute top-0 right-0 left-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent 10%, ${categoryColor} 50%, transparent 90%)`,
            }}
          />

          {/* Hover glow effect - inner */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `
                radial-gradient(ellipse at 50% 0%, ${categoryColor}30 0%, transparent 50%),
                radial-gradient(ellipse at 50% 100%, ${categoryColor}15 0%, transparent 40%)
              `,
            }}
          />

          {/* Border glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: `
                0 0 30px ${categoryColor}40,
                0 0 60px ${categoryColor}20,
                inset 0 0 20px ${categoryColor}10
              `,
            }}
          />

          {/* Corner ornaments */}
          <div
            className="group-hover:border-opacity-80 absolute top-2.5 left-2.5 h-4 w-4 rounded-tl border-t-2 border-l-2 transition-colors duration-300"
            style={{ borderColor: `${categoryColor}50` }}
          />
          <div
            className="group-hover:border-opacity-80 absolute top-2.5 right-2.5 h-4 w-4 rounded-tr border-t-2 border-r-2 transition-colors duration-300"
            style={{ borderColor: `${categoryColor}50` }}
          />
          <div
            className="group-hover:border-opacity-80 absolute bottom-2.5 left-2.5 h-4 w-4 rounded-bl border-b-2 border-l-2 transition-colors duration-300"
            style={{ borderColor: `${categoryColor}50` }}
          />
          <div
            className="group-hover:border-opacity-80 absolute right-2.5 bottom-2.5 h-4 w-4 rounded-br border-r-2 border-b-2 transition-colors duration-300"
            style={{ borderColor: `${categoryColor}50` }}
          />

          {/* Content - flex-1 to fill available space */}
          <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              {/* Event name */}
              <h3
                className="text-xl font-bold italic sm:text-2xl"
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#FDF6E3",
                  textShadow: `0 0 20px ${categoryColor}40, 0 2px 4px rgba(0,0,0,0.3)`,
                }}
              >
                {event.name}
              </h3>

              {/* Type badge */}
              <span
                className="flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase"
                style={{
                  background: typeConfig.gradient,
                  color: typeConfig.textColor,
                  boxShadow: `0 0 15px ${typeConfig.glow}`,
                }}
              >
                {typeConfig.label}
              </span>
            </div>

            {/* Decorative divider */}
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${categoryColor}60, transparent)` }}
              />
              <Sparkles className="h-3.5 w-3.5" style={{ color: `${categoryColor}80` }} />
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, transparent, ${categoryColor}60)` }}
              />
            </div>

            {/* Tagline */}
            <p
              className="mb-3 text-sm font-semibold italic"
              style={{
                fontFamily: "Georgia, serif",
                color: categoryColor,
                textShadow: `0 0 15px ${categoryColor}30`,
              }}
            >
              {event.tagline}
            </p>

            {/* Description - flex-1 to push button to bottom */}
            <p
              className="mb-4 flex-1 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {event.description}
            </p>

            {/* Team size badge - positioned above button */}
            {event.teamSize && (
              <div
                className="mb-4 inline-flex items-center gap-2 self-start rounded-lg px-3 py-2"
                style={{
                  background: `${categoryColor}15`,
                  border: `1px solid ${categoryColor}30`,
                }}
              >
                <Users className="h-4 w-4" style={{ color: categoryColor }} />
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Team Size: <span style={{ color: categoryColor }}>{event.teamSize}</span>
                </span>
              </div>
            )}

            {/* Error message */}
            {isError && (
              <div
                className="mb-4 rounded-lg px-3 py-2 text-xs"
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#fca5a5",
                }}
              >
                {errorMessage}
                <button
                  onClick={() => reset()}
                  className="ml-2 underline transition-colors hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Register button - always at bottom due to flex */}
            <motion.button
              whileHover={
                !showAsRegistered && event.registrationOpen && canRegister
                  ? { scale: 1.02 }
                  : undefined
              }
              whileTap={
                !showAsRegistered && event.registrationOpen && canRegister
                  ? { scale: 0.98 }
                  : undefined
              }
              onClick={handleRegisterClick}
              disabled={
                !event.registrationOpen || isRegistering || showAsRegistered || !canRegister
              }
              className="group/btn relative mt-auto w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-300"
              style={{
                background: showAsRegistered
                  ? "transparent"
                  : !event.registrationOpen || !canRegister
                    ? "linear-gradient(135deg, rgba(100,100,100,0.3) 0%, rgba(60,60,60,0.3) 100%)"
                    : `linear-gradient(135deg, ${categoryColor} 0%, hsl(from ${categoryColor} h s 30%) 100%)`,
                border: showAsRegistered
                  ? "2px solid #166534"
                  : !event.registrationOpen || !canRegister
                    ? "2px solid rgba(100,100,100,0.3)"
                    : `2px solid ${categoryColor}`,
                color: showAsRegistered
                  ? "#22c55e"
                  : event.registrationOpen && canRegister
                    ? "#FDF6E3"
                    : "rgba(255,255,255,0.4)",
                boxShadow: showAsRegistered
                  ? "none"
                  : event.registrationOpen && canRegister
                    ? `0 0 25px ${categoryColor}40`
                    : "none",
                cursor:
                  !event.registrationOpen || showAsRegistered || !canRegister
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {/* Shimmer effect */}
              {event.registrationOpen && canRegister && !showAsRegistered && !isRegistering && (
                <div
                  className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover/btn:translate-x-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                />
              )}

              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2">
                {showAsRegistered ? (
                  <>
                    {/* Custom checkmark SVG */}
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Registered
                  </>
                ) : isRegistering ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Registering...
                  </>
                ) : !event.registrationOpen ? (
                  <>
                    <Clock className="h-5 w-5" />
                    Coming Soon
                  </>
                ) : !canRegister ? (
                  "Buy Pass to Register"
                ) : (
                  <>
                    Register Now
                    <ChevronRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </>
                )}
              </span>
            </motion.button>
          </div>

          {/* Bottom ornate line */}
          <div
            className="absolute right-0 bottom-0 left-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${categoryColor}30, transparent)`,
            }}
          />
        </div>
      </motion.div>

      {/* Team Selector Modal */}
      {showTeamModal && (
        <TeamSelectorModal
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          onSuccess={handleTeamRegisterSuccess}
          eventSlug={slug}
          eventName={event.name}
          eventType={event.type as "team" | "duo"}
          minTeamSize={event.minTeamSize}
          maxTeamSize={event.maxTeamSize}
        />
      )}
    </>
  );
});
