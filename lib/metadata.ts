import type { Metadata } from "next";
import { SITE_URL, localePath, type Language } from "./content";

// Per-locale snippet copy. The root page keeps the name in both scripts so it
// can match Cyrillic name queries; the Russian page is written in Russian
// throughout and hreflang decides which one a searcher is shown.
const seo = {
  en: {
    title: "Ruslan Mamleev · Руслан Мамлеев — CTO & Software Architect",
    description:
      "Personal site of Ruslan Mamleev — CTO at GetFloorPlan, software architect and tech mentor. AI, PropTech, distributed systems, Python, Go and Kubernetes.",
    ogTitle: "Ruslan Mamleev — CTO & Software Architect",
    ogDescription:
      "Technical leader working across AI, PropTech, IoT and distributed systems.",
    imageAlt: "Ruslan Mamleev — CTO & Software Architect",
    locale: "en_US",
  },
  ru: {
    title: "Руслан Мамлеев — CTO, Software Architect & Tech Mentor",
    description:
      "Персональный сайт Руслана Мамлеева — CTO GetFloorPlan, software architect и IT-ментор. AI, PropTech, распределённые системы, Python, Go и Kubernetes.",
    ogTitle: "Руслан Мамлеев — CTO & Software Architect",
    ogDescription:
      "Технический руководитель в AI, PropTech, IoT и распределённых системах.",
    imageAlt: "Руслан Мамлеев — CTO и архитектор ПО",
    locale: "ru_RU",
  },
} satisfies Record<Language, Record<string, string>>;

const keywords = [
  "Ruslan Mamleev",
  "Руслан Мамлеев",
  "Мамлеев Руслан Фаилевич",
  "CTO GetFloorPlan",
  "архитектор программного обеспечения",
  "IT-ментор",
  "software architect",
  "PropTech",
];

export function buildMetadata(language: Language): Metadata {
  const copy = seo[language];
  const path = localePath[language];

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        en: localePath.en,
        ru: localePath.ru,
        "x-default": localePath.en,
      },
    },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "profile",
      url: path,
      siteName: "Ruslan Mamleev",
      locale: copy.locale,
      title: copy.ogTitle,
      description: copy.ogDescription,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: copy.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.ogDescription,
      images: ["/og-image.jpg"],
    },
  };
}

// Google reads a personal page as a ProfilePage whose mainEntity is the Person.
export function profileSchema(language: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}${localePath[language]}`,
    inLanguage: language,
    mainEntity: {
      "@type": "Person",
      name: "Ruslan Mamleev",
      alternateName: ["Руслан Мамлеев", "Руслан Фаилевич Мамлеев", "4heck"],
      jobTitle: "Chief Technology Officer",
      image: `${SITE_URL}/ruslan-portrait.jpg`,
      url: SITE_URL,
      worksFor: {
        "@type": "Organization",
        name: "GetFloorPlan",
        url: "https://getfloorplan.com/",
      },
      sameAs: [
        "https://www.linkedin.com/in/ruslan-mamleev-948550227/",
        "https://github.com/4heck",
        "https://habr.com/ru/users/4heck/",
        "https://getmentor.dev/mentor/ruslan-mamleev-3868",
        "https://t.me/touchup",
      ],
      knowsAbout: [
        "Software Architecture",
        "PropTech",
        "Artificial Intelligence",
        "Distributed Systems",
        "Python",
        "Go",
        "Kubernetes",
      ],
    },
  };
}
