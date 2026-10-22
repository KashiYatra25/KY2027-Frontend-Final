"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { IMAGES } from "@/lib/images";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

// ═══════════════════════════════════════════════════════════════════
// FOOTER DANCER - Dancer figure on the right side
// ═══════════════════════════════════════════════════════════════════
export const FooterDancer = memo(function FooterDancer() {
  const { isAnimating } = useMotionZone();

  return (
    <motion.div
      className="pointer-events-none absolute top-[5%] right-[1%] z-10 hidden h-[400px] w-[280px] sm:h-[500px] sm:w-[350px] md:block lg:h-[600px] lg:w-[420px]"
      style={{ willChange: "transform" }}
      animate={
        isAnimating
          ? {
              y: [0, -15, 0],
            }
          : {}
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow behind dancer - using opacity gradient instead of blur for performance */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(ellipse at center, ${FOOTER_COLORS.NEON_PINK}60 0%, ${FOOTER_COLORS.NEON_PURPLE}40 30%, transparent 60%)`,
          transform: "translateZ(0)", // Force GPU layer
        }}
      />

      {/* Dancer image - simplified shadow */}
      <Image
        src={IMAGES.footer.footerDancer}
        alt=""
        fill
        className="object-contain"
        style={{
          filter: `drop-shadow(0 0 20px ${FOOTER_COLORS.NEON_PINK}40)`,
          transform: "translateZ(0)", // Force GPU layer
        }}
      />
    </motion.div>
  );
});
