"use client";

import { UploadDocIcon } from "../icons";

export function AadhaarUploadSuccessToast() {
  return (
    <div
      className="relative mx-auto flex w-[calc(100vw-32px)] items-start gap-3 overflow-hidden rounded-xl px-4 py-3 sm:w-auto sm:max-w-[440px] sm:min-w-[340px] sm:gap-4 sm:px-5 sm:py-4"
      style={{
        background: `linear-gradient(145deg, #0a1a12 0%, #0d2818 40%, #0a1a12 100%)`,
        border: `1px solid rgba(34, 197, 94, 0.5)`,
        boxShadow: `
          0 0 30px rgba(34, 197, 94, 0.15),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(34,197,94,0.15)
        `,
      }}
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
        style={{
          background: `linear-gradient(145deg, #134e2a 0%, #0a2d18 100%)`,
          border: `1px solid rgba(34,197,94,0.4)`,
        }}
      >
        <UploadDocIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-1">
        <p
          className="text-sm font-bold tracking-wide sm:text-base"
          style={{
            color: "#4ade80",
            textShadow: "0 0 20px rgba(74,222,128,0.4)",
          }}
        >
          Document Uploaded
        </p>
        <p
          className="mt-1 text-xs leading-relaxed sm:text-sm"
          style={{ color: "rgba(200,255,200,0.7)" }}
        >
          Your Aadhaar is being processed securely
        </p>
      </div>

      {/* Glow effect */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />
    </div>
  );
}
