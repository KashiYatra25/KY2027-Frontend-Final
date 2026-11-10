"use client";

import Image from "next/image";
import { ROYAL_COLORS } from "@/components/pages/login/constants/palette";

export function CardFooter() {
  return (
    <div className="relative z-10 mt-8">
      <div className="flex items-center justify-center gap-3">
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${ROYAL_COLORS.GOLD}40)`,
          }}
        />
        <span className="text-2xl">🪔</span>
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, ${ROYAL_COLORS.GOLD}40, transparent)`,
          }}
        />
      </div>
      <p
        className="mt-3 text-center text-xs tracking-wider"
        style={{ color: `${ROYAL_COLORS.GOLD}60` }}
      >
        ✦ IIT (BHU) Varanasi ✦
      </p>

      {/* Security Badge - Secured by RTS */}
      <div className="mt-6 flex justify-center">
        <a
          href="https://rudrasec.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          {/* Outer glow effect */}
          <div
            className="absolute -inset-1 rounded-xl opacity-30 blur-lg transition-all duration-500 group-hover:opacity-60 group-hover:blur-xl"
            style={{
              background: `linear-gradient(135deg, ${ROYAL_COLORS.GOLD}50, ${ROYAL_COLORS.HOT_PINK}40)`,
            }}
          />

          {/* Main badge container */}
          <div
            className="relative flex items-center gap-3 rounded-xl border px-4 py-2 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,15,5,0.6))`,
              borderColor: `${ROYAL_COLORS.GOLD}25`,
              boxShadow: `0 0 15px ${ROYAL_COLORS.GOLD}10, inset 0 1px 0 ${ROYAL_COLORS.GOLD}15`,
            }}
          >
            {/* Shield icon with glow */}
            <div className="relative">
              <div
                className="absolute inset-0 animate-pulse rounded-full blur-md"
                style={{ background: `${ROYAL_COLORS.GOLD}25` }}
              />
              <svg
                className="relative h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ROYAL_COLORS.GOLD}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" stroke={ROYAL_COLORS.HOT_PINK} strokeWidth="2" />
              </svg>
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[10px] font-medium tracking-[0.12em] uppercase"
                  style={{ color: `${ROYAL_COLORS.GOLD}60` }}
                >
                  Secured by
                </span>
                <span
                  className="text-sm font-black tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${ROYAL_COLORS.GOLD}, ${ROYAL_COLORS.HOT_PINK})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  RTS
                </span>
              </div>
              <span
                className="text-[9px] tracking-wider opacity-40 transition-opacity group-hover:opacity-70"
                style={{ color: ROYAL_COLORS.GOLD }}
              >
                rudrasec.in →
              </span>
            </div>

            {/* RTS Logo */}
            <div className="relative">
              <div
                className="absolute inset-0 animate-pulse rounded-full blur-sm"
                style={{ background: `${ROYAL_COLORS.HOT_PINK}20` }}
              />
              <Image
                src="/security/RTSf_logo.png"
                alt="RTS Security"
                width={24}
                height={24}
                className="relative object-contain"
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
