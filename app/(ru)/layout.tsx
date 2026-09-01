import type { Metadata } from "next";
import "../globals.css";
import { buildMetadata, profileSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("ru");

export default function RuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema("ru")) }}
        />
      </body>
    </html>
  );
}
