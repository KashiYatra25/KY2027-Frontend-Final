"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { isValidPhoneNumber } from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js/core";
import { useUpdatePhone } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { PhoneInput } from "./components/PhoneInput";
import { VerificationError } from "./components/VerificationError";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface PhoneVerificationStepProps {
  refetchProgress: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function PhoneVerificationStep({ refetchProgress }: PhoneVerificationStepProps) {
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // API hook
  const { updatePhone, isPending } = useUpdatePhone(session?.user?.id);

  const isPhoneValid = phoneNumber ? isValidPhoneNumber(phoneNumber) : false;

  // Handle phone submit
  const handleSubmit = useCallback(() => {
    if (!phoneNumber || !isPhoneValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setError(null);

    updatePhone(
      { phoneNumber },
      {
        onSuccess: () => {
          refetchProgress();
        },
        onError: (err: Error) => {
          setError(err.message || "Failed to save phone number");
        },
      }
    );
  }, [phoneNumber, isPhoneValid, updatePhone, refetchProgress]);

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
          <Phone className="h-8 w-8" style={{ color: COLORS.GOLD }} />
        </div>
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: COLORS.CREAM }}>
          Add Your Phone Number
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          Enter your phone number to continue with your profile
        </p>
      </div>

      {/* Phone Input */}
      <div className="space-y-6">
        <PhoneInput
          value={phoneNumber}
          onChange={(value) => {
            setPhoneNumber(value);
            setError(null);
          }}
          disabled={isPending}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isPhoneValid || isPending}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-semibold transition-all duration-300 ${isPhoneValid && !isPending ? "hover:scale-[1.02] hover:shadow-lg" : "cursor-not-allowed opacity-50"} `}
          style={{
            background: isPhoneValid
              ? `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`
              : `${COLORS.GOLD}30`,
            color: isPhoneValid ? COLORS.BG_DEEP : `${COLORS.CREAM}50`,
            boxShadow: isPhoneValid ? `0 10px 40px ${COLORS.GOLD}30` : "none",
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Save & Continue
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && <VerificationError message={error} />}
    </div>
  );
}
