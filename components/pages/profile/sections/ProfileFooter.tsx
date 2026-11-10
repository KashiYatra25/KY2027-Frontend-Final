"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { LogOut, Loader2 } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PROFILE FOOTER SECTION
// Sign out button and decorative footer
// ═══════════════════════════════════════════════════════════════════

interface ProfileFooterProps {
  isSigningOut: boolean;
  handleSignOut: () => void;
}

export function ProfileFooter({ isSigningOut, handleSignOut }: ProfileFooterProps) {
  return (
    <>
      {/* Sign Out Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-10 py-4 font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          style={{
            background: `linear-gradient(135deg, ${COLORS.ERROR}10 0%, ${COLORS.MAROON}30 100%)`,
            border: `1px solid ${COLORS.ERROR}30`,
            color: "#fca5a5",
            boxShadow: `0 4px 20px ${COLORS.ERROR}10`,
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${COLORS.ERROR}15 0%, transparent 70%)`,
            }}
          />

          <span className="relative flex items-center gap-3">
            {isSigningOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            )}
            <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
          </span>
        </button>
      </div>

      {/* Royal Footer */}
      <div className="mt-16 flex flex-col items-center">
        {/* Ornate divider */}
        <div className="flex w-full max-w-lg items-center justify-center gap-5">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}50)`,
            }}
          />
          <div className="flex items-center gap-4">
            <span className="text-xl opacity-60">✦</span>
            <div className="relative h-10 w-10">
              <Image
                src={IMAGES.contact.floatingDiya}
                alt=""
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl opacity-60">✦</span>
          </div>
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, ${COLORS.GOLD}50, transparent)`,
            }}
          />
        </div>

        {/* Blessing */}
        <p className="mt-4 text-center text-sm italic" style={{ color: `${COLORS.GOLD}50` }}>
          Lead me from the unreal to the real
        </p>

        <p
          className="mt-2 text-center text-xs tracking-[0.2em]"
          style={{ color: `${COLORS.GOLD}40` }}
        >
          Kashi Yatra 2027 • IIT (BHU) Varanasi
        </p>

        {/* Security Badge - Secured by RTS */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <a
            href="https://rudrasec.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/security/RTSf_logo.png"
              alt="RTS Security"
              width={28}
              height={28}
              className="object-contain"
            />
            <span
              className="flex items-center gap-2 text-xs tracking-wider"
              style={{ color: `${COLORS.GOLD}50` }}
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
            style={{ color: `${COLORS.GOLD}50` }}
          >
            rudrasec.in
          </a>
        </div>
      </div>
    </>
  );
}
