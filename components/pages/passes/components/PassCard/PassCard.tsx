"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import type { PassConfig } from "@/components/pages/passes/config/passes.config";
import { ANIMATION } from "@/components/pages/passes/config/passes.config";
import { useAnimationPolicy } from "@/hooks";
import { useMyAccount, useAddToMyCart } from "@/lib/api/hooks";
import { ProfileIncompleteToast } from "@/components/pages/passes/toasts/error/ProfileIncompleteToast";
import { LoginRequiredToast } from "@/components/pages/passes/toasts/error/LoginRequiredToast";
import { ItemAddedToast } from "@/components/pages/cart/toasts/success/ItemAddedToast";
import {
  COLORS,
  SHADOWS,
  GRADIENT_BADGE_GOLD,
  GRADIENT_LINE_GOLD_LEFT,
  GRADIENT_LINE_GOLD_RIGHT,
} from "@/components/pages/passes/constants/palette";
import { hexToRgb } from "./hexToRgb";
import { PassIcon } from "./PassIcon";
import { AnimatedMandala } from "./AnimatedMandala";
import { RoyalPrice } from "./RoyalPrice";
import { RoyalButton } from "./RoyalButton";
import { DisabledCheckoutButton } from "./DisabledCheckoutButton";
import { CornerOrnament } from "./CornerOrnament";
import { CardBackground } from "./CardBackground";
import { RoyalFrame } from "./RoyalFrame";

interface PassCardProps {
  pass: PassConfig;
  index: number;
  onSelect?: (passId: string) => void;
  onDetailsClick?: (pass: PassConfig) => void;
}

// ============================================
// Main PassCard Component
// ============================================
export const PassCard = memo(function PassCard({
  pass,
  index,
  onSelect,
  onDetailsClick,
}: PassCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showToast, setShowToast] = useState<"profile" | "login" | null>(null);
  const { isMobile } = useAnimationPolicy();

  // Auth and profile status
  const { status } = useSession();
  const { progress, isLoading: isProfileLoading } = useMyAccount("access");

  // Add to cart mutation
  const { addToCart, isPending: isAddingToCart } = useAddToMyCart({
    successToast: <ItemAddedToast passName={pass.name} />,
  });

  const isAuthenticated = status === "authenticated";
  const isSessionLoading = status === "loading";
  const isProfileComplete = progress?.isProfileComplete ?? false;

  // Combined loading state
  const isLoading = isSessionLoading || (isAuthenticated && isProfileLoading) || isAddingToCart;

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);
  const floatDelay = index * 0.4;

  // Handle checkout button click
  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowToast("login");
      return;
    }

    if (!isProfileComplete) {
      setShowToast("profile");
      return;
    }

    // Ensure pass has MongoDB _id (required for cart API)
    if (!pass._id) {
      console.error("Pass is missing _id, cannot add to cart");
      return;
    }

    // Profile is complete, add to cart
    addToCart({ passId: pass._id, quantity: 1 });
  };

  // Auto-hide toast after 5 seconds
  const handleCloseToast = () => setShowToast(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.15 }}
        className={`relative ${pass.popular ? "md:-mt-6 lg:-mt-8" : ""}`}
        style={{ width: "100%", maxWidth: "300px", height: "520px" }}
      >
        {/* Popular badge */}
        {pass.popular && (
          <div
            className="absolute -top-3 left-1/2 z-30 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider whitespace-nowrap uppercase"
            style={{
              background: GRADIENT_BADGE_GOLD,
              color: COLORS.CARD_DARK_PURPLE,
              boxShadow: SHADOWS.BADGE_GOLD,
            }}
          >
            ✦ Most Popular ✦
          </div>
        )}

        {/* Static card frame */}
        <RoyalFrame>
          <div
            className="relative flex h-full w-full flex-col"
            style={{ boxShadow: SHADOWS.CARD_ROYAL }}
          >
            <CardBackground />
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            {/* Internal flip container */}
            <div
              className="relative z-10 flex flex-1 cursor-pointer items-center justify-center p-3"
              style={{
                perspective: "800px",
                WebkitPerspective: "800px",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* ===== FRONT: Pass Image with Glow ===== */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)", // Explicit transform for Safari
                    zIndex: isFlipped ? 0 : 1,
                  }}
                >
                  {isMobile ? (
                    /* Static on mobile */
                    <div className="relative">
                      <div
                        className="absolute inset-0 blur-2xl"
                        style={{
                          background: `radial-gradient(ellipse, ${pass.glowColor} 0%, transparent 70%)`,
                          transform: "scale(1.3)",
                          opacity: 0.6,
                        }}
                      />
                      <div
                        style={{
                          filter: `drop-shadow(0 0 20px ${pass.glowColor})`,
                        }}
                      >
                        <Image
                          src={pass.image}
                          alt={pass.name}
                          width={220}
                          height={280}
                          className="relative z-10 max-h-[260px] w-auto object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Animated on desktop */
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ ...ANIMATION.float, delay: floatDelay }}
                      className="relative"
                    >
                      <div
                        className="absolute inset-0 blur-2xl"
                        style={{
                          background: `radial-gradient(ellipse, ${pass.glowColor} 0%, transparent 70%)`,
                          transform: "scale(1.3)",
                          opacity: 0.6,
                        }}
                      />
                      <motion.div
                        animate={{
                          filter: [
                            `drop-shadow(0 0 20px ${pass.glowColor})`,
                            `drop-shadow(0 0 35px ${pass.glowColor})`,
                            `drop-shadow(0 0 20px ${pass.glowColor})`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={pass.image}
                          alt={pass.name}
                          width={220}
                          height={280}
                          className="relative z-10 max-h-[260px] w-auto object-contain"
                          priority={index === 0}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* ===== BACK: Glamorous Benefits with Mandala ===== */}
                <div
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    zIndex: isFlipped ? 1 : 0,
                  }}
                >
                  {/* Rich gradient background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                      radial-gradient(ellipse at 50% 0%, rgba(${hexToRgb(COLORS.GOLD)}, 0.15) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 100%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
                      linear-gradient(180deg, 
                        rgba(45, 22, 55, 0.98) 0%, 
                        rgba(35, 15, 45, 0.99) 30%,
                        rgba(28, 12, 38, 1) 60%,
                        rgba(22, 8, 30, 1) 100%
                      )
                    `,
                    }}
                  />

                  {/* Animated Mandala Background - only animate when flipped and not on mobile */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                    <AnimatedMandala
                      color={pass.accentColor}
                      size={280}
                      isAnimating={isFlipped && !isMobile}
                    />
                  </div>

                  {/* Gold border glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg"
                    style={{
                      border: `1px solid rgba(${hexToRgb(COLORS.GOLD)}, 0.4)`,
                      boxShadow: `inset 0 0 30px rgba(${hexToRgb(COLORS.GOLD)}, 0.1)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col p-4">
                    {/* Header with decorative lines */}
                    <div className="mb-3 text-center">
                      <div className="mb-1 flex items-center justify-center gap-2">
                        <span
                          className="h-[1px] w-8"
                          style={{ background: GRADIENT_LINE_GOLD_LEFT }}
                        />
                        <span style={{ color: pass.accentColor }}>✦</span>
                        <span
                          className="h-[1px] w-8"
                          style={{ background: GRADIENT_LINE_GOLD_RIGHT }}
                        />
                      </div>
                      <h3
                        className="text-xl font-bold tracking-wider uppercase"
                        style={{
                          fontFamily: "var(--font-ethereal), serif",
                          background: `linear-gradient(180deg, ${pass.accentColor} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${pass.accentColor} 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textShadow: `0 0 30px ${pass.glowColor}`,
                        }}
                      >
                        {pass.name.split(" ")[0]} Benefits
                      </h3>
                    </div>

                    {/* Benefits list with royal styling */}
                    <ul className="flex-1 space-y-2.5 overflow-y-auto px-1">
                      {pass.benefits.map((benefit, i) =>
                        isMobile ? (
                          <li
                            key={i}
                            className={`flex items-start gap-2.5 text-sm ${benefit.highlight ? "text-yellow-200" : "text-gray-200"}`}
                          >
                            <span style={{ color: COLORS.BRIGHT_GOLD }} className="mt-0.5">
                              ✦
                            </span>
                            <span className="leading-tight">{benefit.text}</span>
                          </li>
                        ) : (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex items-start gap-2.5 text-sm ${benefit.highlight ? "text-yellow-200" : "text-gray-200"}`}
                          >
                            <motion.span
                              animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 180, 360],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              style={{ color: COLORS.BRIGHT_GOLD }}
                              className="mt-0.5"
                            >
                              ✦
                            </motion.span>
                            <span className="leading-tight">{benefit.text}</span>
                          </motion.li>
                        )
                      )}
                    </ul>

                    {/* QR with ornate frame */}
                    <div className="my-3 flex justify-center">
                      <div
                        className="relative flex h-16 w-16 items-center justify-center rounded"
                        style={{
                          background: `linear-gradient(135deg, rgba(${hexToRgb(COLORS.GOLD)}, 0.1) 0%, rgba(0,0,0,0.3) 100%)`,
                          border: `2px solid rgba(${hexToRgb(COLORS.GOLD)}, 0.5)`,
                          boxShadow: SHADOWS.QR_FRAME,
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={COLORS.GOLD}
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="3" width="7" height="7" rx="1" />
                          <rect x="3" y="14" width="7" height="7" rx="1" />
                          <rect x="14" y="14" width="3" height="3" />
                          <rect x="18" y="14" width="3" height="3" />
                          <rect x="14" y="18" width="3" height="3" />
                          <rect x="18" y="18" width="3" height="3" />
                        </svg>
                      </div>
                    </div>

                    {/* Flip back hint */}
                    <p className="flex items-center justify-center gap-1 text-center text-xs text-gray-400">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      {isMobile ? "Tap to flip back" : "Click to flip back"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom section */}
            <div className="relative z-10 px-4 pt-2 pb-4">
              <div className="mb-3 flex justify-center">
                <RoyalPrice price={pass.price} />
              </div>
              <button
                onClick={() => onDetailsClick?.(pass)}
                className="mb-4 flex w-full items-center justify-center gap-1.5 text-xs transition-colors hover:text-yellow-300"
                style={{ color: COLORS.GOLD }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Click for detailed info
              </button>

              {/* Conditional checkout button based on auth and profile status */}
              {!isAuthenticated && !isSessionLoading ? (
                <DisabledCheckoutButton passName={pass.name.split(" ")[0]} />
              ) : (
                <RoyalButton
                  onClick={handleCheckoutClick}
                  icon={<PassIcon passId={pass.id} isMobile={isMobile} />}
                  loading={isLoading}
                  disabled={!isProfileComplete && isAuthenticated && !isLoading}
                >
                  {isAddingToCart
                    ? "Adding..."
                    : isSessionLoading || isProfileLoading
                      ? "Loading..."
                      : isAuthenticated && !isProfileComplete
                        ? "Complete Profile First"
                        : "Add to Cart"}
                </RoyalButton>
              )}
            </div>
          </div>
        </RoyalFrame>
      </motion.div>

      {/* Toast notifications */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed right-6 bottom-6 z-50">
            {showToast === "profile" ? (
              <ProfileIncompleteToast onClose={handleCloseToast} />
            ) : (
              <LoginRequiredToast onClose={handleCloseToast} />
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
});
