import type { MetadataRoute } from "next";
import { LANGUAGES, SITE_URL, articlePath, localePath, publications, writingPath, type Language } from "@/lib/content";

// Every indexable URL in both locales, each entry pointing at its counterpart
// through alternates so Google pairs them instead of treating one as a duplicate.
export const dynamic = "force-static";

const newest = (dates: string[]) => [...dates].sort().at(-1);

function localized(
  paths: Record<Language, string>,
  entry: { priority: [number, number]; lastModified?: string },
): MetadataRoute.Sitemap {
  return LANGUAGES.map((language) => ({
    url: `${SITE_URL}${paths[language]}`,
    lastModified: entry.lastModified,
    changeFrequency: "monthly" as const,
    priority: language === "en" ? entry.priority[0] : entry.priority[1],
    alternates: {
      languages: { en: `${SITE_URL}${paths.en}`, ru: `${SITE_URL}${paths.ru}` },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized(localePath, { priority: [1, 0.9] }),
    ...localized(writingPath, {
      priority: [0.8, 0.7],
      lastModified: newest(publications.flatMap((item) => [item.dateModified, item.summaryPublished])),
    }),
    ...publications.flatMap((item) =>
      localized(articlePath(item.slug), { priority: [0.7, 0.7], lastModified: item.summaryPublished }),
    ),
  ];
}
