"use client";

import { motion } from "framer-motion";
import { COLORS, SHADOWS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION - Title with camera illustration
// ═══════════════════════════════════════════════════════════════════

export function HeroSection() {
  return (
    <header className="relative z-10 px-4 pt-24 pb-8 sm:px-6 sm:pt-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        {/* Eyebrow text with fade in */}
        <motion.p
          className="mb-3 font-mono text-xs tracking-[0.18em] uppercase sm:mb-4"
          style={{ color: COLORS.MARIGOLD }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Last edition
        </motion.p>

        {/* Main title with dramatic reveal */}
        <motion.h1
          className="font-serif text-[clamp(72px,17vw,190px)] leading-[0.92] font-normal tracking-tight"
          style={{
            color: COLORS.PAPER,
            textShadow: SHADOWS.TITLE_TEXT,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Gallery
        </motion.h1>

        {/* Tagline with slide up */}
        <motion.p
          className="mt-5 max-w-[19ch] font-serif text-[clamp(22px,3.4vw,38px)] leading-[1.2] font-medium text-balance italic sm:mt-6"
          style={{
            color: COLORS.TEXT,
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          A collection of Moments to tell the story of{" "}
          <em
            className="not-italic"
            style={{
              color: COLORS.MARIGOLD,
              fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
            }}
          >
            Kashiyatra
          </em>
        </motion.p>

        {/* Animated camera illustration - positioned top right */}
        <CameraIllustration />
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CAMERA ILLUSTRATION - Decorative vintage camera with floating effect
// ═══════════════════════════════════════════════════════════════════

function CameraIllustration() {
  return (
    <div
      className="pointer-events-none absolute top-[clamp(8px,1.2vw,16px)] right-[clamp(-26px,-2.6vw,-8px)] z-20 w-[clamp(150px,29vw,360px)] origin-[70%_20%] rotate-[9deg] select-none md:w-[clamp(150px,24vw,300px)]"
      aria-hidden="true"
    >
      {/* Glow behind camera */}
      <div
        className="absolute inset-[-12%] -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(245,166,35,0.24), rgba(0,0,0,0.18) 60%, transparent 78%)",
        }}
      />

      {/* Camera SVG - simplified version */}
      <svg
        viewBox="0 0 330 270"
        className="camera-bob block h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cam-sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6e6c4" />
            <stop offset=".45" stopColor="#c8a266" />
            <stop offset="1" stopColor="#6e4c2a" />
          </linearGradient>
          <linearGradient id="cam-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b2c31" />
            <stop offset="1" stopColor="#140910" />
          </linearGradient>
          <radialGradient id="cam-glass" cx=".42" cy=".36" r=".72">
            <stop offset="0" stopColor="#ffd283" />
            <stop offset=".3" stopColor="#c26f20" />
            <stop offset=".7" stopColor="#3d1a10" />
            <stop offset="1" stopColor="#0f0508" />
          </radialGradient>
          <radialGradient id="cam-halo">
            <stop offset="0" stopColor="#ffb347" stopOpacity=".85" />
            <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Patterned paper scraps */}
        <g transform="rotate(7 205 40)">
          <rect x="150" y="8" width="125" height="64" fill="#8a1d5f" />
        </g>
        <g transform="rotate(-5 275 100)">
          <rect x="222" y="62" width="100" height="62" fill="#df9028" />
        </g>

        {/* Ribbon */}
        <path
          d="M8 212 C60 176 118 246 190 214 C228 198 262 200 322 232"
          fill="none"
          stroke="#6d1124"
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Camera body */}
        <g transform="translate(34 40)">
          {/* Side handles */}
          <rect x="-10" y="56" width="12" height="22" rx="3" fill="url(#cam-sil)" />
          <rect x="248" y="56" width="12" height="22" rx="3" fill="url(#cam-sil)" />

          {/* Top viewfinder */}
          <path
            d="M84 34 L98 8 Q125 0 152 8 L166 34Z"
            fill="url(#cam-sil)"
            stroke="#6a4a2a"
            strokeWidth="1.5"
          />
          <rect x="112" y="14" width="26" height="10" rx="2" fill="#24150f" />
          <circle cx="125" cy="19" r="3" fill="#ffcf84" opacity=".85" />

          {/* Top bar */}
          <rect
            x="0"
            y="32"
            width="250"
            height="30"
            rx="8"
            fill="url(#cam-sil)"
            stroke="#6a4a2a"
            strokeWidth="1.5"
          />
          <circle cx="226" cy="26" r="9" fill="url(#cam-sil)" stroke="#6a4a2a" />
          <circle cx="226" cy="26" r="4" fill="#e84a3a" />

          {/* Main body */}
          <rect
            x="0"
            y="62"
            width="250"
            height="100"
            rx="12"
            fill="url(#cam-body)"
            stroke="#6a4a2a"
            strokeWidth="1.5"
          />

          {/* Lens halo (animated glow) */}
          <circle cx="125" cy="108" r="74" fill="url(#cam-halo)" className="lens-glow" />

          {/* Lens rings */}
          <circle cx="125" cy="104" r="60" fill="#3a2a2e" stroke="#6a4a2a" strokeWidth="2" />
          <circle cx="125" cy="104" r="53" fill="none" stroke="url(#cam-sil)" strokeWidth="5" />
          <circle cx="125" cy="104" r="42" fill="#0c0508" />
          <circle cx="125" cy="104" r="36" fill="url(#cam-glass)" />
          <circle cx="125" cy="104" r="12" fill="#0d0508" />

          {/* Lens reflections */}
          <ellipse
            cx="110"
            cy="90"
            rx="12"
            ry="6"
            fill="#fff"
            opacity=".6"
            transform="rotate(-35 110 90)"
          />
          <circle cx="142" cy="120" r="3" fill="#ffe0a0" opacity=".7" />
        </g>

        {/* Flash sparkle */}
        <path
          className="camera-flash"
          d="M300 22 L304 36 L318 40 L304 44 L300 58 L296 44 L282 40 L296 36Z"
          fill="#fff3cf"
        />
      </svg>
    </div>
  );
}
