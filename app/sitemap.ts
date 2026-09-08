import type { MetadataRoute } from "next";
import { LANGUAGES, SITE_URL, localePath, publications, writingPath } from "@/lib/content";

// Both locales are indexable URLs, each pointing at the other through
// alternates so Google pairs them instead of treating one as a duplicate.
export const dynamic = "force-static";

const newestPublication = publications
  .map((item) => item.dateModified)
  .sort()
  .at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const home = LANGUAGES.map((language) => ({
    url: `${SITE_URL}${localePath[language]}`,
    changeFrequency: "monthly" as const,
    priority: language === "en" ? 1 : 0.9,
    alternates: {
      languages: { en: `${SITE_URL}${localePath.en}`, ru: `${SITE_URL}${localePath.ru}` },
    },
  }));

  const writing = LANGUAGES.map((language) => ({
    url: `${SITE_URL}${writingPath[language]}`,
    lastModified: newestPublication,
    changeFrequency: "monthly" as const,
    priority: language === "en" ? 0.8 : 0.7,
    alternates: {
      languages: { en: `${SITE_URL}${writingPath.en}`, ru: `${SITE_URL}${writingPath.ru}` },
    },
  }));

  return [...home, ...writing];
}
