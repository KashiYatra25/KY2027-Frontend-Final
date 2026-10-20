import { Metadata } from "next";
import { ZonalsAboutContent } from "@/components/pages/zonals";

export const metadata: Metadata = {
  title: "About Zonals | Kashi Yatra 2027",
  description:
    "Zonals are regional events hosted by the Kashi Yatra team at partner colleges. Winning teams earn up to 35–40% off Kashi Yatra festival tickets.",
  keywords: [
    "about Kashi Yatra zonals",
    "IIT BHU fest zonals",
    "zonal winners discount",
    "Kashi Yatra 2027",
  ],
};

export default function ZonalsAboutPage() {
  return <ZonalsAboutContent />;
}
