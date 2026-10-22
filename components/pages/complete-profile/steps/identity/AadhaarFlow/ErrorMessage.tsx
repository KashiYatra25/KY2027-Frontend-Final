import { COLORS } from "@/components/pages/complete-profile/constants/palette";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      className="mx-auto flex max-w-md items-center gap-3 rounded-xl p-4"
      style={{ background: `${COLORS.ERROR}10`, border: `1px solid ${COLORS.ERROR}25` }}
    >
      <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLORS.ERROR }} />
      <p className="text-sm" style={{ color: COLORS.ERROR }}>
        {message}
      </p>
    </div>
  );
}
