"use client";

import { ThemedNavbar } from "@/components/navbar/ThemedNavbar";
import type { EventCategory, EventCategorySlug } from "@/lib/api/helper/types";
import {
  useEventsByCategory,
  useMyRegistrations,
  useMyAccount,
  CATEGORY_METADATA,
} from "@/lib/api/hooks";
import { SubEventCard, CategoryHeader } from "@/components/pages/events/components";
import { BackgroundDecorations } from "@/components/pages/events/components/decor";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EventsGridLoader } from "./loader/EventsGridLoader";
import { EventsError } from "./EventsError";
import { EmptyEvents } from "./EmptyEvents";
import { PaymentRequiredBanner } from "./PaymentRequiredBanner";

// ═══════════════════════════════════════════════════════════════════
// SLUG MAPPING
// ═══════════════════════════════════════════════════════════════════

const SLUG_TO_CATEGORY: Record<string, EventCategorySlug> = {
  natraj: "NATRAJ",
  crosswindz: "CROSSWINDZ",
  bandish: "BANDISH",
  abhinay: "ABHINAY",
  mirage: "MIRAGE",
  toolika: "TOOLIKA",
  enquizta: "ENQUIZTA",
  samwaad: "SAMWAAD",
  zaika: "ZAIKA",
};

// ═══════════════════════════════════════════════════════════════════
// CATEGORY PAGE CONTENT - FESTIVE DESIGN
// ═══════════════════════════════════════════════════════════════════

interface CategoryPageContentProps {
  category?: EventCategory;
  categorySlug?: string;
}

export function CategoryPageContent({
  category: legacyCategory,
  categorySlug,
}: CategoryPageContentProps) {
  const slug = categorySlug ?? legacyCategory?.slug;
  const categoryKey = slug ? SLUG_TO_CATEGORY[slug.toLowerCase()] : null;
  const categoryMeta = categoryKey ? CATEGORY_METADATA[categoryKey] : null;

  const { events, isLoading, isError, errorMessage, refetch } = useEventsByCategory(
    categoryKey ?? "NATRAJ"
  );

  const { isRegisteredFor, refetch: refetchRegistrations } = useMyRegistrations();
  const { profile } = useMyAccount("full");
  // Use fresh profile data instead of stale session
  const isPaidUser = profile?.isPaidUser ?? false;

  // 404 state - still use basic navbar
  if (!categoryKey || !categoryMeta) {
    return (
      <>
        <div className="fixed inset-x-0 top-0 z-[200]">
          <ThemedNavbar position="relative" topOffset={18} theme="main" />
        </div>
        <main
          className="flex min-h-screen items-center justify-center px-4 pt-28 pb-20"
          style={{
            background: "linear-gradient(180deg, #0c0810 0%, #150a14 50%, #0c0810 100%)",
          }}
        >
          <div className="text-center">
            <h2
              className="mb-3 text-3xl font-bold italic"
              style={{ fontFamily: "Georgia, serif", color: "#FDF6E3" }}
            >
              Category not found
            </h2>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              The category &quot;{slug}&quot; does not exist.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              Back to Events
            </Link>
          </div>
        </main>
      </>
    );
  }

  const categoryForHeader = legacyCategory ?? {
    id: categoryKey,
    name: categoryMeta.name,
    slug: slug!,
    tagline: categoryMeta.tagline,
    description: categoryMeta.description,
    icon: categoryMeta.icon,
    color: categoryMeta.color,
    subEvents: [],
  };

  const subEvents =
    legacyCategory?.subEvents ??
    events.map((e) => ({
      id: e.id,
      slug: e.slug,
      name: e.name,
      tagline: e.tagline,
      description: e.description ?? e.tagline,
      type: e.participationType.toLowerCase() as "individual" | "team" | "duo",
      teamSize:
        e.minTeamSize && e.maxTeamSize ? `${e.minTeamSize}-${e.maxTeamSize} members` : undefined,
      minTeamSize: e.minTeamSize ?? undefined,
      maxTeamSize: e.maxTeamSize ?? undefined,
      registrationOpen: e.registrationOpen,
      image: e.imageUrl ?? undefined,
      prizePool: e.prizePool ?? undefined,
    }));

  // Update category with loaded events for header stats
  const categoryWithEvents = {
    ...categoryForHeader,
    subEvents,
  };

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="relative min-h-screen overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pt-32"
        style={{
          background: `linear-gradient(180deg, 
            #0c0810 0%,
            hsl(from ${categoryMeta.color} h 45% 7%) 20%,
            hsl(from ${categoryMeta.color} h 50% 10%) 50%,
            hsl(from ${categoryMeta.color} h 45% 7%) 80%,
            #0c0810 100%
          )`,
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════
            BACKGROUND DECORATIVE ELEMENTS
        ═══════════════════════════════════════════════════════════════════ */}

        {/* Custom SVG decorations */}
        <BackgroundDecorations color={categoryMeta.color} />

        {/* Radial glow */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 30% 20%, ${categoryMeta.color}15 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${categoryMeta.color}10 0%, transparent 40%)
            `,
          }}
        />

        {/* Animated floating particles */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                background: categoryMeta.color,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                opacity: 0.3,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="pointer-events-none fixed inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, transparent 0%, #0c0810 100%),
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 60px,
                ${categoryMeta.color}05 60px,
                ${categoryMeta.color}05 61px
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 60px,
                ${categoryMeta.color}03 60px,
                ${categoryMeta.color}03 61px
              )
            `,
          }}
        />

        {/* ═══════════════════════════════════════════════════════════════════
            MAIN CONTENT
        ═══════════════════════════════════════════════════════════════════ */}

        <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl">
          {/* Category header - without back button now since navbar has category nav */}
          <CategoryHeader category={categoryWithEvents} />

          {/* Payment required banner */}
          {!isPaidUser && <PaymentRequiredBanner color={categoryMeta.color} />}

          {/* Events grid - using auto-rows-fr for equal height */}
          {isLoading && !legacyCategory ? (
            <EventsGridLoader color={categoryMeta.color} />
          ) : isError && !legacyCategory ? (
            <EventsError
              message={errorMessage ?? "Something went wrong"}
              onRetry={refetch}
              color={categoryMeta.color}
            />
          ) : subEvents.length === 0 ? (
            <EmptyEvents categoryName={categoryMeta.name} color={categoryMeta.color} />
          ) : (
            <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {subEvents.map((event, index) => (
                <SubEventCard
                  key={event.id}
                  event={event}
                  eventSlug={event.slug ?? event.id}
                  categoryColor={categoryMeta.color}
                  index={index}
                  isRegistered={isRegisteredFor(event.slug ?? event.id)}
                  onRegistrationSuccess={refetchRegistrations}
                  canRegister={isPaidUser}
                />
              ))}
            </div>
          )}

          {/* Bottom decorative element */}
          {!isLoading && !isError && subEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex items-center justify-center gap-4"
            >
              <div
                className="h-px w-16"
                style={{
                  background: `linear-gradient(90deg, transparent, ${categoryMeta.color}50)`,
                }}
              />
              <Sparkles className="h-5 w-5" style={{ color: `${categoryMeta.color}60` }} />
              <div
                className="h-px w-16"
                style={{
                  background: `linear-gradient(90deg, ${categoryMeta.color}50, transparent)`,
                }}
              />
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
