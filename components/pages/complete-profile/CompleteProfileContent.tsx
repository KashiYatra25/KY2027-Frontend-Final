"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { ThemedNavbar } from "@/components/navbar";
import {
  ACCOUNT_PROGRESS_WITH_STEPS_QUERY,
  type AccountProgressWithStepsQueryResponse,
} from "@/lib/api/graphql/queries/user.queries";
import Footer from "./Footer";
import { StepperIndicator } from "./StepperIndicator";
import { STEPS } from "./config/data";
import { COLORS } from "./constants/palette";
import { ErrorState } from "./error/ErrorState";
import { CompleteProfileLoader } from "./loader/CompleteProfileLoader";
import { CollegeDetailsStep } from "./steps/college/CollegeDetailsStep";
import { IdentityVerificationStep } from "./steps/identity";
import { PhoneVerificationStep } from "./steps/phone/PhoneVerificationStep";
import { CongratulationsPage, hasWelcomeBeenShown } from "./CongratulationsPage";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const TOTAL_STEPS = 3;

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function CompleteProfileContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<null | number>(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [checkedWelcome, setCheckedWelcome] = useState(false);

  const {
    data,
    loading: stepLoading,
    error,
    refetch: refetchProgress,
  } = useQuery<AccountProgressWithStepsQueryResponse>(ACCOUNT_PROGRESS_WITH_STEPS_QUERY, {
    fetchPolicy: "cache-first",
  });

  // Check if profile is complete and handle welcome page logic
  useEffect(() => {
    if (data?.myAccount?.progress.currentStep !== undefined) {
      const step = data.myAccount.progress.currentStep;
      setCurrentStep(step);

      // Profile is complete when currentStep > TOTAL_STEPS (all steps done)
      if (step > TOTAL_STEPS) {
        // Check if welcome has already been shown
        if (hasWelcomeBeenShown()) {
          // Redirect to profile page - no entry
          router.replace("/profile");
        } else {
          // Show congratulations page
          setShowCongratulations(true);
        }
      }
      setCheckedWelcome(true);
    }
  }, [data, router]);

  // Render loading or error content inside the styled wrapper
  const renderContent = () => {
    if (stepLoading || !checkedWelcome) {
      return <CompleteProfileLoader />;
    }

    if (error) {
      return <ErrorState />;
    }

    // Show congratulations page if profile is complete and welcome not shown yet
    if (showCongratulations) {
      return <CongratulationsPage />;
    }

    return (
      <>
        {/* Header */}
        <div className="mb-10 text-center">
          <h1
            className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 50%, ${COLORS.GOLD} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Complete Your Profile
          </h1>
          <p style={{ color: `${COLORS.CREAM}60` }}>
            Just a few steps to unlock the full Kashi Yatra experience
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="mb-10">
          <StepperIndicator
            steps={STEPS}
            currentStep={data?.myAccount?.progress.currentStep}
            completedSteps={data?.myAccount?.progress.completedSteps}
          />
        </div>

        {/* Step Content Card */}
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_WINE}60 0%, ${COLORS.BG_ROYAL}80 100%)`,
            border: `1px solid ${COLORS.GOLD}20`,
            boxShadow: `0 0 60px ${COLORS.GOLD}05, 0 25px 50px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Decorative top border */}
          <div
            className="h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}60, transparent)`,
            }}
          />

          <div className="p-6 sm:p-10">
            {/* Step Content - 3 Steps: College (1) → Identity (2) → Phone (3) */}
            {currentStep === 1 && <CollegeDetailsStep refetchProgress={refetchProgress} />}
            {currentStep === 2 && (
              <IdentityVerificationStep
                refetchProgress={refetchProgress}
                lockedMethod={data?.myAccount?.progress.identityVerificationMethod ?? null}
              />
            )}
            {currentStep === 3 && <PhoneVerificationStep refetchProgress={refetchProgress} />}
          </div>
        </div>

        {/* Footer Decoration */}
        <Footer />
      </>
    );
  };

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      {/* Main content with background - always rendered */}
      <main
        className="min-h-screen px-4 pt-28 pb-12 sm:pt-32"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.08) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="mx-auto max-w-4xl lg:max-w-5xl 2xl:max-w-6xl">{renderContent()}</div>
      </main>
    </>
  );
}
