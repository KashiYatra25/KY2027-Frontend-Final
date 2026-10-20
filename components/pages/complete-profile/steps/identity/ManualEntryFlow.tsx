"use client";

import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Calendar, Users, CheckCircle, AlertCircle, CreditCard, Lock } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import {
  useManualIdentity,
  type ManualIdentityData,
} from "@/lib/api/hooks/profile/useManualIdentity";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

interface ManualEntryFlowProps {
  refetchProgress: () => void;
  /** Reports to the parent when a backend request is in flight. */
  onBusyChange?: (busy: boolean) => void;
  /** When true, the flow is a non-interactive preview (shows a lock chip). */
  locked?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function ManualEntryFlow({
  refetchProgress,
  onBusyChange,
  locked = false,
}: ManualEntryFlowProps) {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { submitManualIdentity, isLoading, isSubmitted, errorMessage, responseData } =
    useManualIdentity(session?.user?.id);

  // Report busy state (submission in flight) up so the method toggle locks.
  useEffect(() => {
    onBusyChange?.(isLoading);
  }, [isLoading, onBusyChange]);

  // ─── Validation ────────────────────────────────────────────────────

  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) {
      errors.firstName = "Name is required";
    } else if (firstName.trim().length < 2) {
      errors.firstName = "Name must be at least 2 characters";
    }

    const aadhaarDigits = aadhaarNumber.replace(/\s/g, "");
    if (!aadhaarDigits) {
      errors.aadhaarNumber = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(aadhaarDigits)) {
      errors.aadhaarNumber = "Aadhaar number must be exactly 12 digits";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(dateOfBirth);
      const now = new Date();
      const age = now.getFullYear() - dob.getFullYear();
      if (age < 10 || age > 100) {
        errors.dateOfBirth = "You must be between 10 and 100 years old";
      }
    }

    if (!gender) {
      errors.gender = "Please select your gender";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [firstName, aadhaarNumber, dateOfBirth, gender]);

  // ─── Handlers ──────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    const data: ManualIdentityData = {
      firstName: firstName.trim(),
      aadhaarNumber: aadhaarNumber.replace(/\s/g, ""),
      dateOfBirth,
      gender: gender as Gender,
    };

    await submitManualIdentity(data);
  }, [validate, firstName, aadhaarNumber, dateOfBirth, gender, submitManualIdentity]);

  const handleComplete = useCallback(() => {
    refetchProgress();
  }, [refetchProgress]);

  // ─── Render: Success ───────────────────────────────────────────────

  if (isSubmitted && responseData) {
    return (
      <div className="space-y-6">
        <div
          className="mx-auto max-w-md rounded-2xl p-6"
          style={{
            background: `linear-gradient(145deg, ${COLORS.SUCCESS}10 0%, ${COLORS.SUCCESS}05 100%)`,
            border: `1px solid ${COLORS.SUCCESS}30`,
          }}
        >
          <div className="mb-4 flex items-center justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: `${COLORS.SUCCESS}20` }}
            >
              <CheckCircle className="h-8 w-8" style={{ color: COLORS.SUCCESS }} />
            </div>
          </div>
          <h3 className="mb-4 text-center text-lg font-bold" style={{ color: COLORS.CREAM }}>
            Details Saved Successfully!
          </h3>
          <div className="space-y-2 text-sm">
            <InfoRow label="Name" value={responseData.data.firstName} />
            <InfoRow label="Aadhaar Number" value={maskAadhaar(responseData.data.aadhaarNumber)} />
            <InfoRow label="Gender" value={formatGender(responseData.data.gender)} />
            <InfoRow label="Date of Birth" value={formatDate(responseData.data.dateOfBirth)} />
          </div>
        </div>
        <div className="flex justify-center">
          <ActionButton onClick={handleComplete} loading={false}>
            Continue to Next Step
          </ActionButton>
        </div>
      </div>
    );
  }

  // ─── Render: Form ──────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="relative mx-auto max-w-md">
        {locked && <LockChip />}
        <div
          className="space-y-5 rounded-2xl p-6"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
            border: `1px solid ${COLORS.GOLD}20`,
          }}
        >
          {/* Name Field */}
          <div>
            <label
              className="mb-2 flex items-center gap-2 text-sm font-medium"
              style={{ color: COLORS.CREAM }}
            >
              <User className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              Full Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl px-4 py-3 text-sm transition-all outline-none focus:ring-2"
              style={{
                background: `${COLORS.BG_DEEP}`,
                color: COLORS.CREAM,
                border: validationErrors.firstName
                  ? `1px solid ${COLORS.ERROR}`
                  : `1px solid ${COLORS.GOLD}30`,
              }}
            />
            {validationErrors.firstName && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {validationErrors.firstName}
              </p>
            )}
          </div>

          {/* Aadhaar Number Field */}
          <div>
            <label
              className="mb-2 flex items-center gap-2 text-sm font-medium"
              style={{ color: COLORS.CREAM }}
            >
              <CreditCard className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              Aadhaar Number
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={aadhaarNumber}
              onChange={(e) => {
                // Allow only digits, cap at 12
                const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                setAadhaarNumber(digits);
              }}
              placeholder="12-digit Aadhaar number"
              maxLength={12}
              className="w-full rounded-xl px-4 py-3 text-sm tracking-wider transition-all outline-none focus:ring-2"
              style={{
                background: `${COLORS.BG_DEEP}`,
                color: COLORS.CREAM,
                border: validationErrors.aadhaarNumber
                  ? `1px solid ${COLORS.ERROR}`
                  : `1px solid ${COLORS.GOLD}30`,
              }}
            />
            {validationErrors.aadhaarNumber && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {validationErrors.aadhaarNumber}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div>
            <label
              className="mb-2 flex items-center gap-2 text-sm font-medium"
              style={{ color: COLORS.CREAM }}
            >
              <Calendar className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() - 10))
                  .toISOString()
                  .split("T")[0]
              }
              min={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
                  .toISOString()
                  .split("T")[0]
              }
              className="w-full rounded-xl px-4 py-3 text-sm transition-all outline-none focus:ring-2"
              style={{
                background: `${COLORS.BG_DEEP}`,
                color: COLORS.CREAM,
                border: validationErrors.dateOfBirth
                  ? `1px solid ${COLORS.ERROR}`
                  : `1px solid ${COLORS.GOLD}30`,
                colorScheme: "dark",
              }}
            />
            {validationErrors.dateOfBirth && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {validationErrors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label
              className="mb-2 flex items-center gap-2 text-sm font-medium"
              style={{ color: COLORS.CREAM }}
            >
              <Users className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"] as Gender[]).map((option) => (
                <GenderOption
                  key={option}
                  value={option}
                  selected={gender === option}
                  onClick={() => setGender(option)}
                  hasError={!!validationErrors.gender}
                />
              ))}
            </div>
            {validationErrors.gender && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {validationErrors.gender}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          className="mx-auto flex max-w-md items-center gap-3 rounded-xl p-4"
          style={{ background: `${COLORS.ERROR}10`, border: `1px solid ${COLORS.ERROR}25` }}
        >
          <AlertCircle className="h-5 w-5 shrink-0" style={{ color: COLORS.ERROR }} />
          <p className="text-sm" style={{ color: COLORS.ERROR }}>
            {errorMessage}
          </p>
        </div>
      )}

      {/* Info Note */}
      <div
        className="mx-auto flex max-w-md items-start gap-3 rounded-xl p-4"
        style={{ background: `${COLORS.GOLD}08`, border: `1px solid ${COLORS.GOLD}20` }}
      >
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: COLORS.GOLD }} />
        <div>
          <p className="mb-1 text-sm font-medium" style={{ color: COLORS.GOLD }}>
            Please enter accurate information
          </p>
          <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            Your details will be used for festival entry and may be verified at the venue.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <ActionButton
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!firstName || !aadhaarNumber || !dateOfBirth || !gender}
        >
          Save Details
        </ActionButton>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: `${COLORS.CREAM}60` }}>{label}</span>
      <span className="font-medium" style={{ color: COLORS.CREAM }}>
        {value}
      </span>
    </div>
  );
}

// Lock chip pinned to the top-right of a box to mark it as not-yet-usable.
function LockChip() {
  return (
    <div className="pointer-events-none absolute -top-2 -right-2 z-10">
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg"
        style={{
          background: COLORS.BG_DEEP,
          border: `1px solid ${COLORS.GOLD}50`,
        }}
      >
        <Lock className="h-3.5 w-3.5" style={{ color: COLORS.GOLD }} />
        <span className="text-xs font-semibold" style={{ color: COLORS.CREAM }}>
          Locked
        </span>
      </div>
    </div>
  );
}

interface GenderOptionProps {
  value: Gender;
  selected: boolean;
  onClick: () => void;
  hasError: boolean;
}

function GenderOption({ value, selected, onClick, hasError }: GenderOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-sm transition-all"
      style={{
        background: selected ? `${COLORS.GOLD}20` : `${COLORS.BG_DEEP}`,
        color: selected ? COLORS.GOLD : `${COLORS.CREAM}70`,
        border: selected
          ? `1px solid ${COLORS.GOLD}50`
          : hasError
            ? `1px solid ${COLORS.ERROR}30`
            : `1px solid ${COLORS.GOLD}20`,
      }}
    >
      {formatGender(value)}
    </button>
  );
}

function formatGender(value: string): string {
  switch (value) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    case "OTHER":
      return "Other";
    case "PREFER_NOT_TO_SAY":
      return "Prefer not to say";
    default:
      return value;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function maskAadhaar(value: string): string {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length !== 12) return value || "";
  // Show only the last 4 digits for privacy: XXXX XXXX 1234
  return `XXXX XXXX ${digits.slice(8)}`;
}

interface ActionButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

function ActionButton({ onClick, loading, disabled, children }: ActionButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`group relative overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 ${
        isDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-[1.02] active:scale-[0.98]"
      }`}
      style={{
        background: isDisabled
          ? `${COLORS.GOLD}20`
          : `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
        color: isDisabled ? `${COLORS.CREAM}40` : COLORS.BG_DEEP,
        boxShadow: isDisabled ? "none" : `0 8px 24px ${COLORS.GOLD}40`,
      }}
    >
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
          />
        ) : null}
        {children}
      </span>
    </button>
  );
}
