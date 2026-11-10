import { SiteHeader, SiteFooter } from "@/components/Chrome";
import { articlePath, content, speakingPath, type Language } from "@/lib/content";
import { PRACTICUM_URL, SPEAKING_CONTACT, speaking } from "@/lib/speaking";

export default function Speaking({ language }: { language: Language }) {
  const copy = speaking[language];
  const publications = content[language].pubs;

  return (
    <main data-language={language} className="speaking-page">
      <SiteHeader language={language} paths={speakingPath} />

      <section className="speaking-intro shell" id="top" aria-labelledby="speaking-title">
        <div>
          <p className="eyebrow">{copy.name} · {content[language].role}</p>
          <h1 id="speaking-title">{copy.title}</h1>
          <p className="hero-lede">{copy.lede}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={SPEAKING_CONTACT} target="_blank" rel="noreferrer">
              {copy.invite} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <figure className="speaking-portrait">
          <img src="/ruslan-portrait.jpg" alt={copy.portraitAlt} width={640} height={640} />
          <figcaption>
            <a href="/ruslan-portrait.jpg" target="_blank" rel="noreferrer">{copy.portraitLink} <span aria-hidden="true">↗</span></a>
          </figcaption>
        </figure>
      </section>

      <section className="section-grid shell" aria-labelledby="talk-topics">
        <div className="section-kicker"><span>01</span> {copy.topicsLabel}</div>
        <div className="speaking-topics">
          <h2 className="speaking-section-title" id="talk-topics">{copy.topicsTitle}</h2>
          {copy.talks.map((talk) => (
            <article className="talk-card" key={talk.id} aria-labelledby={talk.id}>
              <h3 id={talk.id}>{talk.title}</h3>
              <dl className="writing-facts talk-facts">
                <div><dt>{copy.audienceLabel}</dt><dd>{talk.audience}</dd></div>
                <div><dt>{copy.formatLabel}</dt><dd>{talk.format}</dd></div>
                <div><dt>{copy.durationLabel}</dt><dd>{talk.duration}</dd></div>
              </dl>
              <h4 className="talk-points-label">{copy.pointsLabel}</h4>
              <ul className="talk-points">
                {talk.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className="talk-sources">
                <p>{copy.sourcesLabel}</p>
                <ul>
                  {talk.sources.map((slug) => (
                    <li key={slug}><a href={articlePath(slug)[language]}>{publications[slug as keyof typeof publications].title} <span aria-hidden="true">↗</span></a></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid shell" aria-labelledby="teaching-title">
        <div className="section-kicker"><span>02</span> {copy.teachingLabel}</div>
        <div className="speaking-copy">
          <h2 className="speaking-section-title" id="teaching-title">{copy.teachingTitle}</h2>
          <p>{copy.teaching}</p>
          <a className="section-more" href={PRACTICUM_URL} target="_blank" rel="noreferrer">{copy.teachingSource} <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="section-grid shell" aria-labelledby="bio-title">
        <div className="section-kicker"><span>03</span> {copy.bioLabel}</div>
        <div className="speaking-copy">
          <h2 className="speaking-section-title" id="bio-title">{copy.name}</h2>
          <p>{copy.bio}</p>
        </div>
      </section>

      <section className="speaking-contact shell" aria-labelledby="speaking-contact-title">
        <h2 className="speaking-section-title" id="speaking-contact-title">{copy.contactTitle}</h2>
        <p>{copy.contact}</p>
        <a className="button button-primary" href={SPEAKING_CONTACT} target="_blank" rel="noreferrer">
          {copy.invite} <span aria-hidden="true">↗</span>
        </a>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
