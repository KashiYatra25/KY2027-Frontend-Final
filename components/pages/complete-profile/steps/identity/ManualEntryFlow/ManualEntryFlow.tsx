"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { User, Calendar, Users, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import {
  useManualIdentity,
  type ManualIdentityData,
} from "@/lib/api/hooks/profile/useManualIdentity";
import type { Gender } from "./types";
import { formatGender, formatDate, maskAadhaar } from "./helpers";
import { InfoRow } from "./InfoRow";
import { LockChip } from "./LockChip";
import { GenderOption } from "./GenderOption";
import { ActionButton } from "./ActionButton";

// ═══════════════════════════════════════════════════════════════════
// TYPES & SCHEMA
// ═══════════════════════════════════════════════════════════════════

const ManualEntrySchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  aadhaarNumber: z
    .string()
    .min(1, "Aadhaar number is required")
    .regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Please enter a valid date",
    })
    .refine(
      (value) => {
        const dob = new Date(value);
        const now = new Date();
        const age = now.getFullYear() - dob.getFullYear();
        return age >= 10 && age <= 100;
      },
      { message: "You must be between 10 and 100 years old" }
    ),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"], {
    message: "Please select your gender",
  }),
});

type ManualEntryFormData = z.infer<typeof ManualEntrySchema>;

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ManualEntryFormData>({
    resolver: zodResolver(ManualEntrySchema),
    defaultValues: {
      firstName: "",
      aadhaarNumber: "",
      dateOfBirth: "",
    },
  });

  const gender = watch("gender");

  const { submitManualIdentity, isLoading, isSubmitted, errorMessage, responseData } =
    useManualIdentity(session?.user?.id);

  // Report busy state (submission in flight) up so the method toggle locks.
  useEffect(() => {
    onBusyChange?.(isLoading);
  }, [isLoading, onBusyChange]);

  // ─── Handlers ──────────────────────────────────────────────────────

  const onSubmit = useCallback(
    async (values: ManualEntryFormData) => {
      const data: ManualIdentityData = {
        firstName: values.firstName.trim(),
        aadhaarNumber: values.aadhaarNumber.replace(/\s/g, ""),
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
      };

      await submitManualIdentity(data);
    },
    [submitManualIdentity]
  );

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
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("firstName")}
              placeholder="Enter your full name"
              className="w-full rounded-xl px-4 py-3 text-sm transition-all outline-none focus:ring-2"
              style={{
                background: `${COLORS.BG_DEEP}`,
                color: COLORS.CREAM,
                border: errors.firstName
                  ? `1px solid ${COLORS.ERROR}`
                  : `1px solid ${COLORS.GOLD}30`,
              }}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {errors.firstName.message}
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
              {...register("aadhaarNumber", {
                onChange: (e) => {
                  // Allow only digits, cap at 12
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                  setValue("aadhaarNumber", digits, { shouldValidate: false });
                },
              })}
              placeholder="12-digit Aadhaar number"
              maxLength={12}
              className="w-full rounded-xl px-4 py-3 text-sm tracking-wider transition-all outline-none focus:ring-2"
              style={{
                background: `${COLORS.BG_DEEP}`,
                color: COLORS.CREAM,
                border: errors.aadhaarNumber
                  ? `1px solid ${COLORS.ERROR}`
                  : `1px solid ${COLORS.GOLD}30`,
              }}
            />
            {errors.aadhaarNumber && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {errors.aadhaarNumber.message}
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
              {...register("dateOfBirth")}
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
                border: errors.dateOfBirth
                  ? `1px solid ${COLORS.ERROR}`
                  : `1px solid ${COLORS.GOLD}30`,
                colorScheme: "dark",
              }}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {errors.dateOfBirth.message}
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
                  onClick={() => setValue("gender", option, { shouldValidate: true })}
                  hasError={!!errors.gender}
                />
              ))}
            </div>
            {errors.gender && (
              <p className="mt-1 text-xs" style={{ color: COLORS.ERROR }}>
                {errors.gender.message}
              </p>
            )}
          </div>
        </form>
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
        <ActionButton onClick={handleSubmit(onSubmit)} loading={isLoading}>
          Save Details
        </ActionButton>
      </div>
    </div>
  );
}
