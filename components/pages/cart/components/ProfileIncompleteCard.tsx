"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Upload,
  ShieldCheck,
  GraduationCap,
  Phone,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { COLORS, SHADOWS } from "@/components/pages/cart/constants/palette";

interface ProfileIncompleteCardProps {
  completionPercentage: number;
  displayName?: string | null;
  steps?: {
    aadhaarUploaded: boolean;
    aadhaarVerified: boolean;
    college: boolean;
    phone: boolean;
  };
}

/**
 * Card shown when user's profile is incomplete
 * Displays progress and link to complete profile
 */
export function ProfileIncompleteCard({
  completionPercentage,
  displayName,
  steps,
}: ProfileIncompleteCardProps) {
  // Order: College → Aadhaar Upload → Aadhaar Verify → Phone
  const stepsList = [
    {
      key: "college",
      label: "College Details",
      icon: GraduationCap,
      completed: steps?.college ?? false,
    },
    {
      key: "aadhaarUploaded",
      label: "Upload Aadhaar",
      icon: Upload,
      completed: steps?.aadhaarUploaded ?? false,
    },
    {
      key: "aadhaarVerified",
      label: "Verify Aadhaar",
      icon: ShieldCheck,
      completed: steps?.aadhaarVerified ?? false,
    },
    {
      key: "phone",
      label: "Phone Verification",
      icon: Phone,
      completed: steps?.phone ?? false,
    },
  ];

  const completedCount = stepsList.filter((s) => s.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BG_DEEP}ee, ${COLORS.BG_CARD}dd)`,
        border: `2px solid ${COLORS.GOLD}40`,
        boxShadow: `0 0 40px ${COLORS.GOLD}15, ${SHADOWS.CARD}`,
      }}
    >
      {/* Golden accent line at top */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}, ${COLORS.GOLD}, transparent)`,
        }}
      />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}08)`,
              border: `2px solid ${COLORS.GOLD}50`,
              boxShadow: `0 0 25px ${COLORS.GOLD}20`,
            }}
          >
            <Sparkles className="h-8 w-8" style={{ color: COLORS.GOLD }} />
          </motion.div>

          <h2
            className="mb-2 text-2xl font-bold"
            style={{
              color: COLORS.GOLD,
              fontFamily: "var(--font-ethereal), serif",
            }}
          >
            {displayName ? `Welcome, ${displayName.split(" ")[0]}!` : "Almost There!"}
          </h2>
          <p className="text-sm text-gray-400">Complete your profile to unlock cart access</p>
        </div>

        {/* Progress Ring & Percentage */}
        <div className="mb-6 flex items-center justify-center gap-6">
          <div className="relative h-20 w-20">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={`${COLORS.GOLD}15`}
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={COLORS.GOLD}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 42 - (completionPercentage / 100) * 2 * Math.PI * 42,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 6px ${COLORS.GOLD}60)` }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold" style={{ color: COLORS.GOLD }}>
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400">Profile Status</p>
            <p className="text-lg font-semibold" style={{ color: COLORS.WARNING }}>
              {completedCount}/4 Steps Done
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mb-6 grid grid-cols-2 gap-2">
          {stepsList.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                background: step.completed ? `${COLORS.SUCCESS}12` : `${COLORS.ERROR}08`,
                border: `1px solid ${step.completed ? COLORS.SUCCESS : COLORS.ERROR}30`,
              }}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{
                  background: step.completed ? `${COLORS.SUCCESS}25` : `${COLORS.ERROR}15`,
                }}
              >
                {step.completed ? (
                  <Check className="h-3.5 w-3.5" style={{ color: COLORS.SUCCESS }} />
                ) : (
                  <step.icon className="h-3.5 w-3.5" style={{ color: `${COLORS.ERROR}cc` }} />
                )}
              </div>
              <span
                className="text-xs font-medium"
                style={{ color: step.completed ? COLORS.SUCCESS : `${COLORS.ERROR}cc` }}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Action button */}
        <Link href="/complete-profile">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-all"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
              color: COLORS.BG_DEEP,
              boxShadow: `0 0 25px ${COLORS.GOLD}30, ${SHADOWS.BUTTON}`,
            }}
          >
            Complete Your Profile
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
