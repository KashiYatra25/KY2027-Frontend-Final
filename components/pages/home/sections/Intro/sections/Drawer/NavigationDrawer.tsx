"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

/**
 * Navigation drawer that slides up from bottom
 * Shows during video phase
 */
export function NavigationDrawer() {
  const { phase, completeIntro } = useIntro();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!session?.user;

  // Only show during video phase
  if (phase !== "video") return null;

  const handleEnterKashi = () => {
    completeIntro();
  };

  // Mark intro as seen when clicking any navigation link
  const handleLinkClick = () => {
    completeIntro();
  };

  return (
    <>
      {/* Pull Tab */}
      <motion.div
        className="fixed bottom-0 left-1/2 z-40 -translate-x-1/2"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          drag="y"
          dragConstraints={{ top: -50, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.y < -30) {
              setIsOpen(true);
            }
          }}
          className="flex cursor-grab items-center gap-2 rounded-t-xl px-6 py-2.5 backdrop-blur-md transition-all hover:bg-white/10 active:cursor-grabbing"
          style={{
            background:
              "linear-gradient(180deg, rgba(30, 20, 40, 0.95) 0%, rgba(20, 10, 30, 0.98) 100%)",
            border: "1px solid rgba(255, 200, 100, 0.3)",
            borderBottom: "none",
          }}
        >
          {/* Animated dots */}
          <div className="flex gap-0.5">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 w-1 rounded-full bg-amber-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          <span className="text-xs font-medium tracking-[0.15em] text-white/70 uppercase">
            {isOpen ? "Close Panel" : "Pull Up"}
          </span>

          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-amber-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-amber-400" />
          )}
        </motion.button>
      </motion.div>

      {/* Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 left-1/2 z-30 w-full max-w-4xl -translate-x-1/2 px-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                setIsOpen(false);
              }
            }}
          >
            <div className="overflow-hidden rounded-t-2xl">
              {/* Rainbow top border */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd)",
                }}
              />

              {/* Main Panel */}
              <div
                className="p-5 pb-6"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(25, 15, 35, 0.98) 0%, rgba(15, 8, 25, 0.99) 100%)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Header with Enter Kashi Button */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    <span className="text-sm font-bold tracking-wider text-amber-400">
                      KASHI YATRA
                    </span>
                    <span className="text-xs text-white/40">KY-27</span>
                  </div>

                  {/* Enter Kashi Button */}
                  <motion.button
                    onClick={handleEnterKashi}
                    className="group flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all"
                    style={{
                      background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                      color: "#1a0a20",
                      boxShadow: "0 4px 15px rgba(255, 200, 100, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xs tracking-wider">ENTER KASHI</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>

                {/* Main Navigation Grid */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Profile/Register Card - Changes based on auth status */}
                  {isLoggedIn ? (
                    // PROFILE Card - shown when logged in
                    <Link href="/profile" className="group block" onClick={handleLinkClick}>
                      <div
                        className="relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 group-hover:scale-[1.02]"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(100, 200, 150, 0.1) 0%, rgba(30, 50, 40, 0.8) 100%)",
                          border: "1px solid rgba(100, 200, 150, 0.3)",
                        }}
                      >
                        {/* Decorative User/Profile Visual - Custom SVG */}
                        <div className="absolute top-1/2 left-4 h-24 w-20 -translate-y-1/2 opacity-70">
                          <svg viewBox="0 0 80 100" className="h-full w-full">
                            <defs>
                              <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.7" />
                              </linearGradient>
                            </defs>
                            {/* Avatar circle */}
                            <circle cx="40" cy="35" r="18" fill="url(#profileGrad)" />
                            {/* Body shape */}
                            <path d="M15 85 Q15 60 40 55 Q65 60 65 85" fill="url(#profileGrad)" />
                            {/* Decorative stars */}
                            <circle cx="15" cy="25" r="3" fill="#FFD700" opacity="0.7" />
                            <circle cx="65" cy="30" r="2" fill="#FFD700" opacity="0.5" />
                            <circle cx="60" cy="20" r="2.5" fill="#FFD700" opacity="0.6" />
                          </svg>
                        </div>

                        <div className="ml-24">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-400" />
                            <span className="text-xs tracking-wider text-green-400">
                              YOUR SPACE
                            </span>
                          </div>
                          <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                            PROFILE
                          </h3>
                          <p className="text-sm text-white/50">View your Kashi Yatra profile</p>
                        </div>

                        <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-green-400/30 transition-transform group-hover:translate-x-1">
                          <span className="text-lg text-green-400">→</span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // REGISTER Card - shown when not logged in, links to /login
                    <Link href="/login" className="group block" onClick={handleLinkClick}>
                      <div
                        className="relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 group-hover:scale-[1.02]"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 100, 150, 0.1) 0%, rgba(40, 20, 60, 0.8) 100%)",
                          border: "1px solid rgba(255, 100, 150, 0.3)",
                        }}
                      >
                        {/* Decorative Ticket/Pass Visual - Custom SVG */}
                        <div className="absolute top-1/2 left-4 h-24 w-20 -translate-y-1/2 opacity-70">
                          <svg viewBox="0 0 80 100" className="h-full w-full">
                            <defs>
                              <linearGradient id="registerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#FFA500" stopOpacity="0.7" />
                              </linearGradient>
                            </defs>
                            {/* Ticket shape */}
                            <rect
                              x="10"
                              y="15"
                              width="60"
                              height="70"
                              rx="6"
                              fill="url(#registerGrad)"
                            />
                            {/* Ticket notches */}
                            <circle cx="10" cy="50" r="8" fill="#1a0a20" />
                            <circle cx="70" cy="50" r="8" fill="#1a0a20" />
                            {/* Dotted line */}
                            <line
                              x1="20"
                              y1="50"
                              x2="60"
                              y2="50"
                              stroke="#1a0a20"
                              strokeWidth="2"
                              strokeDasharray="4 3"
                            />
                            {/* Star decoration */}
                            <path
                              d="M40 25 L43 33 L52 33 L45 39 L48 48 L40 43 L32 48 L35 39 L28 33 L37 33 Z"
                              fill="#FFF"
                              opacity="0.9"
                            />
                            {/* Text lines */}
                            <rect
                              x="22"
                              y="60"
                              width="36"
                              height="4"
                              rx="2"
                              fill="#1a0a20"
                              opacity="0.5"
                            />
                            <rect
                              x="28"
                              y="68"
                              width="24"
                              height="3"
                              rx="1.5"
                              fill="#1a0a20"
                              opacity="0.3"
                            />
                          </svg>
                        </div>

                        <div className="ml-24">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-pink-400" />
                            <span className="text-xs tracking-wider text-pink-400">JOIN NOW</span>
                          </div>
                          <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                            REGISTER
                          </h3>
                          <p className="text-sm text-white/50">Get your pass for Kashi Yatra</p>
                        </div>

                        <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-pink-400/30 transition-transform group-hover:translate-x-1">
                          <span className="text-lg text-pink-400">→</span>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Events Card - with Diya/Lamp Visual */}
                  <Link href="/events" className="group block" onClick={handleLinkClick}>
                    <div
                      className="relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 group-hover:scale-[1.02]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(80, 200, 200, 0.1) 0%, rgba(30, 40, 60, 0.8) 100%)",
                        border: "1px solid rgba(80, 200, 200, 0.2)",
                      }}
                    >
                      {/* Decorative Diya Visual - Static SVG */}
                      <div className="absolute top-1/2 left-4 h-24 w-20 -translate-y-1/2 opacity-80">
                        <svg viewBox="0 0 80 100" className="h-full w-full">
                          <defs>
                            <linearGradient id="diyaGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFD700" />
                              <stop offset="100%" stopColor="#FF8C00" />
                            </linearGradient>
                            <radialGradient id="flameGrad2" cx="50%" cy="70%" r="50%">
                              <stop offset="0%" stopColor="#FFF" />
                              <stop offset="40%" stopColor="#FFD700" />
                              <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Main diya */}
                          <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#diyaGrad2)" />
                          <path d="M25 70 Q40 55 55 70" fill="url(#diyaGrad2)" />
                          <ellipse
                            cx="40"
                            cy="45"
                            rx="12"
                            ry="20"
                            fill="url(#flameGrad2)"
                            className="animate-pulse"
                          />

                          {/* Small side diyas */}
                          <ellipse
                            cx="15"
                            cy="85"
                            rx="8"
                            ry="4"
                            fill="url(#diyaGrad2)"
                            opacity="0.6"
                          />
                          <ellipse
                            cx="15"
                            cy="75"
                            rx="5"
                            ry="8"
                            fill="url(#flameGrad2)"
                            opacity="0.7"
                          />

                          <ellipse
                            cx="65"
                            cy="85"
                            rx="8"
                            ry="4"
                            fill="url(#diyaGrad2)"
                            opacity="0.6"
                          />
                          <ellipse
                            cx="65"
                            cy="75"
                            rx="5"
                            ry="8"
                            fill="url(#flameGrad2)"
                            opacity="0.7"
                          />
                        </svg>
                      </div>

                      <div className="ml-24">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-cyan-400" />
                          <span className="text-xs tracking-wider text-cyan-400">EXPLORE</span>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">EVENTS</h3>
                        <p className="text-sm text-white/50">
                          Competitions, performances & celebrations
                        </p>
                      </div>

                      <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 transition-transform group-hover:translate-x-1">
                        <span className="text-lg text-cyan-400">→</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Quick Links Row */}
                <div className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  <QuickLink
                    href="/schedule"
                    label="Schedule"
                    number="03"
                    color="#feca57"
                    onClick={handleLinkClick}
                    icon={
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                      </svg>
                    }
                  />
                  <QuickLink
                    href="/contact"
                    label="Contact"
                    number="04"
                    color="#48dbfb"
                    onClick={handleLinkClick}
                    icon={
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    }
                  />
                  <QuickLink
                    href="/sponsors"
                    label="Sponsors"
                    number="05"
                    color="#ff9ff3"
                    onClick={handleLinkClick}
                    icon={
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                      </svg>
                    }
                  />
                  <QuickLink
                    href="/passes"
                    label="Passes"
                    number="06"
                    color="#54a0ff"
                    onClick={handleLinkClick}
                    icon={
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full"
                      >
                        <path d="M2 9a3 3 0 013-3h14a3 3 0 013 3" />
                        <path d="M2 9v9a3 3 0 003 3h14a3 3 0 003-3V9" />
                        <path d="M13 6V3" />
                        <path d="M18 21v-6" />
                        <path d="M6 21v-6" />
                        <rect x="6" y="11" width="12" height="4" rx="1" />
                      </svg>
                    }
                  />
                  <QuickLink
                    href="/profile"
                    label="Profile"
                    number="07"
                    color="#5f27cd"
                    onClick={handleLinkClick}
                    icon={
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    }
                  />
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/kashiyatra_iitbhu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)",
                    }}
                  >
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="hidden text-xs font-medium text-white sm:inline">
                      @kashiyatra_iitbhu
                    </span>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/kashiyatra.iitbhu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105"
                    style={{ background: "#1877F2" }}
                  >
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@KashiyatraIITBHU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105"
                    style={{ background: "#FF0000" }}
                  >
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>

                  {/* Twitter/X */}
                  <a
                    href="https://twitter.com/KY_IITBHU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105"
                    style={{ background: "#000000" }}
                  >
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* WhatsApp Channel */}
                  <a
                    href="https://whatsapp.com/channel/0029VasYb6LBadmaaBUHjP3t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105"
                    style={{ background: "#25D366" }}
                  >
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom drag handle - outside Main Panel, inside rounded wrapper */}
              <div
                className="flex cursor-grab justify-center py-2 active:cursor-grabbing"
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                <div className="h-1 w-16 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QuickLink({
  href,
  label,
  number,
  color,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  number: string;
  color: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className="group block" onClick={onClick}>
      <div
        className="rounded-xl p-3 transition-all duration-300 group-hover:scale-105"
        style={{
          background: "rgba(30, 20, 40, 0.8)",
          border: `1px solid ${color}30`,
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="h-5 w-5" style={{ color }}>
            {icon}
          </div>
          <span className="text-[10px] text-white/30">{number}</span>
        </div>
        <p className="truncate text-xs font-medium text-white/80">{label}</p>
      </div>
    </Link>
  );
}
