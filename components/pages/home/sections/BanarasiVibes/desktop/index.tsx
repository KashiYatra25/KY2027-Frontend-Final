"use client";

import { memo, RefObject } from "react";
import { RotatingMandala } from "./RotatingMandala";
import { Rickshaw } from "./Rickshaw";
import { BanarasMaleDancer } from "./BanarasMaleDancer";
import { BanarasFemaleDancer } from "./BanarasFemaleDancer";

interface BanarasiVibesDesktopProps {
  isAnimating: boolean;
  shouldAnimate: boolean;
  rickshawRef?: RefObject<HTMLDivElement | null>;
}

/**
 * Desktop-only elements for BanarasiVibes section
 * Shows: Rotating Mandala, Rickshaw, Banarasi Dancers (male left, female right)
 * Hidden on mobile (< 640px)
 */
export const BanarasiVibesDesktop = memo(function BanarasiVibesDesktop({
  isAnimating,
  shouldAnimate,
  rickshawRef,
}: BanarasiVibesDesktopProps) {
  return (
    <>
      {/* Rotating Mandala backdrop */}
      <RotatingMandala isAnimating={isAnimating} shouldAnimate={shouldAnimate} />

      {/* Banarasi Male Dancer - Left side */}
      <BanarasMaleDancer />

      {/* Banarasi Female Dancer - Right side */}
      <BanarasFemaleDancer />

      {/* Rickshaw - animated */}
      <Rickshaw ref={rickshawRef} />
    </>
  );
});
