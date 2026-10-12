"use client";

import { Mail, User, Shield, Calendar, Phone, GraduationCap, FileCheck } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { UserProfile, UserAccountProgress, ProfileUser } from "@/lib/api/helper/types";
import { InfoCard } from "./InfoCard";
import { VerificationStep } from "./VerificationStep";

// ═══════════════════════════════════════════════════════════════════
// DETAILED INFO SECTION
// Account information cards and verification status
// ═══════════════════════════════════════════════════════════════════

interface DetailedInfoProps {
  userData: UserProfile | null;
  user: ProfileUser;
  progress: UserAccountProgress | null;
}

export function DetailedInfo({ userData, user, progress }: DetailedInfoProps) {
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mt-10 mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Account Info Cards */}
      <div className="space-y-4 lg:col-span-2">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
          <h3
            className="flex shrink-0 items-center gap-3 text-lg font-semibold"
            style={{ color: COLORS.CREAM }}
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <User className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            </div>
            <span style={{ fontFamily: "var(--font-ethereal), serif" }}>Account Information</span>
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard
            icon={Mail}
            label="Email Address"
            value={userData?.email || user.email || null}
            isVerified
          />
          <InfoCard
            icon={Phone}
            label="Phone Number"
            value={userData?.phone || null}
            isVerified={progress?.steps.phone}
          />
          <InfoCard
            icon={GraduationCap}
            label="College"
            value={userData?.college || null}
            isVerified={progress?.steps.college}
          />
          <InfoCard
            icon={Shield}
            label="Aadhaar (Last 4)"
            value={userData?.aadhaarNumber ? `XXXX XXXX ${userData.aadhaarNumber.slice(-4)}` : null}
            isVerified={progress?.steps.aadhaarVerified}
          />
          <InfoCard
            icon={Calendar}
            label="Member Since"
            value={formatDate(userData?.joinedAt || null)}
          />
          <InfoCard icon={User} label="Gender" value={userData?.gender || null} />
        </div>
      </div>

      {/* Right Column - Verification Status */}
      <div className="space-y-4">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
          <h3
            className="flex shrink-0 items-center gap-3 text-lg font-semibold"
            style={{ color: COLORS.CREAM }}
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <FileCheck className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            </div>
            <span style={{ fontFamily: "var(--font-ethereal), serif" }}>Verification</span>
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
        </div>

        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
            border: `1px solid ${COLORS.GOLD}20`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
          }}
        >
          {/* Decorative corner accents */}
          <div
            className="absolute top-2 left-2 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute top-2 right-2 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute bottom-2 left-2 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute right-2 bottom-2 h-6 w-6 rounded-br-lg border-r-2 border-b-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />

          <div className="relative space-y-3">
            <VerificationStep
              icon={Shield}
              label="Aadhaar Verified"
              isCompleted={progress?.steps.aadhaarVerified || false}
              description={
                progress?.steps.aadhaarVerified ? "Identity confirmed" : "Upload your Aadhaar"
              }
            />
            <VerificationStep
              icon={GraduationCap}
              label="College Details"
              isCompleted={progress?.steps.college || false}
              description={progress?.steps.college ? "Institution verified" : "Add your college"}
            />
            <VerificationStep
              icon={Phone}
              label="Phone Verified"
              isCompleted={progress?.steps.phone || false}
              description={progress?.steps.phone ? "Contact confirmed" : "Verify your number"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
