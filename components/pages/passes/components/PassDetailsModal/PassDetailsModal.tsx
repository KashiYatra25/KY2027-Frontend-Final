"use client";

import { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PassConfig } from "@/components/pages/passes/config/passes.config";
import { COLORS } from "@/components/pages/passes/constants/palette";
import { TornEdgeTop } from "./TornEdgeTop";
import { TornEdgeBottom } from "./TornEdgeBottom";
import { CornerFlourish } from "./CornerFlourish";

interface PassDetailsModalProps {
  pass: PassConfig | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to convert hex to rgb string
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
}

export const PassDetailsModal = memo(function PassDetailsModal({
  pass,
  isOpen,
  onClose,
}: PassDetailsModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!pass) return null;

  const parchmentColor = "#2a1810";
  const parchmentLight = "#3d2518";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 isolate z-[1000] overflow-y-auto overscroll-none"
        >
          {/* Backdrop - click to close */}
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

          {/* Modal container - centered */}
          <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex max-h-[90vh] w-full max-w-lg flex-col"
              style={{ perspective: "1000px" }}
            >
              {/* Close button - top left */}
              <button
                onClick={onClose}
                className="absolute -top-2 -left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{
                  background: "rgba(30, 15, 10, 0.95)",
                  border: "2px solid rgba(212, 168, 83, 0.6)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A853"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Torn top edge */}
              <TornEdgeTop color={parchmentColor} />

              {/* Main parchment body */}
              <div
                className="relative flex flex-1 flex-col overflow-hidden rounded-sm"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 20%, rgba(62, 39, 25, 0.9) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 80%, rgba(62, 39, 25, 0.8) 0%, transparent 50%),
                  linear-gradient(180deg, 
                    ${parchmentLight} 0%, 
                    ${parchmentColor} 15%,
                    #1f120b 50%,
                    ${parchmentColor} 85%,
                    ${parchmentLight} 100%
                  )
                `,
                  boxShadow: `
                  0 0 60px rgba(0,0,0,0.8),
                  inset 0 0 100px rgba(0,0,0,0.5),
                  inset 0 2px 4px rgba(255,200,100,0.1)
                `,
                }}
              >
                {/* Parchment texture overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Golden vein lines */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
                  <svg className="h-full w-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                    <path
                      d="M50 0 Q80 150 40 300 Q60 450 30 600"
                      fill="none"
                      stroke="#D4A853"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M350 0 Q320 200 360 400 Q340 500 370 600"
                      fill="none"
                      stroke="#D4A853"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M200 0 Q180 100 220 200 Q190 350 210 450 Q180 550 200 600"
                      fill="none"
                      stroke="#8B4513"
                      strokeWidth="0.3"
                    />
                  </svg>
                </div>

                {/* Corner flourishes */}
                <CornerFlourish position="tl" />
                <CornerFlourish position="tr" />
                <CornerFlourish position="bl" />
                <CornerFlourish position="br" />

                {/* Scrollable content wrapper */}
                <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">
                  {/* Content */}
                  <div>
                    {/* Header with decorative lines */}
                    <div className="mb-6 text-center">
                      <div className="mb-2 flex items-center justify-center gap-3">
                        <span
                          className="h-[1px] w-12"
                          style={{
                            background: "linear-gradient(90deg, transparent, #D4A853, transparent)",
                          }}
                        />
                        <span className="text-2xl" style={{ color: pass.accentColor }}>
                          ✦
                        </span>
                        <span
                          className="h-[1px] w-12"
                          style={{
                            background: "linear-gradient(90deg, transparent, #D4A853, transparent)",
                          }}
                        />
                      </div>
                      <h2
                        className="font-[family-name:var(--font-cormorant)] text-3xl font-bold tracking-wider"
                        style={{
                          color: pass.accentColor,
                          textShadow: `0 0 20px ${pass.glowColor}, 0 2px 4px rgba(0,0,0,0.5)`,
                        }}
                      >
                        {pass.name}
                      </h2>
                      <p
                        className="mt-1 font-[family-name:var(--font-cormorant)] text-sm tracking-wide italic"
                        style={{ color: "#a08060" }}
                      >
                        {pass.tagline}
                      </p>
                    </div>

                    {/* Decorative divider */}
                    <div className="mb-5 flex items-center justify-center gap-2">
                      <span
                        className="h-[1px] flex-1"
                        style={{ background: "rgba(139, 69, 19, 0.5)" }}
                      />
                      <span className="text-xs" style={{ color: "#8B4513" }}>
                        ❧
                      </span>
                      <span
                        className="h-[1px] flex-1"
                        style={{ background: "rgba(139, 69, 19, 0.5)" }}
                      />
                    </div>

                    {/* Details list */}
                    <div className="space-y-4">
                      {pass.details.map((detail, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-4 rounded-lg p-3"
                          style={{
                            background: "rgba(139, 69, 19, 0.15)",
                            border: "1px solid rgba(139, 69, 19, 0.3)",
                          }}
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
                            style={{
                              background: `linear-gradient(135deg, rgba(${hexToRgb(pass.accentColor)}, 0.3) 0%, rgba(139, 69, 19, 0.3) 100%)`,
                              border: `1px solid rgba(${hexToRgb(pass.accentColor)}, 0.4)`,
                            }}
                          >
                            {detail.icon}
                          </span>
                          <div className="flex-1">
                            <h3
                              className="font-[family-name:var(--font-cormorant)] text-base font-bold tracking-wide"
                              style={{ color: pass.accentColor }}
                            >
                              {detail.title}
                            </h3>
                            <p
                              className="mt-0.5 text-sm leading-relaxed"
                              style={{ color: "#b8a080" }}
                            >
                              {detail.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Price section */}
                    <div className="mt-6 text-center">
                      <div className="mb-3 flex items-center justify-center gap-2">
                        <span
                          className="h-[1px] flex-1"
                          style={{ background: "rgba(212, 168, 83, 0.3)" }}
                        />
                        <span
                          className="px-4 py-1 font-[family-name:var(--font-cormorant)] text-2xl font-bold"
                          style={{
                            color: COLORS.BRIGHT_GOLD,
                            textShadow: "0 0 10px rgba(212, 168, 83, 0.5)",
                          }}
                        >
                          ₹{pass.price.toLocaleString("en-IN")}
                        </span>
                        <span
                          className="h-[1px] flex-1"
                          style={{ background: "rgba(212, 168, 83, 0.3)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Torn bottom edge */}
              <TornEdgeBottom color={parchmentColor} />

              {/* Burned corner effects */}
              <div
                className="pointer-events-none absolute -top-2 -left-2 h-16 w-16 rounded-full opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(20,10,5,0.9) 0%, transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-2 -right-2 h-20 w-20 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(20,10,5,0.8) 0%, transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-2 -left-2 h-14 w-14 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(20,10,5,0.8) 0%, transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -right-2 -bottom-2 h-18 w-18 rounded-full opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(20,10,5,0.9) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
