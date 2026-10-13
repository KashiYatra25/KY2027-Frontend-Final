import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// STAGE LIGHTS SVG - Light beam fixtures (animated / static)
// ═══════════════════════════════════════════════════════════════════

export const StageLightsSVG = ({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) => (
  <svg viewBox="0 0 200 100" className={className}>
    {/* Light beams */}
    {animate ? (
      <>
        <motion.path
          d="M100,10 L60,100 L140,100 Z"
          fill="url(#lightBeam1)"
          opacity="0.3"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M60,5 L20,100 L100,100 Z"
          fill="url(#lightBeam2)"
          opacity="0.2"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path
          d="M140,5 L100,100 L180,100 Z"
          fill="url(#lightBeam3)"
          opacity="0.2"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
      </>
    ) : (
      <>
        <path d="M100,10 L60,100 L140,100 Z" fill="url(#lightBeam1)" opacity="0.3" />
        <path d="M60,5 L20,100 L100,100 Z" fill="url(#lightBeam2)" opacity="0.2" />
        <path d="M140,5 L100,100 L180,100 Z" fill="url(#lightBeam3)" opacity="0.2" />
      </>
    )}
    <defs>
      <linearGradient id="lightBeam1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="lightBeam2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="lightBeam3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
    {/* Light fixtures */}
    <circle cx="100" cy="8" r="8" fill="#333" stroke="#6366f1" strokeWidth="2" />
    <circle cx="60" cy="5" r="6" fill="#333" stroke="#8b5cf6" strokeWidth="2" />
    <circle cx="140" cy="5" r="6" fill="#333" stroke="#a855f7" strokeWidth="2" />
  </svg>
);
