"use client";

import { memo } from "react";
import Image from "next/image";
import { PALETTE, GRADIENTS } from "@/components/pages/sponsors/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// FOOTER SECTION - SPONSORS PAGE
// ═══════════════════════════════════════════════════════════════════

export const FooterSection = memo(function FooterSection() {
  return (
    <footer className="relative px-4 py-16 sm:px-6" style={{ background: PALETTE.DEEP_INK }}>
      {/* Top border */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${PALETTE.ELECTRIC_VIOLET}50, transparent)`,
        }}
      />

      <div className="mx-auto max-w-6xl text-center 2xl:max-w-7xl">
        {/* Logo */}
        <div
          className="mb-4 text-2xl font-bold tracking-tight whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cinzel-decorative), serif",
            background: GRADIENTS.TITLE,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          KASHIYATRA
        </div>

        {/* Tagline */}
        <p className="mb-6 text-sm tracking-wider" style={{ color: PALETTE.TEXT_MUTED }}>
          The Annual Socio-Cultural Festival • IIT (BHU), Varanasi
        </p>

        {/* Links */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          {["Home", "Events", "Gallery", "Contact"].map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="transition-colors hover:text-white"
              style={{ color: PALETTE.TEXT_MUTED }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mb-6 text-xs" style={{ color: PALETTE.TEXT_MUTED }}>
          © 2027 Kashiyatra. All rights reserved.
        </p>

        {/* Security Badge - Secured by RTS */}
        <div className="flex justify-center">
          <a
            href="https://rudrasec.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            {/* Outer glow effect */}
            <div
              className="absolute -inset-1 rounded-xl opacity-40 blur-lg transition-all duration-500 group-hover:opacity-70 group-hover:blur-xl"
              style={{
                background: `linear-gradient(135deg, ${PALETTE.ELECTRIC_VIOLET}50, ${PALETTE.NEON_CYAN}40)`,
              }}
            />

            {/* Main badge container */}
            <div
              className="relative flex items-center gap-4 rounded-xl border px-5 py-2.5 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,10,40,0.8))`,
                borderColor: `${PALETTE.ELECTRIC_VIOLET}30`,
                boxShadow: `0 0 20px ${PALETTE.ELECTRIC_VIOLET}15, inset 0 1px 0 ${PALETTE.ELECTRIC_VIOLET}20`,
              }}
            >
              {/* Shield icon with glow */}
              <div className="relative">
                <div
                  className="absolute inset-0 animate-pulse rounded-full blur-md"
                  style={{ background: `${PALETTE.ELECTRIC_VIOLET}35` }}
                />
                <svg
                  className="relative h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={PALETTE.NEON_CYAN}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" stroke={PALETTE.ELECTRIC_VIOLET} strokeWidth="2" />
                </svg>
              </div>

              {/* Text content */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium tracking-[0.15em] uppercase"
                    style={{ color: PALETTE.TEXT_MUTED }}
                  >
                    Secured by
                  </span>
                  <span
                    className="text-base font-black tracking-wider"
                    style={{
                      background: `linear-gradient(135deg, ${PALETTE.NEON_CYAN}, ${PALETTE.ELECTRIC_VIOLET})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    RTS
                  </span>
                </div>
                <span
                  className="text-[10px] tracking-wider opacity-50 transition-opacity group-hover:opacity-80"
                  style={{ color: PALETTE.NEON_CYAN }}
                >
                  rudrasec.in →
                </span>
              </div>

              {/* RTS Logo */}
              <div className="relative ml-1">
                <div
                  className="absolute inset-0 animate-pulse rounded-full blur-sm"
                  style={{ background: `${PALETTE.ELECTRIC_VIOLET}30` }}
                />
                <Image
                  src="/security/RTSf_logo.png"
                  alt="RTS Security"
                  width={32}
                  height={32}
                  className="relative object-contain"
                />
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
});
