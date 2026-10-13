import Fuse from "fuse.js";
import collegesData from "@/components/pages/complete-profile/steps/college/data/colleges.json";
import type { College } from "@/components/pages/complete-profile/steps/college/data/config";

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const colleges = collegesData as College[];

// Fuse instance for fuzzy search fallback
const fuse = new Fuse(colleges, {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "district", weight: 0.2 },
    { name: "institutionType", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
  useExtendedSearch: true,
});

// Common abbreviation expansions
const abbreviations: Record<string, string[]> = {
  iit: ["indian institute of technology"],
  nit: ["national institute of technology"],
  iiit: [
    "indian institute of information technology",
    "international institute of information technology",
    "indraprastha institute of information technology",
  ],
  bits: ["birla institute of technology and science"],
  iiser: ["indian institute of science education and research"],
  iisc: ["indian institute of science"],
  iim: ["indian institute of management"],
  nlu: ["national law university", "national law school"],
  aiims: ["all india institute of medical sciences"],
  nift: ["national institute of fashion technology"],
  nid: ["national institute of design"],
  vit: ["vellore institute of technology"],
  srm: ["srm institute of science and technology"],
  dtu: ["delhi technological university"],
  nsut: ["netaji subhas university of technology"],
};

// ═══════════════════════════════════════════════════════════════════
// SEARCH HELPERS
// ═══════════════════════════════════════════════════════════════════

/**
 * Smart search that prioritizes:
 * 1. Exact prefix matches (e.g., "IIT" matches "Indian Institute of Technology")
 * 2. Word boundary matches
 * 3. Fuzzy matches as fallback
 */
export function smartSearch(query: string, limit: number): College[] {
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  const results: College[] = [];
  const seen = new Set<string>();

  // Step 1: Check for abbreviation matches
  for (const word of queryWords) {
    const expansions = abbreviations[word];
    if (expansions) {
      for (const college of colleges) {
        if (seen.has(college.id)) continue;
        if (!college.name) continue;

        const nameLower = college.name.toLowerCase();
        for (const expansion of expansions) {
          if (nameLower.includes(expansion)) {
            // Check if other query words also match
            const otherWords = queryWords.filter((w) => w !== word);
            const allMatch = otherWords.every(
              (w) => nameLower.includes(w) || college.district?.toLowerCase().includes(w)
            );

            if (allMatch || otherWords.length === 0) {
              results.push(college);
              seen.add(college.id);
              break;
            }
          }
        }

        if (results.length >= limit) break;
      }
    }
  }

  // Step 2: Direct substring matches (prioritize start of words)
  if (results.length < limit) {
    for (const college of colleges) {
      if (seen.has(college.id)) continue;
      if (!college.name) continue;

      const nameLower = college.name.toLowerCase();
      const allWordsMatch = queryWords.every((word) => {
        // Check if word appears at start of any word in the name
        const nameWords = nameLower.split(/\s+/);
        return (
          nameWords.some((nw) => nw.startsWith(word)) ||
          nameLower.includes(word) ||
          college.district?.toLowerCase().includes(word)
        );
      });

      if (allWordsMatch) {
        results.push(college);
        seen.add(college.id);
      }

      if (results.length >= limit) break;
    }
  }

  // Step 3: Fuzzy search fallback
  if (results.length < limit) {
    const fuseResults = fuse.search(normalizedQuery, { limit: limit * 2 });

    for (const result of fuseResults) {
      if (seen.has(result.item.id)) continue;

      results.push(result.item);
      seen.add(result.item.id);

      if (results.length >= limit) break;
    }
  }

  return results.slice(0, limit);
}
