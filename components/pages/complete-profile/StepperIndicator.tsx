import { Check } from "lucide-react";
import { COLORS } from "./constants/palette";
import { STEPS, type StepConfig } from "./config/data";

// ═══════════════════════════════════════════════════════════════════
// STEPPER INDICATOR COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function StepperIndicator({
  steps,
  currentStep = 1,
  completedSteps = 0,
}: {
  steps: StepConfig[];
  currentStep?: number;
  completedSteps?: number;
}) {
  return (
    <div className="relative">
      {/* Desktop Stepper */}
      <div className="hidden items-center justify-center gap-0 md:flex">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep || index < completedSteps;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 ease-out ${isCurrent ? "scale-110" : ""} `}
                  style={{
                    background: isCompleted
                      ? `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`
                      : isCurrent
                        ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD_DARK})`
                        : `${COLORS.BG_ROYAL}`,
                    border: `2px solid ${
                      isCompleted ? COLORS.SUCCESS : isCurrent ? COLORS.GOLD : `${COLORS.GOLD}30`
                    }`,
                    boxShadow: isCurrent
                      ? `0 0 30px ${COLORS.GOLD}50, 0 0 60px ${COLORS.GOLD}20`
                      : isCompleted
                        ? `0 0 20px ${COLORS.SUCCESS}30`
                        : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6 text-white" strokeWidth={3} />
                  ) : (
                    <step.icon
                      className="h-6 w-6"
                      color={isCurrent ? COLORS.BG_DEEP : `${COLORS.GOLD}60`}
                    />
                  )}

                  {/* Pulse animation for current step */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 animate-ping rounded-full"
                      style={{
                        background: `${COLORS.GOLD}20`,
                        animationDuration: "2s",
                      }}
                    />
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: isCurrent || isCompleted ? COLORS.GOLD : `${COLORS.CREAM}50`,
                    }}
                  >
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: `${COLORS.CREAM}40` }}>
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className="mx-2 -mt-8 h-0.5 w-20"
                  style={{
                    background: isCompleted
                      ? `linear-gradient(90deg, ${COLORS.SUCCESS}, ${
                          steps[index + 1].id < currentStep || index + 1 < completedSteps
                            ? COLORS.SUCCESS
                            : `${COLORS.GOLD}30`
                        })`
                      : `${COLORS.GOLD}20`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper - Compact */}
      <div className="md:hidden">
        <div className="mb-4 flex items-center justify-center">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep || index < completedSteps;
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300`}
                  style={{
                    background: isCompleted
                      ? `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`
                      : isCurrent
                        ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD_DARK})`
                        : `${COLORS.BG_ROYAL}`,
                    border: `2px solid ${
                      isCompleted ? COLORS.SUCCESS : isCurrent ? COLORS.GOLD : `${COLORS.GOLD}30`
                    }`,
                    boxShadow: isCurrent ? `0 0 20px ${COLORS.GOLD}40` : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: isCurrent ? COLORS.BG_DEEP : `${COLORS.GOLD}60`,
                      }}
                    >
                      {step.id}
                    </span>
                  )}
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className="mx-2 h-0.5 w-16 sm:w-20"
                    style={{
                      background: isCompleted
                        ? `linear-gradient(90deg, ${COLORS.SUCCESS}, ${
                            steps[index + 1].id < currentStep || index + 1 < completedSteps
                              ? COLORS.SUCCESS
                              : `${COLORS.GOLD}30`
                          })`
                        : `${COLORS.GOLD}20`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current Step Title */}
        <div className="text-center">
          <p className="text-lg font-semibold" style={{ color: COLORS.GOLD }}>
            {STEPS[currentStep - 1]?.title}
          </p>
          <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}
