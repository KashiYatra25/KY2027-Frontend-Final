"use client";

import { memo } from "react";
import { motion } from "framer-motion";

// ============================================
// Animated Paisley/Banarasi Pattern
// ============================================
export const BanarasiPatternAnimated = memo(function BanarasiPatternAnimated({
  isMobile,
}: {
  isMobile: boolean;
}) {
  // Static on mobile
  if (isMobile) {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4a853' stroke-width='0.5'%3E%3Cpath d='M40 10c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15zm0 5c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z' opacity='0.15'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23d4a853' opacity='0.1'/%3E%3Cpath d='M20 60c0-11 9-20 20-20s20 9 20 20' opacity='0.08'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          opacity: 0.5,
        }}
      />
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4a853' stroke-width='0.5'%3E%3Cpath d='M40 10c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15zm0 5c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z' opacity='0.15'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23d4a853' opacity='0.1'/%3E%3Cpath d='M20 60c0-11 9-20 20-20s20 9 20 20' opacity='0.08'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px",
        opacity: 0.5,
      }}
    />
  );
});
