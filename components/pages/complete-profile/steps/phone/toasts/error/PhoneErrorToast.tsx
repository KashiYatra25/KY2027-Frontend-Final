"use client";

export function PhoneErrorToast() {
  return (
    <div
      className="mx-auto flex w-[calc(100vw-32px)] items-start gap-3 rounded-lg px-3 py-3 sm:w-auto sm:max-w-[420px] sm:min-w-[320px] sm:gap-4 sm:rounded-xl sm:px-5 sm:py-4"
      style={{
        background: `linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 50%, #1a0a0a 100%)`,
        border: `1px solid #ef4444`,
        boxShadow: `
          0 0 20px rgba(239, 68, 68, 0.2),
          0 8px 30px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(239,68,68,0.1)
        `,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
        style={{
          background: `linear-gradient(135deg, #ef4444 0%, #dc2626 100%)`,
          boxShadow: `0 0 15px rgba(239,68,68,0.4)`,
        }}
      >
        <svg
          className="h-4 w-4 text-white sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-0.5">
        <p
          className="text-xs font-semibold tracking-wide sm:text-sm"
          style={{
            color: "#f87171",
            textShadow: "0 0 10px rgba(248,113,113,0.3)",
          }}
        >
          Failed to Save
        </p>
        <p
          className="mt-0.5 text-[11px] leading-relaxed sm:mt-1 sm:text-xs"
          style={{ color: "rgba(255,220,220,0.8)" }}
        >
          Unable to save phone number. Please try again.
        </p>
      </div>
    </div>
  );
}
