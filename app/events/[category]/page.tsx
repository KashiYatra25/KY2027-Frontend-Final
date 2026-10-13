import { Metadata } from "next";
import { CategoryPageContent } from "@/components/pages/events";

interface PageProps {
  params: Promise<{ category: string }>;
}

// Valid category slugs for static generation
const VALID_CATEGORY_SLUGS = [
  "natraj",
  "crosswindz",
  "bandish",
  "abhinay",
  "mirage",
  "toolika",
  "enquizta",
  "samwaad",
  "zaika",
];

const CATEGORY_NAMES: Record<string, string> = {
  natraj: "Natraj",
  crosswindz: "Crosswindz",
  bandish: "Bandish",
  abhinay: "Abhinay",
  mirage: "Mirage",
  toolika: "Toolika",
  enquizta: "Enquizta",
  samwaad: "Samwaad",
  zaika: "Zaika",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  natraj: "Express yourself through the art of movement",
  crosswindz: "Where melodies meet magic",
  bandish: "Traditional rhythms, timeless beauty",
  abhinay: "Stories that come alive on stage",
  mirage: "Style meets creativity on the runway",
  toolika: "Canvas of imagination and color",
  enquizta: "Test your knowledge, win glory",
  samwaad: "Words that inspire and ignite",
  zaika: "A feast for the senses",
};

export async function generateStaticParams() {
  return VALID_CATEGORY_SLUGS.map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const name = CATEGORY_NAMES[slug];
  const description = CATEGORY_DESCRIPTIONS[slug];

  if (!name) {
    return {
      title: "Category Not Found | Kashi Yatra 2027",
    };
  }

  return {
    title: `${name} | Kashi Yatra 2027`,
    description: `${description} Explore all ${name} events at Kashi Yatra 2027.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;

  // Validate slug
  if (!VALID_CATEGORY_SLUGS.includes(slug)) {
    // The component will handle displaying "not found"
    return <CategoryPageContent categorySlug={slug} />;
  }

  return <CategoryPageContent categorySlug={slug} />;
}
