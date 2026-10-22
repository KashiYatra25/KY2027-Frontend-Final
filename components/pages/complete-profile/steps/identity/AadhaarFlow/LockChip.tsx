import { Lock } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

// Lock chip pinned to the top-right of a box to mark it as not-yet-usable.
export function LockChip() {
  return (
    <div className="pointer-events-none absolute -top-2 -right-2 z-10">
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg"
        style={{
          background: COLORS.BG_DEEP,
          border: `1px solid ${COLORS.GOLD}50`,
        }}
      >
        <Lock className="h-3.5 w-3.5" style={{ color: COLORS.GOLD }} />
        <span className="text-xs font-semibold" style={{ color: COLORS.CREAM }}>
          Locked
        </span>
      </div>
    </div>
  );
}
