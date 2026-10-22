interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "amber" | "emerald" | "blue";
  className?: string;
}

export function StatCard({ icon, label, value, color, className = "" }: StatCardProps) {
  const colorStyles = {
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-400",
      value: "text-amber-200",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      icon: "text-emerald-400",
      value: "text-emerald-200",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: "text-blue-400",
      value: "text-blue-200",
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`rounded-xl border p-4 backdrop-blur-sm ${styles.bg} ${styles.border} ${className}`}
    >
      <div className={`mb-2 ${styles.icon}`}>{icon}</div>
      <p className={`text-xl font-bold ${styles.value}`}>{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}
