import { Metadata } from "next";
import { ThemedNavbar } from "@/components/navbar";
import FestEvents from "@/components/pages/events/fest/FestEvents";

export const metadata: Metadata = {
  title: "Events",
  description:
    "80+ competitions at Kashi Yatra 2027 - Dance, Music, Drama, Fashion, Art, Quiz, Literary events & more. Register now for IIT BHU's biggest cultural fest.",
  keywords: [
    "Kashi Yatra events",
    "IIT BHU competitions",
    "cultural events",
    "dance competition",
    "music competition",
    "college fest events",
  ],
  openGraph: {
    title: "Events at Kashi Yatra 2027",
    description: "80+ events across Dance, Music, Drama, Fashion, Art & more. Compete & win!",
  },
};

export default function EventsPage() {
  return (
    <>
      {/* Rendered outside the explorer so its fonts/styles don't leak into the navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>
      <FestEvents />
    </>
  );
}
