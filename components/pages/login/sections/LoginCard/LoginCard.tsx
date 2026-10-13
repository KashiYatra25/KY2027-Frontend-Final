"use client";

import { ROYAL_COLORS } from "@/components/pages/login/constants/palette";
import { CardHeader } from "@/components/pages/login/sections/LoginCard/CardHeader";
import { CardDescription } from "@/components/pages/login/sections/LoginCard/CardDescription";
import { GoogleSignInButton } from "@/components/pages/login/sections/LoginCard/GoogleSignInButton";
import { CardFooter } from "@/components/pages/login/sections/LoginCard/CardFooter";

interface LoginCardProps {
  onGoogleLogin: () => void;
}

export function LoginCard({ onGoogleLogin }: LoginCardProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-md lg:mx-0"
      style={{
        animation: "fadeInUp 0.6s ease-out",
      }}
    >
      {/* Ornate frame corners */}
      <div
        className="absolute -top-3 -left-3 h-12 w-12 rounded-tl-lg border-t-2 border-l-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />
      <div
        className="absolute -top-3 -right-3 h-12 w-12 rounded-tr-lg border-t-2 border-r-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />
      <div
        className="absolute -bottom-3 -left-3 h-12 w-12 rounded-bl-lg border-b-2 border-l-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />
      <div
        className="absolute -right-3 -bottom-3 h-12 w-12 rounded-br-lg border-r-2 border-b-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
        style={{
          background: `linear-gradient(145deg, ${ROYAL_COLORS.BG_ROYAL}95 0%, ${ROYAL_COLORS.BG_WINE}90 50%, ${ROYAL_COLORS.BG_ROYAL}95 100%)`,
          border: `1px solid ${ROYAL_COLORS.GOLD}40`,
          boxShadow: `
            0 0 60px ${ROYAL_COLORS.GOLD}15,
            0 25px 50px rgba(0,0,0,0.5),
            inset 0 1px 0 ${ROYAL_COLORS.GOLD}20
          `,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${ROYAL_COLORS.GOLD}08 0%, transparent 50%)`,
          }}
        />

        {/* Header */}
        <CardHeader />

        {/* Meaningful Text Content */}
        <CardDescription />

        {/* Google Sign In Button */}
        <GoogleSignInButton onClick={onGoogleLogin} />

        {/* Bottom decorative element */}
        <CardFooter />
      </div>
    </div>
  );
}
