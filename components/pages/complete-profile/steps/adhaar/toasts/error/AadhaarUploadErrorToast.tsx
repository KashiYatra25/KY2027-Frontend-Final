"use client";

import { UploadErrorIcon } from "../icons";

export function AadhaarUploadErrorToast() {
  return (
    <div
      className="relative mx-auto flex w-[calc(100vw-32px)] items-start gap-3 overflow-hidden rounded-xl px-4 py-3 sm:w-auto sm:max-w-[440px] sm:min-w-[340px] sm:gap-4 sm:px-5 sm:py-4"
      style={{
        background: `linear-gradient(145deg, #1a0a0e 0%, #2d0a12 40%, #1a0a0e 100%)`,
        border: `1px solid rgba(239, 68, 68, 0.5)`,
        boxShadow: `
          0 0 30px rgba(239, 68, 68, 0.15),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(239,68,68,0.15)
        `,
      }}
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
        style={{
          background: `linear-gradient(145deg, #4e1a1a 0%, #2d0a12 100%)`,
          border: `1px solid rgba(239,68,68,0.4)`,
        }}
      >
        <UploadErrorIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-1">
        <p
          className="text-sm font-bold tracking-wide sm:text-base"
          style={{
            color: "#f87171",
            textShadow: "0 0 20px rgba(248,113,113,0.4)",
          }}
        >
          Upload Failed
        </p>
        <p
          className="mt-1 text-xs leading-relaxed sm:text-sm"
          style={{ color: "rgba(255,200,200,0.7)" }}
        >
          Unable to upload document. Please try again.
        </p>
      </div>
    </div>
  );
}
