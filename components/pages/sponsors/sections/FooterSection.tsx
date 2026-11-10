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
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://rudrasec.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-row items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/security/RTSf_logo.png"
              alt="RTS Security"
              width={32}
              height={32}
              className="object-contain"
            />
            <span
              className="flex items-center gap-2 text-xs tracking-wider"
              style={{ color: PALETTE.TEXT_MUTED }}
            >
              <svg
                className="h-3.5 w-3.5 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secured by <span className="font-bold">RTS</span>
            </span>
          </a>
          <a
            href="https://rudrasec.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-wider underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: PALETTE.TEXT_MUTED }}
          >
            rudrasec.in
          </a>
        </div>
      </div>
    </footer>
  );
});
