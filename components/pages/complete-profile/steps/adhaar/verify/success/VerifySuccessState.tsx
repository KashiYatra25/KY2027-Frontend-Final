"use client";

import {
  UserCheck,
  User,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { type AadhaarExtractedData } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { InfoCard } from "./InfoCard";

interface VerifySuccessStateProps {
  data: AadhaarExtractedData;
  onConfirm: () => void;
}

export function VerifySuccessState({ data, onConfirm }: VerifySuccessStateProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: `${COLORS.SUCCESS}20`,
            border: `1px solid ${COLORS.SUCCESS}30`,
          }}
        >
          <UserCheck className="h-8 w-8" style={{ color: COLORS.SUCCESS }} />
        </div>
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: COLORS.CREAM }}>
          Aadhaar Verified Successfully
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>Your details have been extracted and verified</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard icon={User} label="Full Name" value={data.name} />
        <InfoCard icon={Calendar} label="Date of Birth" value={data.dateOfBirth} />
        <InfoCard icon={Users} label="Gender" value={data.gender} />
        <InfoCard
          icon={CreditCard}
          label="Aadhaar (Last 4)"
          value={`XXXX XXXX ${data.aadhaarLast4}`}
        />
      </div>

      <div
        className="flex items-center justify-center gap-3 rounded-xl p-4"
        style={{
          background: `${COLORS.SUCCESS}10`,
          border: `1px solid ${COLORS.SUCCESS}25`,
        }}
      >
        <CheckCircle2 className="h-5 w-5" style={{ color: COLORS.SUCCESS }} />
        <p className="text-sm font-medium" style={{ color: COLORS.SUCCESS }}>
          Identity verified successfully
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onConfirm}
          className="group relative w-full max-w-sm overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
            color: COLORS.BG_DEEP,
            boxShadow: `0 8px 24px ${COLORS.GOLD}40, inset 0 1px 0 ${COLORS.GOLD_LIGHT}50`,
          }}
        >
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${COLORS.GOLD_LIGHT}30 45%, ${COLORS.GOLD_LIGHT}40 50%, ${COLORS.GOLD_LIGHT}30 55%, transparent 60%)`,
            }}
          />
          <span className="relative flex items-center justify-center gap-2">
            Continue to Next Step
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
}
