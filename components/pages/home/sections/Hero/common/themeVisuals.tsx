import type { TimeOfDay } from "@/hooks/useTimeOfDay";

// Get background gradient for each theme
export function getThemeBackground(theme: TimeOfDay | "auto"): string {
  switch (theme) {
    case "auto":
      return "linear-gradient(135deg, #4a90c2 0%, #ff7043 50%, #1e1e4a 100%)";
    case "night":
      return "linear-gradient(180deg, #1e1e4a 0%, #0d0d25 100%)";
    case "afternoon":
      return "linear-gradient(180deg, #ffd54f 0%, #f9a825 100%)";
    case "evening":
      return "linear-gradient(180deg, #ff7043 0%, #d84315 100%)";
    case "dawn":
      return "linear-gradient(180deg, #ffcc80 0%, #ff8a65 100%)";
    case "dusk":
      return "linear-gradient(180deg, #7e57c2 0%, #4a148c 100%)";
    case "morning":
      return "linear-gradient(180deg, #81d4fa 0%, #4fc3f7 100%)";
    default:
      return "linear-gradient(180deg, #1e1e4a 0%, #0d0d25 100%)";
  }
}

// Get SVG icon for each theme
export function getThemeIcon(theme: TimeOfDay | "auto"): React.ReactNode {
  const size = "60%";

  switch (theme) {
    case "auto":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Clock/Auto icon */}
          <circle cx="12" cy="12" r="9" stroke="#fff8e1" strokeWidth="2" fill="none" />
          <path
            d="M12 6 L12 12 L16 14"
            stroke="#fff8e1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "night":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#ffd54f"
            stroke="#fff8e1"
            strokeWidth="0.5"
          />
        </svg>
      );
    case "afternoon":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" fill="#fff8e1" />
          <g stroke="#fff8e1" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
            <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
            <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
          </g>
        </svg>
      );
    case "evening":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Sun setting behind horizon */}
          <circle cx="12" cy="14" r="5" fill="#ffcc80" />
          <rect x="2" y="14" width="20" height="10" fill="#d84315" />
          <path d="M2 14 L22 14" stroke="#ffab40" strokeWidth="1.5" />
        </svg>
      );
    case "dawn":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Sun rising with rays */}
          <circle cx="12" cy="16" r="4" fill="#fff8e1" />
          <g stroke="#ffcc80" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="6" x2="12" y2="9" />
            <line x1="5.64" y1="9.64" x2="7.76" y2="11.76" />
            <line x1="18.36" y1="9.64" x2="16.24" y2="11.76" />
          </g>
          <path d="M4 20 L20 20" stroke="#ff8a65" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "dusk":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Moon with stars */}
          <path
            d="M18 12.79A7 7 0 1 1 10.21 5 5.5 5.5 0 0 0 18 12.79z"
            fill="#ce93d8"
            stroke="#e1bee7"
            strokeWidth="0.5"
          />
          <circle cx="18" cy="6" r="1" fill="#fff59d" />
          <circle cx="20" cy="10" r="0.6" fill="#fff59d" />
          <circle cx="15" cy="4" r="0.5" fill="#fff59d" />
        </svg>
      );
    case "morning":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Sun with clouds */}
          <circle cx="14" cy="10" r="4" fill="#fff9c4" />
          <ellipse cx="10" cy="16" rx="6" ry="3" fill="#e3f2fd" />
          <ellipse cx="16" cy="15" rx="4" ry="2.5" fill="#bbdefb" />
        </svg>
      );
    default:
      return null;
  }
}
