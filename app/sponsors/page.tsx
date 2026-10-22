import { Metadata } from "next";
import { SponsorsPageContent } from "@/components/pages/sponsors/SponsorsPageContent";

export const metadata: Metadata = {
  title: "Partner With Us | Kashiyatra 2027",
  description:
    "Join the cultural movement. Partner with Kashiyatra - IIT BHU's biggest socio-cultural festival. Connect with 90,000+ students across 4 days of music, art, and performance.",
  openGraph: {
    title: "Partner With Us | Kashiyatra 2027",
    description: "Your brand. Our stage. Partner with IIT BHU's biggest cultural festival.",
  },
  keywords: [
    "Kashiyatra sponsorship",
    "IIT BHU fest sponsor",
    "college fest partnership",
    "brand activation",
    "campus marketing",
    "youth engagement",
    "cultural festival sponsor",
  ],
};

export default function SponsorsPage() {
  return <SponsorsPageContent />;
}
