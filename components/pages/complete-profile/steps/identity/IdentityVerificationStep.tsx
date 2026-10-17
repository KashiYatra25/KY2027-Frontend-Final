"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Fingerprint } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { AadhaarFlow } from "./AadhaarFlow";
import { ManualEntryFlow } from "./ManualEntryFlow";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type VerificationMode = "aadhaar" | "manual";

interface IdentityVerificationStepProps {
  refetchProgress: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function IdentityVerificationStep({ refetchProgress }: IdentityVerificationStepProps) {
  const [mode, setMode] = useState<VerificationMode>("aadhaar");

  return (
    <div className="space-y-8">
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
        <p style={{ color: `${COLORS.CREAM}60` }}>Choose your preferred verification method</p>
      </div>

      {/* Mode Toggle */}
      <div
        className="mx-auto flex max-w-md gap-3 rounded-xl p-1.5"
        style={{
          background: `${COLORS.BG_DEEP}80`,
          border: `1px solid ${COLORS.GOLD}20`,
        }}
      >
        <ModeButton
          active={mode === "aadhaar"}
          onClick={() => setMode("aadhaar")}
          icon={<Fingerprint className="h-5 w-5" />}
          label="Aadhaar Card"
          sublabel="AI-powered verification"
        />
        <ModeButton
          active={mode === "manual"}
          onClick={() => setMode("manual")}
          icon={<FileText className="h-5 w-5" />}
          label="Manual Entry"
          sublabel="Enter details yourself"
        />
      </div>

      {/* Content based on mode */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {mode === "aadhaar" ? (
            <AadhaarFlow refetchProgress={refetchProgress} />
          ) : (
            <ManualEntryFlow refetchProgress={refetchProgress} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODE BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}

function ModeButton({ active, onClick, icon, label, sublabel }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-1 flex-col items-center gap-1 rounded-lg px-4 py-3 transition-all"
      style={{
        background: active
          ? `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}15 100%)`
          : "transparent",
        border: active ? `1px solid ${COLORS.GOLD}40` : "1px solid transparent",
      }}
    >
      <span style={{ color: active ? COLORS.GOLD : `${COLORS.CREAM}50` }}>{icon}</span>
      <span
        className="text-sm font-medium"
        style={{ color: active ? COLORS.CREAM : `${COLORS.CREAM}70` }}
      >
        {label}
      </span>
      <span className="text-xs" style={{ color: `${COLORS.CREAM}40` }}>
        {sublabel}
      </span>
    </button>
  );
}
