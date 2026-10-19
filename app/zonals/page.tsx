import { Metadata } from "next";
import { ZonalsLandingContent } from "@/components/pages/zonals";

export const metadata: Metadata = {
  title: "Zonals | Kashi Yatra 2027",
  description:
    "Kashi Yatra 2027 Zonals - regional events across partner colleges. Compete at your nearest college and showcase your talent.",
  keywords: [
    "Kashi Yatra zonals",
    "IIT BHU fest zonals",
    "regional rounds",
    "RGIPT zonals",
    "Kashi Yatra 2027",
  ],
};

export default function ZonalsPage() {
  return <ZonalsLandingContent />;
}
