"use client";

import { useState, useCallback } from "react";
import { useMyRegistrations, useCancelRegistration } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/profile/constants/palette";
import {
  Ticket,
  Check,
  Clock,
  ChevronRight,
  X,
  Loader2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import type { Registration } from "@/lib/api/hooks/registrations/useRegistrations";

export function MyRegistrationsSection() {
  const { activeRegistrations, cancelledRegistrations, activeCount, isLoading, refetch } =
    useMyRegistrations();
  const [showCancelled, setShowCancelled] = useState(false);

  if (isLoading) {
    return (
      <SectionWrapper title="My Registrations" icon={<Ticket className="h-5 w-5" />}>
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-white/5" />
          ))}
        </div>
      </SectionWrapper>
    );
  }

  const totalCount = activeCount + cancelledRegistrations.length;

  return (
    <SectionWrapper
      title="My Registrations"
      icon={<Ticket className="h-5 w-5" />}
      count={activeCount}
      linkHref="/events"
      linkText="Browse Events"
    >
      {totalCount === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
          <Ticket className="mx-auto mb-2 h-8 w-8 text-white/30" />
          <p className="text-sm text-white/50">You haven&apos;t registered for any events yet</p>
          <Link
            href="/events"
            className="mt-3 inline-block text-sm font-medium"
            style={{ color: COLORS.GOLD }}
          >
            Explore Events →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Active registrations */}
          {activeRegistrations.length === 0 && cancelledRegistrations.length > 0 ? (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-sm text-white/50">No active registrations</p>
            </div>
          ) : (
            activeRegistrations
              .slice(0, 4)
              .map((reg) => (
                <RegistrationCard
                  key={reg.registrationId}
                  registration={reg}
                  onCancelSuccess={refetch}
                />
              ))
          )}

          {activeCount > 4 && (
            <p className="text-center text-xs text-white/40">
              +{activeCount - 4} more active registration{activeCount - 4 > 1 ? "s" : ""}
            </p>
          )}

          {/* Cancelled registrations (collapsible) */}
          {cancelledRegistrations.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <button
                onClick={() => setShowCancelled(!showCancelled)}
                className="flex w-full items-center justify-between text-xs text-white/40 transition-colors hover:text-white/60"
              >
                <span>
                  {cancelledRegistrations.length} cancelled registration
                  {cancelledRegistrations.length > 1 ? "s" : ""}
                </span>
                {showCancelled ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showCancelled && (
                <div className="mt-2 space-y-2">
                  {cancelledRegistrations.map((reg) => (
                    <RegistrationCard key={reg.registrationId} registration={reg} isCancelled />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}

// Individual registration card with cancel functionality
function RegistrationCard({
  registration: reg,
  isCancelled = false,
  onCancelSuccess,
}: {
  registration: Registration;
  isCancelled?: boolean;
  onCancelSuccess?: () => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { cancel, isCancelling, isError, errorMessage, reset } = useCancelRegistration();

  const handleCancelClick = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    cancel(reg.eventSlug);
    // Wait for success then refetch
    setTimeout(() => {
      onCancelSuccess?.();
      setShowConfirm(false);
    }, 1000);
  }, [cancel, reg.eventSlug, onCancelSuccess]);

  const handleDismiss = useCallback(() => {
    setShowConfirm(false);
    reset();
  }, [reset]);

  // Determine if user can cancel (only creator for teams, or individual)
  const canCancel = !isCancelled && (reg.participationType === "individual" || reg.team !== null);

  return (
    <div
      className={`rounded-lg border px-4 py-3 transition-all ${
        isCancelled ? "border-white/5 bg-white/[0.02] opacity-60" : "border-white/10 bg-white/5"
      }`}
    >
      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-200">Cancel registration?</p>
              <p className="mt-1 text-xs text-amber-200/70">
                {reg.participationType === "individual"
                  ? "This will remove your registration from this event."
                  : "This will cancel the entire team's registration."}
              </p>
              {isError && <p className="mt-2 text-xs text-red-400">{errorMessage}</p>}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleConfirmCancel}
                  disabled={isCancelling}
                  className="flex items-center gap-1.5 rounded-md bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30 disabled:opacity-50"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    "Yes, cancel"
                  )}
                </button>
                <button
                  onClick={handleDismiss}
                  disabled={isCancelling}
                  className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/20 disabled:opacity-50"
                >
                  No, keep it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StatusIcon status={reg.status} />
          <div>
            <p
              className={`font-medium ${isCancelled ? "text-white/50 line-through" : "text-white"}`}
            >
              {reg.event?.name ?? reg.eventSlug}
            </p>
            <p className="text-xs text-white/50">
              {reg.participationType === "individual" ? (
                "Individual"
              ) : (
                <>Team: {reg.team?.name ?? "Unknown"}</>
              )}
              {reg.event?.category && (
                <span className="ml-2 text-white/30">• {reg.event.category}</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={reg.status} />
          {canCancel && !showConfirm && (
            <button
              onClick={handleCancelClick}
              className="rounded-md p-1.5 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
              title="Cancel registration"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  const iconClass = "h-4 w-4";

  switch (status) {
    case "confirmed":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/20">
          <Check className={iconClass} style={{ color: COLORS.SUCCESS }} />
        </div>
      );
    case "pending":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/20">
          <Clock className={iconClass} style={{ color: COLORS.WARNING }} />
        </div>
      );
    case "cancelled":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20">
          <X className={iconClass} style={{ color: "#f87171" }} />
        </div>
      );
    default:
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
          <Ticket className={iconClass} style={{ color: "white" }} />
        </div>
      );
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: "bg-green-500/20", text: "text-green-400" },
    pending: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
    cancelled: { bg: "bg-red-500/20", text: "text-red-400" },
    waitlisted: { bg: "bg-blue-500/20", text: "text-blue-400" },
  };

  const style = styles[status] ?? { bg: "bg-white/10", text: "text-white/60" };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${style.bg} ${style.text}`}>
      {status}
    </span>
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
