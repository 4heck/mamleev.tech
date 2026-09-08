import type { Metadata } from "next";
import { SITE_URL, content, localePath, publications, writingPath, type Language } from "./content";

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

const writingSeo = {
  en: {
    title: "Writing — Ruslan Mamleev",
    description:
      "Engineering writing by Ruslan Mamleev, CTO at GetFloorPlan: configuration-driven platform architecture, and mapping startup infrastructure with AI agents.",
    ogTitle: "Writing — Ruslan Mamleev",
    ogDescription: "Architecture decisions from a product already running in production.",
  },
  ru: {
    title: "Публикации — Руслан Мамлеев",
    description:
      "Технические статьи Руслана Мамлеева, CTO GetFloorPlan: платформа конфигураций вместо клиентских форков и живая карта инфраструктуры на ИИ-агентах.",
    ogTitle: "Публикации — Руслан Мамлеев",
    ogDescription: "Архитектурные решения в продукте, который уже работает в проде.",
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

export type Page = "home" | "writing";

export function buildMetadata(language: Language, page: Page = "home"): Metadata {
  const home = page === "home";
  const copy = home ? seo[language] : { ...seo[language], ...writingSeo[language] };
  const paths = home ? localePath : writingPath;
  const path = paths[language];

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        en: paths.en,
        ru: paths.ru,
        "x-default": paths.en,
      },
    },
    // /favicon.ico is what crawlers and older browsers request by convention;
    // without it every bot pass left a 404 in the access log.
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      type: home ? "profile" : "website",
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

const PERSON_ID = `${SITE_URL}/#person`;

// One Person node, referenced by @id from every page and from every article,
// so the two locales and both publications resolve to a single entity rather
// than to four unrelated mentions of the same name.
const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Ruslan Mamleev",
  givenName: "Ruslan",
  familyName: "Mamleev",
  additionalName: "Failovich",
  alternateName: ["Руслан Мамлеев", "Руслан Фаилевич Мамлеев", "4heck"],
  identifier: "4heck",
  jobTitle: "Chief Technology Officer",
  image: `${SITE_URL}/ruslan-portrait.jpg`,
  url: SITE_URL,
  homeLocation: {
    "@type": "Place",
    name: "Kazan, Russia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kazan",
      addressCountry: "RU",
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kazan Federal University — Institute of Computational Mathematics and Information Technologies",
    alternateName: "КФУ, ИВМиИТ — прикладная информатика",
    sameAs: "https://kpfu.ru/",
  },
  worksFor: {
    "@type": "Organization",
    name: "GetFloorPlan",
    url: "https://getfloorplan.com/",
  },
  // schema.org defines `founder` on Organization, not on Person, so the
  // co-founder relation is expressed by the Organization node below pointing
  // back at this @id. `affiliation` is the valid Person-side link.
  affiliation: {
    "@type": "Organization",
    name: "Virtual Technologies LLC",
    url: "https://hart-estate.ru/",
  },
  sameAs: [
    "https://www.linkedin.com/in/ruslan-mamleev-948550227/",
    "https://github.com/4heck",
    "https://habr.com/ru/users/4heck/",
    "https://getmentor.dev/mentor/ruslan-mamleev-3868",
    "https://t.me/touchup",
  ],
  subjectOf: publications.map((item) => ({ "@id": item.href })),
  knowsAbout: [
    "Software Architecture",
    "Platform Engineering",
    "PropTech",
    "Artificial Intelligence",
    "Distributed Systems",
    "Python",
    "Go",
    "Kubernetes",
  ],
};

const foundedOrganization = {
  "@type": "Organization",
  name: "Virtual Technologies LLC",
  alternateName: "ООО «Виртуальные технологии»",
  url: "https://hart-estate.ru/",
  founder: { "@id": PERSON_ID },
};

// The articles live on Habr, so each node points at the Habr URL as its
// mainEntityOfPage. This site cites them; it does not claim to host them.
function articleNodes(language: Language) {
  const copy = content[language].pubs;

  return publications.map((item) => {
    const text = copy[item.slug as keyof typeof copy];

    return {
      "@type": "TechArticle",
      "@id": item.href,
      url: item.href,
      mainEntityOfPage: item.href,
      headline: text.title,
      description: text.text,
      datePublished: item.datePublished,
      dateModified: item.dateModified,
      inLanguage: "ru",
      author: { "@id": PERSON_ID },
      about: text.topics,
      keywords: text.topics.join(", "),
      image: `${SITE_URL}/og-image.jpg`,
      timeRequired: `PT${item.readingMinutes}M`,
    };
  });
}

// Google reads a personal page as a ProfilePage whose mainEntity is the Person.
export function profileSchema(language: Language) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url: `${SITE_URL}${localePath[language]}`,
        inLanguage: language,
        mainEntity: { "@id": PERSON_ID },
      },
      person,
      foundedOrganization,
      ...articleNodes(language),
    ],
  };
}

// The writing route is a CollectionPage over the same article nodes, so the
// publications carry one identity across both pages.
export function writingSchema(language: Language) {
  const nodes = articleNodes(language);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE_URL}${writingPath[language]}`,
        inLanguage: language,
        name: content[language].writing.title,
        description: content[language].writing.lede,
        about: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_URL}${localePath[language]}` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: nodes.map((node, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: node.url,
          })),
        },
      },
      person,
      ...nodes,
    ],
  };
}
