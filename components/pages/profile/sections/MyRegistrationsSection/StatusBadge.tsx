export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: "bg-green-500/20", text: "text-green-400" },
    pending: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
    cancelled: { bg: "bg-red-500/20", text: "text-red-400" },
    waitlisted: { bg: "bg-blue-500/20", text: "text-blue-400" },
  };

  const style = styles[status] ?? { bg: "bg-white/10", text: "text-white/60" };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${style.bg} ${style.text}`}>
      {status}
    </span>
  );
}
