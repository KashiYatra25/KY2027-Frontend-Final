import { Metadata } from "next";
import { CollegesPageContent } from "@/components/pages/zonals";

export const metadata: Metadata = {
  title: "Zonal Colleges | Kashi Yatra 2027",
  description:
    "Pick your college and jump into Kashi Yatra 2027 Zonals — regional events held across partner colleges. Find your campus and register.",
  keywords: [
    "Kashi Yatra zonal colleges",
    "IIT BHU fest zonals",
    "partner colleges",
    "select college",
    "Kashi Yatra 2027",
  ],
};

export default function ZonalCollegesPage() {
  return <CollegesPageContent />;
}
