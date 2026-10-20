import { Metadata } from "next";
import { PassesPageContent } from "@/components/pages/passes/components/PassesPageContent";

export const metadata: Metadata = {
  title: "Passes",
  description:
    "Get your Kashi Yatra 2027 passes - Yatri, Swarnim & Darbar tiers. Access Pro Nites, all events, merchandise & exclusive perks at IIT BHU's biggest fest.",
  keywords: [
    "Kashi Yatra passes",
    "IIT BHU fest passes",
    "pro nite passes",
    "cultural fest tickets",
    "Kashi Yatra 2027 registration",
  ],
  openGraph: {
    title: "Get Your Kashi Yatra 2027 Pass",
    description: "Yatri, Swarnim & Darbar passes - Pro Nites, events, merchandise & more!",
  },
};

export default function PassesPage() {
  return <PassesPageContent />;
}
