import Speaking from "@/components/Speaking";
import { buildMetadata, speakingSchema } from "@/lib/metadata";

export const metadata = buildMetadata("ru", "speaking");

export default function SpeakingPageRu() {
  return (
    <>
      <Speaking language="ru" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingSchema("ru")) }} />
    </>
  );
}
