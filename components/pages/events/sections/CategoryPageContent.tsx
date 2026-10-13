"use client";

import { useSession } from "next-auth/react";
import { ThemedNavbar } from "@/components/navbar";
import type { EventCategory, EventCategorySlug } from "@/lib/api/helper/types";
import { useEventsByCategory, useMyRegistrations, CATEGORY_METADATA } from "@/lib/api/hooks";
import { SubEventCard, CategoryHeader } from "@/components/pages/events/components";
import { BackgroundDecorations } from "@/components/pages/events/components/CategoryDecorations";
import { AlertCircle, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
// EVENT CARD SKELETON - FESTIVE STYLE
// ═══════════════════════════════════════════════════════════════════

function EventCardSkeleton({ index, color }: { index: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(160deg, 
          hsl(from ${color} h s 12% / 0.95) 0%,
          hsl(from ${color} h s 6% / 0.98) 40%,
          hsl(from ${color} h s 8% / 0.95) 100%
        )`,
        border: `2px solid ${color}25`,
        minHeight: "380px",
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Title skeleton */}
        <div className="mb-4 flex items-start justify-between">
          <div
            className="h-7 w-2/3 animate-pulse rounded-lg"
            style={{ background: `${color}20` }}
          />
          <div
            className="h-7 w-20 animate-pulse rounded-full"
            style={{ background: `${color}15` }}
          />
        </div>

        {/* Divider */}
        <div className="mb-4 h-px" style={{ background: `${color}20` }} />

        {/* Tagline skeleton */}
        <div
          className="mb-3 h-4 w-1/2 animate-pulse rounded"
          style={{ background: `${color}15` }}
        />

        {/* Description skeleton */}
        <div
          className="mb-2 h-3 w-full animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="mb-2 h-3 w-5/6 animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="mb-6 h-3 w-4/6 flex-1 animate-pulse rounded"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />

        {/* Button skeleton */}
        <div
          className="mt-auto h-12 w-full animate-pulse rounded-xl"
          style={{ background: `${color}20` }}
        />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GRID LOADER
// ═══════════════════════════════════════════════════════════════════

function EventsGridLoader({ color }: { color: string }) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCardSkeleton key={index} index={index} color={color} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ERROR STATE - FESTIVE STYLE
// ═══════════════════════════════════════════════════════════════════

function EventsError({
  message,
  onRetry,
  color,
}: {
  message: string;
  onRetry: () => void;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "2px solid rgba(239, 68, 68, 0.3)",
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.2)",
        }}
      >
        <AlertCircle className="h-10 w-10 text-red-400" />
      </div>
      <h3
        className="mb-2 text-xl font-bold italic"
        style={{ fontFamily: "Georgia, serif", color: "#FDF6E3" }}
      >
        Failed to load events
      </h3>
      <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        {message}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, hsl(from ${color} h s 30%) 100%)`,
          border: `2px solid ${color}`,
          color: "#FDF6E3",
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </motion.button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EMPTY STATE - FESTIVE STYLE
// ═══════════════════════════════════════════════════════════════════

function EmptyEvents({ categoryName, color }: { categoryName: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          background: `${color}20`,
          border: `2px solid ${color}40`,
          boxShadow: `0 0 30px ${color}20`,
        }}
      >
        <Sparkles className="h-10 w-10" style={{ color }} />
      </div>
      <h3
        className="mb-2 text-xl font-bold italic"
        style={{ fontFamily: "Georgia, serif", color: "#FDF6E3" }}
      >
        Coming Soon
      </h3>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Events for {categoryName} will be announced soon!
      </p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAYMENT REQUIRED BANNER
// ═══════════════════════════════════════════════════════════════════

function PaymentRequiredBanner({}: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 overflow-hidden rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%)",
        border: "2px solid rgba(239, 68, 68, 0.35)",
        boxShadow: "0 0 30px rgba(239, 68, 68, 0.15)",
      }}
    >
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(239, 68, 68, 0.2)" }}
          >
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-red-300">Pass Required</p>
            <p className="text-sm text-red-200/70">Purchase a pass to register for events</p>
          </div>
        </div>
        <Link
          href="/passes"
          className="group flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg"
          style={{ boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
        >
          Buy Pass
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

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
  const { data: session } = useSession();
  const isPaidUser = session?.user?.isPaidUser ?? false;

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
