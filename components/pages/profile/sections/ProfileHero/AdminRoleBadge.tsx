import { Shield, Crown, Star } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// ADMIN ROLE BADGE
// Shows special badge for MASTER_ADMIN, MANAGER, OPERATOR roles
// ═══════════════════════════════════════════════════════════════════
const ROLE_CONFIG = {
  MASTER_ADMIN: {
    label: "Master Admin",
    icon: Crown,
    gradient: "linear-gradient(135deg, #ffd700, #ff8c00)",
    bgGradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))",
    borderColor: "rgba(255, 215, 0, 0.5)",
    glowColor: "rgba(255, 215, 0, 0.3)",
  },
  MANAGER: {
    label: "Manager",
    icon: Shield,
    gradient: "linear-gradient(135deg, #a855f7, #6366f1)",
    bgGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.1))",
    borderColor: "rgba(168, 85, 247, 0.5)",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  OPERATOR: {
    label: "Operator",
    icon: Star,
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
    bgGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(20, 184, 166, 0.1))",
    borderColor: "rgba(34, 197, 94, 0.5)",
    glowColor: "rgba(34, 197, 94, 0.3)",
  },
} as const;

export function AdminRoleBadge({ role }: { role: "MASTER_ADMIN" | "MANAGER" | "OPERATOR" }) {
  const config = ROLE_CONFIG[role];
  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-wide"
      style={{
        background: config.bgGradient,
        border: `1px solid ${config.borderColor}`,
        boxShadow: `0 0 20px ${config.glowColor}, 0 4px 15px rgba(0, 0, 0, 0.2)`,
      }}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: config.gradient }}
      >
        <Icon className="h-3.5 w-3.5 text-white" />
      </div>
      <span
        style={{
          background: config.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {config.label}
      </span>
    </div>
  );
}
