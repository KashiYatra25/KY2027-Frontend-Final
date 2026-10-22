import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the X-Powered-By: Next.js header
  poweredByHeader: false,
  // Gzip/deflate compression for responses (served by Next's node server where applicable)
  compress: true,
  // Don't ship browser source maps in production builds — smaller, faster builds
  // and avoids exposing source. (Error tracking still works via server traces.)
  productionBrowserSourceMaps: false,
  experimental: {
    // Disable automatic scroll restoration - we handle it manually
    scrollRestoration: false,
    // Tree-shake heavy barrel-import libraries so only the icons/components
    // actually used are bundled. lucide-react (85 files) and framer-motion
    // (110 files) are the biggest wins here.
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for 31 days (ImageKit assets are
    // content-stable + we cache-bust via ?v= in lib/images.ts).
    minimumCacheTTL: 2678400,
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
        // Long-term immutable caching for Next's content-hashed static assets.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
