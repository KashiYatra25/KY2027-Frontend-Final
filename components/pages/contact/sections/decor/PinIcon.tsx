import { COLORS } from "@/components/pages/contact/constants/palette";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: COLORS.BRIGHT_GOLD,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21c4-4.5 7-8 7-11a7 7 0 10-14 0c0 3 3 6.5 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
