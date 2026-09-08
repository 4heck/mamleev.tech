import type { Metadata } from "next";
import Writing from "@/components/Writing";
import { buildMetadata, writingSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("ru", "writing");

export default function WritingRu() {
  return (
    <>
      <Writing language="ru" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(writingSchema("ru")) }}
      />
    </>
  );
}
