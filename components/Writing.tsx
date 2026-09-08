import { SiteHeader, SiteFooter } from "@/components/Chrome";
import { content, localePath, publications, writingPath, type Language } from "@/lib/content";

// Standalone route for the publications, so each article has a stable place on
// this domain that carries its own metadata instead of only a card anchor on
// the home page.
export default function Writing({ language }: { language: Language }) {
  const copy = content[language];
  const dateFormat = new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main data-language={language} className="writing-page">
      <SiteHeader language={language} paths={writingPath} />

      <section className="writing-intro shell" id="top">
        <div className="section-kicker"><span>—</span> {copy.writing.title}</div>
        <h1>{copy.writing.title}</h1>
        <p className="hero-lede">{copy.writing.lede}</p>
        <a className="section-more" href={localePath[language]}>
          <span aria-hidden="true">←</span> {copy.writing.backHome}
        </a>
      </section>

      <section className="writing-list shell" aria-label={copy.writing.title}>
        {publications.map((item) => {
          const text = copy.pubs[item.slug as keyof typeof copy.pubs];

          return (
            <article className="writing-entry" key={item.slug}>
              <div className="writing-entry-head">
                <div className="feature-meta"><span>{text.meta[0]}</span><span>{text.meta[1]}</span></div>
                <h2>
                  <a href={item.href} target="_blank" rel="noreferrer">{text.title}</a>
                </h2>
                <p className="writing-summary">{text.text}</p>
              </div>

              <dl className="writing-facts">
                <div>
                  <dt>{copy.writing.publishedLabel}</dt>
                  <dd>
                    <time dateTime={item.datePublished}>{dateFormat.format(new Date(item.datePublished))}</time>
                    {" · "}
                    {item.readingMinutes} {language === "ru" ? "мин" : "min"}
                  </dd>
                </div>
                <div>
                  <dt>{copy.writing.topicsLabel}</dt>
                  <dd>{text.topics.join(" · ")}</dd>
                </div>
                <div>
                  <dt>{copy.writing.resultLabel}</dt>
                  <dd>{text.result}</dd>
                </div>
                <div>
                  <dt>{copy.writing.venueLabel}</dt>
                  <dd>{text.venue}{language === "en" ? ` · ${copy.writing.inRussian}` : ""}</dd>
                </div>
                <div>
                  <dt>{copy.writing.authorLabel}</dt>
                  <dd>{copy.writing.authorName}</dd>
                </div>
              </dl>

              <div className="writing-entry-foot">
                <ul className="writing-stats">
                  {text.stats.map((stat) => <li key={stat}>{stat}</li>)}
                </ul>
                <a className="button button-primary" href={item.href} target="_blank" rel="noreferrer">
                  {text.action} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
