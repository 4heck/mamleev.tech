import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mamleev.tech"),
  title: "Ruslan Mamleev — CTO & Software Architect",
  description: "CTO, software architect, and mentor building AI, PropTech, IoT, and distributed systems.",
  alternates: { canonical: "/" },
  keywords: ["Ruslan Mamleev", "Руслан Мамлеев", "Руслан Фаилевич Мамлеев", "CTO", "software architect", "PropTech"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ruslan Mamleev",
  alternateName: ["Руслан Мамлеев", "Руслан Фаилевич Мамлеев", "4heck"],
  url: "https://mamleev.tech",
  jobTitle: ["Chief Technology Officer", "Software Architect", "Mentor"],
  sameAs: [
    "https://www.linkedin.com/in/ruslan-mamleev-948550227/",
    "https://github.com/4heck",
    "https://habr.com/ru/users/4heck/",
    "https://getmentor.dev/mentor/ruslan-mamleev-3868",
    "https://t.me/touchup",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}
