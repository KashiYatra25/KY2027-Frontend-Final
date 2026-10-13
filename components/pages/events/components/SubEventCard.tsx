"use client";

import { memo, useState, useCallback, useEffect, useRef } from "react";
import type { SubEvent } from "@/lib/api/helper/types";
import { COLORS, EVENT_TYPE_COLORS } from "@/components/pages/events/constants/palette";
import { useEventRegisterIndividual } from "@/lib/api/hooks";
import { TeamSelectorModal } from "./TeamSelectorModal";
import { Loader2, Check } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// SUB-EVENT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface SubEventCardProps {
  event: SubEvent;
  categoryColor: string;
  index: number;
  eventSlug?: string; // Optional override for API slug
  isRegistered?: boolean; // Passed from parent (to avoid multiple fetches)
  onRegistrationSuccess?: () => void; // Callback to refetch registrations
  canRegister?: boolean; // Whether user can register (has paid)
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
  const typeConfig =
    EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || EVENT_TYPE_COLORS.individual;

  // Team selector modal state
  const [showTeamModal, setShowTeamModal] = useState(false);

  // Track if we've already called onRegistrationSuccess for this registration
  const hasCalledSuccessRef = useRef(false);

  // Use event slug if available (from API), otherwise fall back to eventSlug prop or id
  const slug = event.slug ?? eventSlug ?? event.id;

  // Individual registration hook
  const {
    register: registerIndividual,
    isRegistering,
    isSuccess,
    isError,
    errorMessage,
    reset,
  } = useEventRegisterIndividual(slug);

  // Handle successful registration - only call once per success
  useEffect(() => {
    if (isSuccess && !hasCalledSuccessRef.current) {
      hasCalledSuccessRef.current = true;
      onRegistrationSuccess?.();
    }
  }, [isSuccess, onRegistrationSuccess]);

  // Reset the ref when the component resets (e.g., after error dismiss)
  useEffect(() => {
    if (!isSuccess) {
      hasCalledSuccessRef.current = false;
    }
  }, [isSuccess]);

  const handleRegisterClick = useCallback(() => {
    if (!event.registrationOpen || isRegistered || !canRegister) return;

    // For team/duo events, show team selector modal
    if (event.type === "team" || event.type === "duo") {
      setShowTeamModal(true);
      return;
    }

    // For individual events, register directly
    registerIndividual();
  }, [event.registrationOpen, event.type, isRegistered, canRegister, registerIndividual]);

  // Handle successful team registration
  const handleTeamRegisterSuccess = useCallback(() => {
    setShowTeamModal(false);
    onRegistrationSuccess?.();
  }, [onRegistrationSuccess]);

  // Determine if registered (from prop or just succeeded)
  const showAsRegistered = isRegistered || isSuccess;

  // Button state
  const getButtonContent = () => {
    if (showAsRegistered) {
      return (
        <>
          <Check className="mr-2 inline-block h-4 w-4" />
          Registered
        </>
      );
    }
    if (isRegistering) {
      return (
        <>
          <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
          Registering...
        </>
      );
    }
    if (!event.registrationOpen) {
      return "Coming Soon";
    }
    if (!canRegister) {
      return "Buy Pass to Register";
    }
    return "Register Now";
  };

  const getButtonStyle = () => {
    if (showAsRegistered) {
      return {
        background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
        color: "#FFFFFF",
        border: "1px solid #22C55E",
        cursor: "default" as const,
      };
    }
    if (!event.registrationOpen || !canRegister) {
      return {
        background: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.4)",
        border: "1px solid rgba(255,255,255,0.2)",
        cursor: "not-allowed" as const,
      };
    }
    return {
      background: `linear-gradient(135deg, ${categoryColor}90 0%, ${categoryColor}70 100%)`,
      color: COLORS.CREAM,
      border: `1px solid ${categoryColor}`,
      cursor: "pointer" as const,
    };
  };

  return (
    <>
      <div className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
        {/* Card Container */}
        <div
          className="relative h-full overflow-hidden rounded-xl transition-all duration-300 sm:hover:-translate-y-1 sm:hover:scale-[1.02]"
          style={{
            background: `linear-gradient(160deg, 
              ${categoryColor}08 0%, 
              #0a0612 30%,
              #1a0a1e90 100%
            )`,
            border: `1px solid ${categoryColor}25`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 right-0 left-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, ${categoryColor}80, transparent)`,
            }}
          />

          {/* Content */}
          <div className="p-5 sm:p-6">
            {/* Header with type badge */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3
                className="text-lg font-bold sm:text-xl"
                style={{
                  color: COLORS.CREAM,
                  fontFamily: "Georgia, serif",
                }}
              >
                {event.name}
              </h3>

              {/* Type badge */}
              <span
                className="flex-shrink-0 rounded-full px-2 py-1 text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: typeConfig.bg,
                  color: typeConfig.text,
                  border: `1px solid ${typeConfig.text}30`,
                }}
              >
                {event.type}
              </span>
            </div>

            {/* Tagline */}
            <p className="mb-3 text-sm font-medium" style={{ color: categoryColor }}>
              {event.tagline}
            </p>

            {/* Description */}
            <p
              className="line-clamp-3 text-sm leading-relaxed sm:line-clamp-4"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {event.description}
            </p>

            {/* Team size if applicable */}
            {event.teamSize && (
              <div
                className="mt-4 inline-flex items-center gap-2 text-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Team Size: {event.teamSize}</span>
              </div>
            )}

            {/* Error message */}
            {isError && (
              <p className="mt-3 text-xs text-red-400">
                {errorMessage}
                <button onClick={() => reset()} className="ml-2 underline hover:text-red-300">
                  Dismiss
                </button>
              </p>
            )}

            {/* Register button */}
            <div className="mt-6">
              <button
                onClick={handleRegisterClick}
                className="w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 sm:hover:scale-[1.02]"
                style={getButtonStyle()}
                disabled={
                  !event.registrationOpen || isRegistering || showAsRegistered || !canRegister
                }
              >
                {getButtonContent()}
              </button>
            </div>
          </div>

          {/* Hover glow - desktop only */}
          <div
            className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block"
            style={{
              background: `radial-gradient(ellipse at center, ${categoryColor}10 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* Team Selector Modal for team/duo events */}
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
