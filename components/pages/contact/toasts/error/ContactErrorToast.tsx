"use client";

import { DiyaIcon } from "@/components/pages/contact/sections/decor";

interface ContactErrorToastProps {
  message?: string;
}

export function ContactErrorToast({ message }: ContactErrorToastProps) {
  return (
    <div
      className="mx-auto flex w-[calc(100vw-32px)] items-start gap-3 rounded-lg px-3 py-3 sm:w-auto sm:max-w-[420px] sm:min-w-[320px] sm:gap-4 sm:rounded-xl sm:px-5 sm:py-4"
      style={{
        background: `linear-gradient(135deg, #1a0a12 0%, #2d0a18 50%, #1a0a12 100%)`,
        border: `1px solid #ff4444`,
        boxShadow: `
          0 0 20px rgba(255, 68, 68, 0.2),
          0 8px 30px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,68,68,0.1)
        `,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
        style={{
          background: `linear-gradient(135deg, #ff4444 0%, #cc2222 100%)`,
          boxShadow: `0 0 15px rgba(255,68,68,0.4)`,
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
            color: "#ff6b6b",
            textShadow: "0 0 10px rgba(255,107,107,0.3)",
          }}
        >
          Message Failed
        </p>
        <p
          className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed sm:mt-1 sm:text-xs"
          style={{ color: "rgba(255,220,220,0.8)" }}
        >
          {message || "Something went wrong. Please try again."}
        </p>
      </div>

      {/* Decorative diya - hidden on very small screens */}
      <DiyaIcon
        id="contact-error"
        className="xs:block hidden h-5 w-5 flex-shrink-0 opacity-70 sm:h-6 sm:w-6"
      />
    </div>
  );
}
