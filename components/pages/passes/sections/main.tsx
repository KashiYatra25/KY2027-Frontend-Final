"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { PassCard, PassesHeading, PassDetailsModal } from "@/components/pages/passes/components";
import { FloatingCartBar } from "@/components/pages/passes/components/FloatingCartBar";
import {
  BanarasiPatternAnimated,
  GeometricPattern,
  VignetteOverlay,
  MandalaRing,
  FloatingParticles,
} from "@/components/pages/passes/sections/decor";
import { PassesLoader } from "@/components/pages/passes/sections/loader";
import { PassesError } from "@/components/pages/passes/sections/error/PassesError";
import { toPassConfig } from "@/lib/api/helper/functions";
import { ANIMATION, type PassConfig } from "@/components/pages/passes/config/passes.config";
import { usePasses, useMyAccount, useGetMyCart } from "@/lib/api/hooks";
import { Z_INDEX } from "@/components/pages/passes/constants/palette";
import { useAnimationPolicy } from "@/hooks";
import { COLORS, GRADIENT_BORDER_ORNATE } from "@/components/pages/passes/constants/palette";

// ============================================
// Main PassesSection Component
// ============================================
export function PassesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mandalaLeftRef = useRef<HTMLDivElement>(null);
  const mandalaRightRef = useRef<HTMLDivElement>(null);
  const mandalaCenterRef = useRef<HTMLDivElement>(null);

  const [selectedPass, setSelectedPass] = useState<PassConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auth & profile status - to conditionally fetch cart
  const { status } = useSession();
  const { isProfileComplete } = useMyAccount("access");
  const isAuthenticated = status === "authenticated";
  const shouldFetchCart = isAuthenticated && isProfileComplete;

  // Fetch passes from backend
  const { passes, isLoading, isError, refetch } = usePasses();
  const passConfigs = passes.map(toPassConfig);

  // Fetch cart only if authenticated AND profile complete
  const { totalQuantity } = useGetMyCart();

  const { isMobile, shouldAnimate } = useAnimationPolicy();
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  useEffect(() => {
    // Skip GSAP animations if animations should be reduced
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      // Only run mandala animations when in view
      if (isInView) {
        gsap.to(mandalaLeftRef.current, {
          rotation: 360,
          duration: 80,
          repeat: -1,
          ease: "none",
        });
        gsap.to(mandalaRightRef.current, {
          rotation: -360,
          duration: 100,
          repeat: -1,
          ease: "none",
        });
        gsap.to(mandalaCenterRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, shouldAnimate]);

  const handleDetailsClick = useCallback((pass: PassConfig) => {
    setSelectedPass(pass);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-8 md:py-16"
      style={{
        background: `
          linear-gradient(180deg,
            #0a0510 0%,
            #120818 10%,
            #1a0c22 25%,
            #22102c 40%,
            #2a1435 50%,
            #22102c 60%,
            #1a0c22 75%,
            #120818 90%,
            #0a0510 100%
          )
        `,
      }}
    >
      {/* Top ornate border */}
      <div
        className="absolute top-0 right-0 left-0"
        style={{
          height: "80px",
          background: `linear-gradient(180deg, rgba(212, 168, 83, 0.12) 0%, transparent 100%)`,
          borderTop: "3px solid transparent",
          borderImage: `${GRADIENT_BORDER_ORNATE} 1`,
          zIndex: Z_INDEX.topBorder,
        }}
      />

      {/* Animated patterns */}
      <GeometricPattern />
      <BanarasiPatternAnimated isMobile={isMobile} />

      {/* Left Mandala - hidden on mobile */}
      {!isMobile && (
        <div
          ref={mandalaLeftRef}
          className="pointer-events-none absolute top-[15%] -left-[15%] h-[350px] w-[350px] md:h-[500px] md:w-[500px]"
          style={{ zIndex: Z_INDEX.mandala, opacity: 0.08, color: COLORS.GOLD }}
        >
          <MandalaRing className="h-full w-full" />
        </div>
      )}

      {/* Right Mandala - hidden on mobile */}
      {!isMobile && (
        <div
          ref={mandalaRightRef}
          className="pointer-events-none absolute -right-[15%] bottom-[10%] h-[400px] w-[400px] md:h-[550px] md:w-[550px]"
          style={{
            zIndex: Z_INDEX.mandala,
            opacity: 0.06,
            color: COLORS.BRIGHT_GOLD,
          }}
        >
          <MandalaRing className="h-full w-full" />
        </div>
      )}

      {/* Center Mandala (behind cards) - hidden on mobile */}
      {!isMobile && (
        <div
          ref={mandalaCenterRef}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 md:h-[800px] md:w-[800px]"
          style={{ zIndex: 1, opacity: 0.03, color: COLORS.GOLD }}
        >
          <MandalaRing className="h-full w-full" />
        </div>
      )}

      {/* Floating particles */}
      <FloatingParticles isMobile={isMobile} isInView={isInView} />

      {/* Vignette */}
      <VignetteOverlay />

      {/* Content */}
      <motion.div
        className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:pt-24 lg:px-8 2xl:max-w-[1600px]"
        style={{ zIndex: Z_INDEX.cards }}
        variants={ANIMATION.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Heading */}
        <PassesHeading isMobile={isMobile} />

        {/* Hover instruction - only show when passes loaded */}
        {!isLoading && !isError && (
          <motion.p
            className="mb-8 hidden text-center text-sm text-gray-500 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            [ HOVER TO SEE BENEFITS ]
          </motion.p>
        )}

        {/* Pass cards */}
        {isLoading ? (
          <PassesLoader />
        ) : isError ? (
          <PassesError onRetry={() => refetch()} />
        ) : (
          <div className="grid grid-cols-1 items-end justify-items-center gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {passConfigs.map((pass, index) => (
              <PassCard
                key={pass.id}
                pass={pass}
                index={index}
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        )}

        {/* Mobile tap instruction - only show when passes loaded */}
        {!isLoading && !isError && (
          <motion.p
            className="mt-8 text-center text-sm text-gray-500 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            [ TAP TO SEE BENEFITS ]
          </motion.p>
        )}

        {/* Footer note */}
        <motion.p
          className="mt-12 text-center text-sm text-gray-600"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.8 } },
          }}
        >
          * All passes include entry to the 3-day festival. Prices inclusive of all taxes.
        </motion.p>
      </motion.div>

      {/* Bottom ornate border */}
      <div
        className="absolute right-0 bottom-0 left-0 h-[3px]"
        style={{ background: GRADIENT_BORDER_ORNATE }}
      />

      {/* Pass Details Modal */}
      <PassDetailsModal pass={selectedPass} isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Floating Cart Bar - only show when authenticated, profile complete, and cart has items */}
      <FloatingCartBar itemCount={totalQuantity} show={shouldFetchCart} />
    </section>
  );
}
