"use client";

import { DiyaSpinner } from "@/components/loader/DiyaSpinner";

/**
 * SigningInOverlay — a full-screen, ALWAYS-VISIBLE loader shown the moment the
 * user starts Google sign-in.
 *
 * Unlike the global PageLoader (which only reacts to client-side route-change
 * clicks and stays hidden otherwise), this overlay paints immediately when
 * mounted. That matters for OAuth: the browser is about to hard-redirect to
 * Google, so we need a loader that is visible instantly with no navigation
 * event to trigger it.
 */
export function SigningInOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(10, 10, 18, 0.6)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Signing in"
    >
      <DiyaSpinner label="Redirecting to Google…" />
    </div>
  );
}
