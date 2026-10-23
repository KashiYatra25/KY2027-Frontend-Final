"use client";

import { VerifiedIdIcon } from "../icons";

export function AadhaarVerifySuccessToast() {
  return (
    <div
      className="relative mx-auto flex w-[calc(100vw-32px)] items-start gap-3 overflow-hidden rounded-xl px-4 py-3 sm:w-auto sm:max-w-[440px] sm:min-w-[340px] sm:gap-4 sm:px-5 sm:py-4"
      style={{
        background: `linear-gradient(145deg, #0a1a12 0%, #0d2818 40%, #0a1a12 100%)`,
        border: `1px solid rgba(34, 197, 94, 0.6)`,
        boxShadow: `
          0 0 40px rgba(34, 197, 94, 0.2),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(34,197,94,0.2)
        `,
      }}
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
        style={{
          background: `linear-gradient(145deg, #134e2a 0%, #0a2d18 100%)`,
          border: `1px solid rgba(34,197,94,0.5)`,
          boxShadow: `0 0 20px rgba(34,197,94,0.3)`,
        }}
      >
        <VerifiedIdIcon className="h-9 w-9 sm:h-10 sm:w-10" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-1">
        <p
          className="text-sm font-bold tracking-wide sm:text-base"
          style={{
            color: "#4ade80",
            textShadow: "0 0 20px rgba(74,222,128,0.5)",
          }}
        >
          Aadhaar Verified
        </p>
        <p
          className="mt-1 text-xs leading-relaxed sm:text-sm"
          style={{ color: "rgba(200,255,200,0.8)" }}
        >
          Your identity has been successfully verified
        </p>

        {/* Security badge */}
        <div
          className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5"
          style={{
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#22c55e">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
          <span className="text-[10px] font-medium" style={{ color: "#4ade80" }}>
            Securely Processed
          </span>
        </div>
      </div>

      {/* Celebration particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-1 w-1 rounded-full"
          style={{
            background: "#4ade80",
            top: "20%",
            left: "80%",
            boxShadow: "0 0 4px #4ade80",
          }}
        />
        <div
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            background: "#22c55e",
            top: "70%",
            left: "85%",
            boxShadow: "0 0 6px #22c55e",
          }}
        />
      </div>
    </div>
  );
}
