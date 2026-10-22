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

export function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6.5 3.5c.5 0 .9.3 1.1.8l1.3 3c.2.5.1 1-.3 1.4L7.4 10c1 2 2.6 3.6 4.6 4.6l1.3-1.2c.4-.4.9-.5 1.4-.3l3 1.3c.5.2.8.6.8 1.1v3c0 .8-.7 1.5-1.5 1.4C9.6 19.4 4.6 14.4 4.1 6.5 4 5.2 4.7 4.5 5.5 4.5z" />
    </svg>
  );
}
