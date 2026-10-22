import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import type { Gender } from "./types";
import { formatGender } from "./helpers";

interface GenderOptionProps {
  value: Gender;
  selected: boolean;
  onClick: () => void;
  hasError: boolean;
}

export function GenderOption({ value, selected, onClick, hasError }: GenderOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-sm transition-all"
      style={{
        background: selected ? `${COLORS.GOLD}20` : `${COLORS.BG_DEEP}`,
        color: selected ? COLORS.GOLD : `${COLORS.CREAM}70`,
        border: selected
          ? `1px solid ${COLORS.GOLD}50`
          : hasError
            ? `1px solid ${COLORS.ERROR}30`
            : `1px solid ${COLORS.GOLD}20`,
      }}
    >
      {formatGender(value)}
    </button>
  );
}
