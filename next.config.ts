import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the X-Powered-By: Next.js header
  poweredByHeader: false,
  // Disable automatic scroll restoration - we handle it manually
  experimental: {
    scrollRestoration: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/bi3ktgt58/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to page routes (the HTML documents), not to
        // /_next/static or /_next/image assets which are content-hashed
        // and safe to cache long-term.
        source: "/:path((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
