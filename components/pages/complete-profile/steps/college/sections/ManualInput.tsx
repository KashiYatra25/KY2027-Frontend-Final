import { useState, useEffect } from "react";
import { Building2, AlertCircle } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// IIT BHU VALIDATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Regex to detect IIT BHU / IIT Varanasi variants that users should NOT be able to manually enter.
 * IIT BHU users get their college auto-set via Google OAuth with their @itbhu.ac.in email.
 */
const IIT_BHU_REGEX =
  /i{1,2}\.?\s*t\.?\s*[\(\[\-]?\s*bhu\s*[\)\]]?|i{1,2}\.?\s*t\.?\s*varanasi|indian\s+institute\s+of\s+technology\s*[\(\[]?\s*bhu\s*[\)\]]?\s*varanasi?|indian\s+institute\s+of\s+technology\s+varanasi|banaras\s+hindu\s+university/i;

export function isIITBhuCollege(collegeName: string): boolean {
  return IIT_BHU_REGEX.test(collegeName);
}

// ═══════════════════════════════════════════════════════════════════
// MANUAL INPUT COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface ManualInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function ManualInput({ value, onChange, onValidationChange }: ManualInputProps) {
  const [iitBhuError, setIitBhuError] = useState(false);

  // Check for IIT BHU variants on value change
  useEffect(() => {
    const hasError = value.length > 0 && isIITBhuCollege(value);
    setIitBhuError(hasError);
    onValidationChange?.(!hasError);
  }, [value, onValidationChange]);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
          border: `1px solid ${iitBhuError ? "#ef4444" : COLORS.GOLD}30`,
        }}
      >
        <Building2
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
          style={{ color: iitBhuError ? "#ef4444" : `${COLORS.GOLD}60` }}
        />
        <input
          type="text"
          placeholder="Enter your college name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-4 pr-4 pl-12 text-base outline-none"
          style={{ color: iitBhuError ? "#fca5a5" : COLORS.CREAM }}
        />
      </div>

      {iitBhuError ? (
        <div
          className="mt-3 flex items-start gap-2 rounded-lg p-3"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          }}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-300">
            IIT BHU students are automatically verified via their institute email. Please sign in
            with your <span className="font-semibold">@itbhu.ac.in</span> or{" "}
            <span className="font-semibold">@iitbhu.ac.in</span> email address instead.
          </p>
        </div>
      ) : (
        <p className="mt-2 text-xs" style={{ color: `${COLORS.CREAM}40` }}>
          Enter the full name of your college/university
        </p>
      )}
    </div>
  );
}
