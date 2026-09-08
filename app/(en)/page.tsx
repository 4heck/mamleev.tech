import Site from "@/components/Site";
import { profileSchema } from "@/lib/metadata";

export default function Home() {
  return (
    <>
      <Site language="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema("en")) }}
      />
    </>
  );
}
