import type { Metadata } from "next";
import { SITE_URL, articlePath, content, localePath, publications, writingPath, type Language } from "./content";
import { summaries } from "./articles";

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
      "Руслан Фаилевич Мамлеев — CTO GetFloorPlan, software architect и IT-ментор. AI, PropTech, распределённые системы, Python, Go и Kubernetes.",
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
      "Engineering writing by Ruslan Mamleev, CTO at GetFloorPlan: depth maps packed into PNG, a configuration contract instead of client forks, and a living infrastructure map.",
    ogTitle: "Writing — Ruslan Mamleev",
    ogDescription: "Architecture decisions from a product already running in production.",
  },
  ru: {
    title: "Публикации — Руслан Мамлеев",
    description:
      "Технические статьи Руслана Мамлеева, CTO GetFloorPlan: карта глубины в PNG, контракт конфигурации вместо клиентских форков и живая карта инфраструктуры.",
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
  additionalName: "Failevich",
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
          itemListElement: publications.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}${articlePath(item.slug)[language]}`,
          })),
        },
      },
      person,
      ...nodes,
    ],
  };
}

function findPublication(slug: string) {
  const item = publications.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown publication: ${slug}`);
  return item;
}

// Summary pages are their own short pieces, based on the Habr articles rather
// than copies of them, so they get their own canonical, dates and Article node.
export function articleMetadata(language: Language, slug: string): Metadata {
  const item = findPublication(slug);
  const copy = content[language];
  const text = copy.pubs[slug as keyof typeof copy.pubs];
  const summary = summaries[slug][language];
  const paths = articlePath(slug);
  const author = language === "ru" ? "Руслан Мамлеев" : "Ruslan Mamleev";

  return {
    title: `${text.title} — ${author}`,
    description: summary.description,
    keywords: [...text.topics, author, "GetFloorPlan"],
    authors: [{ name: author, url: SITE_URL }],
    alternates: {
      canonical: paths[language],
      languages: { en: paths.en, ru: paths.ru, "x-default": paths.en },
    },
    openGraph: {
      type: "article",
      url: paths[language],
      siteName: "Ruslan Mamleev",
      locale: seo[language].locale,
      title: text.title,
      description: summary.description,
      publishedTime: item.summaryPublished,
      modifiedTime: item.summaryPublished,
      authors: [SITE_URL],
      tags: text.topics,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: seo[language].imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: text.title,
      description: summary.description,
      images: ["/og-image.jpg"],
    },
  };
}

// The page's TechArticle is based on the Habr original, which stays in the
// graph under its own @id so both resolve to the same Person as author.
export function articleSchema(language: Language, slug: string) {
  const item = findPublication(slug);
  const copy = content[language];
  const text = copy.pubs[slug as keyof typeof copy.pubs];
  const summary = summaries[slug][language];
  const pageUrl = `${SITE_URL}${articlePath(slug)[language]}`;
  const original = articleNodes(language).filter((node) => node["@id"] === item.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        headline: text.title,
        description: summary.description,
        abstract: summary.lede,
        inLanguage: language,
        datePublished: item.summaryPublished,
        dateModified: item.summaryPublished,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        about: text.topics,
        keywords: text.topics.join(", "),
        image: `${SITE_URL}/og-image.jpg`,
        isBasedOn: { "@id": item.href },
        isPartOf: { "@type": "CollectionPage", url: `${SITE_URL}${writingPath[language]}` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.writing.homeCrumb, item: `${SITE_URL}${localePath[language]}` },
          { "@type": "ListItem", position: 2, name: copy.writing.title, item: `${SITE_URL}${writingPath[language]}` },
          { "@type": "ListItem", position: 3, name: text.title, item: pageUrl },
        ],
      },
      person,
      ...original,
    ],
  };
}
