"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { VenuePageContent } from "@/components/pages/schedule";

// ═══════════════════════════════════════════════════════════════════
// VENUE PAGE
// Dynamic venue page - fetches data client-side via hooks
// The VenuePageContent handles loading states and error handling
// ═══════════════════════════════════════════════════════════════════

interface PageProps {
  params: Promise<{ venue: string }>;
}

export default function VenuePage({ params }: PageProps) {
  const { venue: slug } = use(params);

  // Basic validation - slug must exist
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  // VenuePageContent handles all data fetching, loading, and error states
  return <VenuePageContent venueSlug={slug} />;
}
