import type { Metadata } from "next";
import Article from "@/components/Article";
import { publications } from "@/lib/content";
import { articleMetadata, articleSchema } from "@/lib/metadata";

// One prerendered page per publication; unknown slugs are not generated.
export const dynamicParams = false;

export function generateStaticParams() {
  return publications.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("ru", slug);
}

export default async function ArticleRu({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <Article language="ru" slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema("ru", slug)) }}
      />
    </>
  );
}
