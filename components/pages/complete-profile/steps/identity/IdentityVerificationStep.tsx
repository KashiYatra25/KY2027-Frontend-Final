"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Fingerprint, Lock } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { useSelectIdentityMethod } from "@/lib/api/hooks/profile/useSelectIdentityMethod";
import { AadhaarFlow } from "./AadhaarFlow/AadhaarFlow";
import { ManualEntryFlow } from "./ManualEntryFlow/ManualEntryFlow";
import { ChoiceCard } from "./ChoiceCard";

// ═══════════════════════════════════════════════════════════════════
// FEATURE FLAG
// ═══════════════════════════════════════════════════════════════════
//
// Aadhaar auto-upload uses AWS Textract for OCR. Until AWS access is
// restored, Textract cannot run, so the auto-upload pipeline is DISABLED.
// With this off:
//   • the Aadhaar choice is never offered on the UI,
//   • everyone is routed to Manual Entry (which works without AWS),
//   • users previously committed to "aadhaar" are auto-switched to manual
//     so they are not stranded on a broken flow.
//
// To re-enable Aadhaar auto-upload later: flip this back to `true`.
const AADHAAR_ENABLED = false;

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type VerificationMode = "aadhaar" | "manual";

interface IdentityVerificationStepProps {
  refetchProgress: () => void;
  /**
   * The method already committed on the backend (if any). When set, the
   * toggle is LOCKED to this method — the user cannot switch, even after a
   * refresh. This prevents mid-flow method switching.
   */
  lockedMethod?: VerificationMode | null;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function IdentityVerificationStep({
  refetchProgress,
  lockedMethod = null,
}: IdentityVerificationStepProps) {
  const { selectMethod, isLoading: isSelecting } = useSelectIdentityMethod();

  // When Aadhaar auto-upload is disabled, the ONLY available method is manual.
  // We ignore any backend-committed "aadhaar" method and route to manual so a
  // user who started the (now broken) Aadhaar flow can still finish via manual.
  const forcedManual = !AADHAAR_ENABLED;

  // Local selection (the user's tentative choice before committing).
  const [selected, setSelected] = useState<VerificationMode>(
    forcedManual ? "manual" : (lockedMethod ?? "aadhaar")
  );

  // Whether the user has committed their choice this session (clicked Proceed).
  const [hasProceeded, setHasProceeded] = useState(false);

  // A method already committed on the backend (resuming) → locked for good.
  // When Aadhaar is disabled we never treat the backend method as a lock,
  // because we always want manual regardless of what was previously chosen.
  const isLocked = !forcedManual && lockedMethod !== null;

  // The committed method drives the flow once chosen; otherwise the local pick.
  const effectiveMode: VerificationMode = forcedManual ? "manual" : (lockedMethod ?? selected);

  // Show the "make your choice" overlay until the user has committed (either
  // this session via Proceed, or previously via a locked backend method).
  // With Aadhaar disabled there is no choice to make — go straight to manual.
  const needsChoice = !forcedManual && !isLocked && !hasProceeded;

  // When Aadhaar is disabled, silently commit "manual" on the backend once so
  // the server record aligns (and any prior "aadhaar" selection is overridden).
  useEffect(() => {
    if (!forcedManual) return;
    if (lockedMethod === "manual") return; // already correct on the backend
    void selectMethod("manual");
    // Run once on mount for this step; selectMethod is stable (useCallback).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedManual]);

  // Commit the chosen method (the ONLY place a request fires). Nothing hits the
  // backend while the user is merely toggling between the two options.
  const handleProceed = useCallback(async () => {
    if (isSelecting) return;
    const ok = await selectMethod(selected);
    if (ok) {
      setHasProceeded(true);
      refetchProgress();
    }
  }, [isSelecting, selectMethod, selected, refetchProgress]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <Shield className="h-8 w-8" style={{ color: COLORS.GOLD }} />
        </div>
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: COLORS.CREAM }}>
          Verify Your Identity
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          {forcedManual
            ? "Enter your identity details manually to continue."
            : isLocked || hasProceeded
              ? `Continue with ${effectiveMode === "aadhaar" ? "Aadhaar" : "manual"} verification.`
              : "Choose how you'd like to verify, then continue."}
        </p>
      </div>

      {/* ── Choice cards (always visible so the two paths are clear) ── */}
      {needsChoice && (
        <>
          <div className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
            <ChoiceCard
              active={selected === "aadhaar"}
              onClick={() => !isSelecting && setSelected("aadhaar")}
              icon={<Fingerprint className="h-6 w-6" />}
              title="Aadhaar Card"
              desc="Upload your Aadhaar image and let AI auto-fill & verify your details."
            />
            <ChoiceCard
              active={selected === "manual"}
              onClick={() => !isSelecting && setSelected("manual")}
              icon={<FileText className="h-6 w-6" />}
              title="Manual Entry"
              desc="Type your name, Aadhaar number, DOB and gender in yourself."
            />
          </div>

          <div className="mx-auto max-w-xl">
            <button
              onClick={handleProceed}
              disabled={isSelecting}
              className={`w-full rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300 ${
                isSelecting ? "cursor-not-allowed opacity-50" : "hover:scale-[1.01]"
              }`}
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
                color: COLORS.BG_DEEP,
                boxShadow: `0 8px 24px ${COLORS.GOLD}40`,
              }}
            >
              {isSelecting
                ? "Please wait…"
                : `Continue with ${selected === "aadhaar" ? "Aadhaar" : "Manual Entry"}`}
            </button>
            <p className="mt-2 text-center text-xs" style={{ color: `${COLORS.CREAM}40` }}>
              <Lock className="mr-1 inline h-3 w-3" />
              Preview below. You can&apos;t change this once you continue.
            </p>
          </div>
        </>
      )}

      {/* ── The selected flow: a live, fully-visible preview before the
          choice is committed, fully interactive afterwards. ── */}
      <div className="relative">
        <div
          className="transition-opacity duration-300"
          style={{
            // Keep it clearly visible (no blur) so the user sees the real path,
            // but non-interactive until they commit with "Continue".
            pointerEvents: needsChoice ? "none" : "auto",
            userSelect: needsChoice ? "none" : "auto",
            opacity: needsChoice ? 0.5 : 1,
          }}
          aria-hidden={needsChoice}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={effectiveMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {effectiveMode === "aadhaar" && AADHAAR_ENABLED ? (
                <AadhaarFlow refetchProgress={refetchProgress} locked={needsChoice} />
              ) : (
                <ManualEntryFlow refetchProgress={refetchProgress} locked={needsChoice} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
