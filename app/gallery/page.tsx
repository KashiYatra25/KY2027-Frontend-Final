import { Metadata } from "next";
import { GalleryPageContent } from "@/components/pages/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Relive the magic of Kashiyatra through our gallery. Photos, videos, and memories from IIT BHU's grandest cultural festival.",
  openGraph: {
    title: "Gallery | Kashi Yatra 2027",
    description:
      "A collection of moments that tell the story of Kashiyatra - photos, videos, and memories from past editions.",
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
