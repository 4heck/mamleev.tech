import { SiteHeader, SiteFooter } from "@/components/Chrome";
import { summaries } from "@/lib/articles";
import { articlePath, content, localePath, publications, writingPath, type Language } from "@/lib/content";

// Summary page for one publication: an original write-up on this domain that
// sends the reader on to the full article. Cards on the home and writing pages
// link here first, so the depth of each piece is indexable on mamleev.tech
// rather than only on Habr.
export default function Article({ language, slug }: { language: Language; slug: string }) {
  const copy = content[language];
  const item = publications.find((entry) => entry.slug === slug)!;
  const text = copy.pubs[slug as keyof typeof copy.pubs];
  const summary = summaries[slug][language];
  const dateFormat = new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main data-language={language} className="writing-page">
      <SiteHeader language={language} paths={articlePath(slug)} />

      <nav className="breadcrumbs shell" aria-label={copy.writing.breadcrumbLabel}>
        <ol>
          <li><a href={localePath[language]}>{copy.writing.homeCrumb}</a></li>
          <li><a href={writingPath[language]}>{copy.writing.title}</a></li>
          <li aria-current="page">{text.title}</li>
        </ol>
      </nav>

      <article className="article shell">
        <header className="article-head" id="top">
          <div className="feature-meta"><span>{text.meta[0]}</span><span>{text.meta[1]}</span></div>
          <h1>{text.title}</h1>
          <p className="hero-lede">{summary.lede}</p>

          <dl className="writing-facts">
            <div>
              <dt>{copy.writing.authorLabel}</dt>
              <dd>{copy.writing.authorName}</dd>
            </div>
            <div>
              <dt>{copy.writing.publishedLabel}</dt>
              <dd>
                <time dateTime={item.datePublished}>{dateFormat.format(new Date(item.datePublished))}</time>
                {" · "}
                {item.readingMinutes} {language === "ru" ? "мин" : "min"} {copy.writing.readingOnHabr}
              </dd>
            </div>
            <div>
              <dt>{copy.writing.topicsLabel}</dt>
              <dd>{text.topics.join(" · ")}</dd>
            </div>
            <div>
              <dt>{copy.writing.originalLabel}</dt>
              <dd>
                <a href={item.href} target="_blank" rel="noopener">
                  {text.venue}{language === "en" ? ` · ${copy.writing.inRussian}` : ""} <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          </dl>
        </header>

        <div className="article-body">
          {summary.sections.map((section, index) => (
            <section key={section.heading}>
              <div className="section-kicker"><span>{String(index + 1).padStart(2, "0")}</span> {copy.writing.sectionLabels[index]}</div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            </section>
          ))}
        </div>

        <aside className="article-original">
          <p>{copy.writing.summaryNote}</p>
          <ul className="writing-stats">
            {text.stats.map((stat) => <li key={stat}>{stat}</li>)}
          </ul>
          <a className="button button-primary" href={item.href} target="_blank" rel="noopener">
            {copy.writing.originalLink} <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <a className="section-more" href={writingPath[language]}>
          <span aria-hidden="true">←</span> {copy.writing.allPublications}
        </a>
      </article>

      <SiteFooter language={language} />
    </main>
  );
}
