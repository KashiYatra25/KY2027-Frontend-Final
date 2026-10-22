"use client";

import { useState, useCallback } from "react";
import { useCancelRegistration } from "@/lib/api/hooks";
import { X, Loader2, AlertTriangle } from "lucide-react";
import type { Registration } from "@/lib/api/hooks/registrations/useRegistrations";
import { StatusIcon } from "./StatusIcon";
import { StatusBadge } from "./StatusBadge";

// Individual registration card with cancel functionality
export function RegistrationCard({
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
