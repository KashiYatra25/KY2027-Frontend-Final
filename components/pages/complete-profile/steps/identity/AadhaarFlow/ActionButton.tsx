import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface ActionButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function ActionButton({ onClick, loading, disabled, icon, children }: ActionButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`group relative overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 ${
        isDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-[1.02] active:scale-[0.98]"
      }`}
      style={{
        background: isDisabled
          ? `${COLORS.GOLD}20`
          : `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
        color: isDisabled ? `${COLORS.CREAM}40` : COLORS.BG_DEEP,
        boxShadow: isDisabled ? "none" : `0 8px 24px ${COLORS.GOLD}40`,
      }}
    >
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
          />
        ) : (
          icon
        )}
        {children}
      </span>
    </button>
  );
}
