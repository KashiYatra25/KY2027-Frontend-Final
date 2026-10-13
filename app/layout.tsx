import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Cinzel_Decorative, Cinzel, Cormorant_Garamond } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import "./globals.css";
import GsapRegistration from "@/lib/GsapRegistration";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { PageLoader } from "@/components/loader";
import { AuthProvider, QueryProvider, ApolloProvider } from "@/components/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ethereal, ornate carved-in-stone display serif for the navbar / headings.
const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Elegant small-caps serif for the schedule map labels and event cards.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://kashiyatra.in";
const siteName = "Kashi Yatra 2027";
const siteDescription =
  "Kashi Yatra 2027 - The biggest cultural fest of IIT (BHU) Varanasi. 4 days, 50+ events, Pro Nites with top artists. Experience where tradition meets the future.";

export const metadata: Metadata = {
  // Basic
  title: {
    default: "Kashi Yatra 2027 | IIT BHU's Biggest Cultural Festival",
    template: "%s | Kashi Yatra 2027",
  },
  description: siteDescription,
  keywords: [
    "Kashi Yatra",
    "Kashi Yatra 2027",
    "IIT BHU",
    "IIT BHU fest",
    "IIT BHU cultural fest",
    "cultural festival",
    "Varanasi",
    "college fest",
    "pro nites",
    "cultural events",
    "Banaras",
    "BHU fest",
    "IIT Varanasi",
  ],
  authors: [{ name: "Kashi Yatra Team, IIT (BHU) Varanasi" }],
  creator: "IIT (BHU) Varanasi",
  publisher: "Kashi Yatra",

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: siteName,
    title: "Kashi Yatra 2027 | IIT BHU's Biggest Cultural Festival",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kashi Yatra 2027 - IIT BHU Cultural Festival",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Kashi Yatra 2027 | IIT BHU Cultural Fest",
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@kashiyatra",
    site: "@kashiyatra",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/manifest.json",

  // Canonical
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // Category
  category: "events",

  // Verification (add your IDs when available)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD700" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a15" },
  ],
};

// JSON-LD Structured Data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Kashi Yatra 2027",
  description: siteDescription,
  image: `${siteUrl}/og-image.jpg`,
  startDate: "2027-02-01",
  endDate: "2027-02-04",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "IIT (BHU) Varanasi",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Indian Institute of Technology (BHU)",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221005",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "IIT (BHU) Varanasi",
    url: siteUrl,
  },
  performer: {
    "@type": "PerformingGroup",
    name: "Various Artists",
  },
  offers: {
    "@type": "Offer",
    url: `${siteUrl}/passes`,
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzelDecorative.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Toaster />
        <ApolloProvider>
          <QueryProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <AuthProvider>
              <GsapRegistration />
              <Suspense fallback={null}>
                <PageLoader />
              </Suspense>
              <MotionConfig reducedMotion="user">
                <SmoothScroll>{children}</SmoothScroll>
              </MotionConfig>
            </AuthProvider>
          </QueryProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
