import type { Metadata } from "next";
import Writing from "@/components/Writing";
import { buildMetadata, writingSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en", "writing");

export default function WritingEn() {
  return (
    <>
      <Writing language="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(writingSchema("en")) }}
      />
    </>
  );
}
