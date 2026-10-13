"use client";

// ============================================
// DisabledCheckoutButton Component - for unauthenticated users
// ============================================
export function DisabledCheckoutButton({ passName }: { passName: string }) {
  return (
    <div
      className="relative w-full cursor-not-allowed overflow-hidden rounded-lg px-4 py-3 text-center text-sm font-bold tracking-wider uppercase opacity-50"
      style={{
        background: "rgba(100, 100, 100, 0.3)",
        border: `2px solid rgba(150, 150, 150, 0.5)`,
        color: "rgba(180, 180, 180, 0.8)",
      }}
    >
      <span className="flex items-center justify-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Login to Get {passName}
      </span>
    </div>
  );
}
