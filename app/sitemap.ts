import type { MetadataRoute } from "next";
import { LANGUAGES, SITE_URL, localePath } from "@/lib/content";

// Both locales are indexable URLs, each pointing at the other through
// alternates so Google pairs them instead of treating one as a duplicate.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGUAGES.map((language) => ({
    url: `${SITE_URL}${localePath[language]}`,
    changeFrequency: "monthly",
    priority: language === "en" ? 1 : 0.9,
    alternates: {
      languages: {
        en: `${SITE_URL}${localePath.en}`,
        ru: `${SITE_URL}${localePath.ru}`,
      },
    },
  }));
}
