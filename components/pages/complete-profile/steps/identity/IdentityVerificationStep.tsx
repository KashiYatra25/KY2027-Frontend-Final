"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Fingerprint, Lock } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { useSelectIdentityMethod } from "@/lib/api/hooks/profile/useSelectIdentityMethod";
import { AadhaarFlow } from "./AadhaarFlow";
import { ManualEntryFlow } from "./ManualEntryFlow";

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

  // Local selection (the user's tentative choice before committing).
  const [selected, setSelected] = useState<VerificationMode>(lockedMethod ?? "aadhaar");

  // Whether the user has committed their choice this session (clicked Proceed).
  const [hasProceeded, setHasProceeded] = useState(false);

  // A method already committed on the backend (resuming) → locked for good.
  const isLocked = lockedMethod !== null;

  // The committed method drives the flow once chosen; otherwise the local pick.
  const effectiveMode: VerificationMode = lockedMethod ?? selected;

  // Show the "make your choice" overlay until the user has committed (either
  // this session via Proceed, or previously via a locked backend method).
  const needsChoice = !isLocked && !hasProceeded;

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
          {isLocked || hasProceeded
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
              {effectiveMode === "aadhaar" ? (
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

// ═══════════════════════════════════════════════════════════════════
// CHOICE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface ChoiceCardProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function ChoiceCard({ active, onClick, icon, title, desc }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all"
      style={{
        background: active
          ? `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}12 100%)`
          : `${COLORS.BG_DEEP}80`,
        border: active ? `1.5px solid ${COLORS.GOLD}70` : `1px solid ${COLORS.GOLD}20`,
        boxShadow: active ? `0 0 20px ${COLORS.GOLD}20` : "none",
      }}
    >
      <div className="flex w-full items-center justify-between">
        <span style={{ color: active ? COLORS.GOLD : `${COLORS.CREAM}60` }}>{icon}</span>
        {active && (
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
            style={{ background: COLORS.GOLD, color: COLORS.BG_DEEP }}
          >
            ✓
          </span>
        )}
      </div>
      <span
        className="text-base font-semibold"
        style={{ color: active ? COLORS.CREAM : `${COLORS.CREAM}80` }}
      >
        {title}
      </span>
      <span className="text-xs leading-relaxed" style={{ color: `${COLORS.CREAM}50` }}>
        {desc}
      </span>
    </button>
  );
}
