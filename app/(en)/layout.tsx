import type { Metadata } from "next";
import "../globals.css";
import { buildMetadata, profileSchema } from "@/lib/metadata";
import YandexMetrika from "@/components/YandexMetrika";

// One root layout per locale (no app/layout.tsx) so <html lang> is correct in
// the served HTML instead of being patched by the client.
export const metadata: Metadata = buildMetadata("en");

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema("en")) }}
        />
        <YandexMetrika />
      </body>
    </html>
  );
}
