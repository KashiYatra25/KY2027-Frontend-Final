"use client";

import { motion } from "framer-motion";

// ============================================
// PassIcon Component with Animation (desktop only)
// ============================================
export function PassIcon({ passId, isMobile }: { passId: string; isMobile: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    yatri: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z" />
      </svg>
    ),
    darbar: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V18H19V19Z" />
      </svg>
    ),
    swarnim: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 1L9 9H2L7 14L5 22L12 17L19 22L17 14L22 9H15L12 1Z" />
      </svg>
    ),
  };

  if (isMobile) {
    return <span className="inline-block">{icons[passId] || icons.yatri}</span>;
  }

  return (
    <motion.span
      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
    >
      {icons[passId] || icons.yatri}
    </motion.span>
  );
}
