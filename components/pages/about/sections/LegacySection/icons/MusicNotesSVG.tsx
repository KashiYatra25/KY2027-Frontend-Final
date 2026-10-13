import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// MUSIC NOTES SVG - Floating music notes (animated / static)
// ═══════════════════════════════════════════════════════════════════

export const MusicNotesSVG = ({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) => (
  <svg viewBox="0 0 80 80" className={className}>
    {animate ? (
      <>
        {/* Note 1 */}
        <motion.g
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <circle cx="20" cy="60" r="8" fill="#6366f1" />
          <rect x="26" y="20" width="3" height="42" fill="#6366f1" />
          <path d="M29,20 Q50,15 45,35" fill="none" stroke="#6366f1" strokeWidth="3" />
        </motion.g>
        {/* Note 2 */}
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <circle cx="55" cy="50" r="6" fill="#8b5cf6" />
          <rect x="59" y="20" width="3" height="32" fill="#8b5cf6" />
        </motion.g>
      </>
    ) : (
      <>
        {/* Note 1 - static */}
        <g>
          <circle cx="20" cy="60" r="8" fill="#6366f1" />
          <rect x="26" y="20" width="3" height="42" fill="#6366f1" />
          <path d="M29,20 Q50,15 45,35" fill="none" stroke="#6366f1" strokeWidth="3" />
        </g>
        {/* Note 2 - static */}
        <g>
          <circle cx="55" cy="50" r="6" fill="#8b5cf6" />
          <rect x="59" y="20" width="3" height="32" fill="#8b5cf6" />
        </g>
      </>
    )}
  </svg>
);
