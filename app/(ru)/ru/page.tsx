import Site from "@/components/Site";
import { profileSchema } from "@/lib/metadata";

export default function HomeRu() {
  return (
    <>
      <Site language="ru" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema("ru")) }}
      />
    </>
  );
}
