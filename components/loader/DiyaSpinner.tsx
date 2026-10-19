"use client";

/**
 * DiyaSpinner - The shared loader visual used across the app.
 *
 * This is the exact spinning-diya-ring markup that PageLoader renders.
 * It is kept as a standalone presentational component so both the global
 * route-transition overlay (PageLoader) and in-page "data is loading"
 * states (e.g. the schedule page) show the SAME loader.
 *
 * Purely presentational: no state, no effects, no overlay/scroll-lock.
 */

interface DiyaSpinnerProps {
  /** Optional label shown under the spinner. When omitted, no text is rendered. */
  label?: string;
}

export function DiyaSpinner({ label }: DiyaSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Spinning diya ring */}
      <div className="relative h-20 w-20">
        {/* Outer spinning ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "#FFD700",
            borderRightColor: "rgba(255,215,0,0.3)",
            animation: "loaderSpin 1s linear infinite",
          }}
        />
        {/* Inner spinning ring (opposite direction) */}
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent"
          style={{
            borderBottomColor: "#FF6B00",
            borderLeftColor: "rgba(255,107,0,0.3)",
            animation: "loaderSpin 0.8s linear infinite reverse",
          }}
        />
        {/* Center diya flame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-6 w-4 rounded-full"
            style={{
              background: "linear-gradient(to top, #FF6B00, #FFD700, #FFF8DC)",
              boxShadow: "0 0 20px rgba(255,180,0,0.8), 0 0 40px rgba(255,107,0,0.5)",
              animation: "flameFlicker 0.3s ease-in-out infinite alternate",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
          />
        </div>
      </div>

      {/* Optional text - only rendered when a label is provided */}
      {label ? (
        <p
          className="text-sm tracking-[0.3em]"
          style={{
            fontFamily: "var(--font-ethereal), serif",
            color: "#FFD700",
            textShadow: "0 0 10px rgba(255,215,0,0.5)",
          }}
        >
          {label}
        </p>
      ) : null}
    </div>
  );
}
