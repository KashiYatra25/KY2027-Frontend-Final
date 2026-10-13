"use client";

interface DiyaLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: "gold" | "dark";
}

const sizeConfig = {
  sm: { ring: "w-4 h-4", flame: "w-1 h-1.5", text: "text-xs" },
  md: { ring: "w-5 h-5", flame: "w-1.5 h-2", text: "text-sm" },
  lg: { ring: "w-6 h-6", flame: "w-2 h-2.5", text: "text-base" },
};

const colorConfig = {
  gold: {
    ring: "#FFD700",
    ringFaded: "rgba(255,215,0,0.3)",
    flame: "linear-gradient(to top, #FF6B00, #FFD700)",
    flameShadow: "0 0 4px rgba(255,180,0,0.6)",
    text: "#FFD700",
  },
  dark: {
    ring: "#3d0a18",
    ringFaded: "rgba(61,10,24,0.3)",
    flame: "linear-gradient(to top, #8B4513, #3d0a18)",
    flameShadow: "0 0 4px rgba(61,10,24,0.6)",
    text: "#3d0a18",
  },
};

export function DiyaLoader({ text = "Loading…", size = "md", color = "dark" }: DiyaLoaderProps) {
  const sizeStyles = sizeConfig[size];
  const colorStyles = colorConfig[color];

  return (
    <div className="flex items-center gap-3">
      {/* Spinning diya ring */}
      <div className={`relative ${sizeStyles.ring}`}>
        {/* Outer spinning ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: colorStyles.ring,
            borderRightColor: colorStyles.ringFaded,
            animation: "diyaLoaderSpin 1s linear infinite",
          }}
        />
        {/* Center diya flame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={sizeStyles.flame}
            style={{
              background: colorStyles.flame,
              boxShadow: colorStyles.flameShadow,
              animation: "diyaFlameFlicker 0.3s ease-in-out infinite alternate",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
          />
        </div>
      </div>

      {text && (
        <span className={sizeStyles.text} style={{ color: colorStyles.text }}>
          {text}
        </span>
      )}
    </div>
  );
}
