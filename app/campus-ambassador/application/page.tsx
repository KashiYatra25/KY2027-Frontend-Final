import { Metadata } from "next";
import { CaApplicationPageContent } from "@/components/pages/ca/application/CaApplicationPageContent";

export const metadata: Metadata = {
  title: "CA Application Status",
  description: "View your Campus Ambassador application status and details for Kashi Yatra 2027.",
  openGraph: {
    title: "CA Application Status | Kashi Yatra 2027",
    description: "Check your Campus Ambassador application status and view any feedback.",
  },
};

export default function CaApplicationPage() {
  return <CaApplicationPageContent />;
}
