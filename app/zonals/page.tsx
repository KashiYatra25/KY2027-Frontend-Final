import { Metadata } from "next";
import { ZonalsPageContent } from "@/components/pages/zonals";

export const metadata: Metadata = {
  title: "Zonals",
  description:
    "Kashi Yatra 2027 Zonals - regional elimination rounds across India leading up to IIT BHU's biggest cultural festival. Compete in your zone and earn your spot at the main stage.",
  keywords: [
    "Kashi Yatra zonals",
    "IIT BHU fest zonals",
    "regional rounds",
    "cultural fest eliminations",
    "Kashi Yatra 2027 zonals",
  ],
  openGraph: {
    title: "Zonals | Kashi Yatra 2027",
    description:
      "Regional elimination rounds across India - compete in your zone and reach the main stage at IIT BHU.",
  },
};

export default function ZonalsPage() {
  return <ZonalsPageContent />;
}
