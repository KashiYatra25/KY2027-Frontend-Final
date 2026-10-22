"use client";

import { motion, type Variants } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// STAGGER ITEM - Child element for StaggerContainer
// ═══════════════════════════════════════════════════════════════════

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
