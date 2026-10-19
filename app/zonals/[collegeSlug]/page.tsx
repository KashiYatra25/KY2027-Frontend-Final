import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZonalCollegePageContent } from "@/components/pages/zonals";
import { ZONAL_COLLEGES } from "@/components/pages/zonals/config/zonals.config";

interface PageProps {
  params: Promise<{ collegeSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collegeSlug } = await params;
  const college = ZONAL_COLLEGES.find((c) => c.slug === collegeSlug);

  if (!college) {
    return { title: "College Not Found | Kashi Yatra 2027" };
  }

  return {
    title: `${college.shortName} Zonals | Kashi Yatra 2027`,
    description: college.description,
    keywords: [
      `${college.shortName} zonals`,
      `Kashi Yatra ${college.shortName}`,
      `${college.city} cultural fest`,
      "Kashi Yatra 2027",
    ],
  };
}

export function generateStaticParams() {
  return ZONAL_COLLEGES.map((college) => ({
    collegeSlug: college.slug,
  }));
}

export default async function CollegeZonalPage({ params }: PageProps) {
  const { collegeSlug } = await params;
  const college = ZONAL_COLLEGES.find((c) => c.slug === collegeSlug);

  if (!college) {
    notFound();
  }

  return <ZonalCollegePageContent college={college} />;
}
