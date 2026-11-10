import Speaking from "@/components/Speaking";
import { buildMetadata, speakingSchema } from "@/lib/metadata";

export const metadata = buildMetadata("en", "speaking");

export default function SpeakingPage() {
  return (
    <>
      <Speaking language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingSchema("en")) }} />
    </>
  );
}
