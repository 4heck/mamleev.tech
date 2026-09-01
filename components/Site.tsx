import SplitFlapText from "@/components/SplitFlapText";
import BorderGlow from "@/components/BorderGlow";
import ColorBends from "@/components/ColorBends";
import {
  content,
  localePath,
  LANGUAGES,
  motionColors,
  socialLinks,
  systemWords,
  tech,
  type Language,
} from "@/lib/content";

// Server component: the three imported effects are the only client islands, so
// all of the copy ships in the HTML.
export default function Site({ language }: { language: Language }) {
  const copy = content[language];
  const basePath = localePath[language];

  return (
    <>
          <ColorBends
            className="site-color-bends"
            colors={motionColors}
            rotation={18}
            speed={0.16}
            autoRotate={0.7}
            scale={1.15}
            frequency={0.9}
            warpStrength={0.82}
            mouseInfluence={0.18}
            parallax={0.28}
            noise={0.025}
            iterations={2}
            intensity={1.25}
            bandWidth={6.2}
            transparent
          />
          <main data-language={language}>
          <header className="site-header shell">
            <a className="wordmark" href={`${basePath}#top`} aria-label="Ruslan Mamleev — home">
              <span className="wordmark-mark">RM</span><span className="wordmark-domain">mamleev.tech</span>
            </a>
            <div className="header-actions">
              <nav aria-label={language === "ru" ? "Основная навигация" : "Primary navigation"}>
                <a href={`${basePath}#about`}>{copy.nav[0]}</a><a href={`${basePath}#work`}>{copy.nav[1]}</a><a href={`${basePath}#writing`}>{copy.nav[2]}</a><a href={`${basePath}#contact`}>{copy.nav[3]}</a>
              </nav>
              <div className="lang-list">
                {LANGUAGES.map((code) => (
                  <a
                    key={code}
                    className="lang-trigger"
                    href={localePath[code]}
                    hrefLang={code}
                    aria-current={language === code ? "page" : undefined}
                  >
                    {code.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </header>

          <section className="hero shell" id="top">
            <div className="hero-copy">
              <p className="eyebrow"><span>{copy.name}</span> / {copy.role}</p>
              <h1>{copy.headline}</h1>
              <p className="hero-lede">{copy.lede}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`${basePath}#work`}>{copy.explore} <span aria-hidden="true">↘</span></a>
                <a className="button button-quiet" href="https://t.me/touchup" target="_blank" rel="noreferrer">{copy.talk} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="portrait-stage">
              <div className="portrait-frame">
                <img
                  className="hero-portrait"
                  src="/ruslan-portrait.jpg"
                  alt={language === "ru" ? "Портрет Руслана Мамлеева" : "Portrait of Ruslan Mamleev"}
                  width="640"
                  height="640"
                  fetchPriority="high"
                />
              </div>
              <div className="portrait-monogram" aria-hidden="true">RM</div>
              <div className="system-label label-product">{copy.system[0]}</div>
              <div className="system-label label-platform">{copy.system[1]}</div>
              <SplitFlapText
                className="hero-flap"
                words={systemWords}
                flipDuration={0.1}
                stagger={0.035}
                cycleDelay={2200}
                flipsPerChar={6}
                tileColor="#11110f"
                textColor="#f8f7f1"
                tileRadius={2}
                gap={3}
                fontSize="clamp(15px, 1.5vw, 21px)"
                padTo={13}
                loop
              />
            </div>
          </section>

          <section className="signal-strip" aria-label={language === "ru" ? "Области экспертизы" : "Areas of expertise"}><div className="shell signal-grid">{copy.signals.map((item) => <span key={item}>{item}</span>)}</div></section>

          <section className="about shell section-grid" id="about">
            <div className="section-kicker"><span>01</span> {copy.aboutLabel}</div>
            <div className="section-body about-body">
              <div className="about-composition">
                <div className="about-copy">
                  <h2 className="about-statement">{copy.aboutStatement}</h2>
                  <div className="about-columns">{copy.aboutColumns.map((item) => <p key={item}>{item}</p>)}</div>
                </div>
                <figure className="editorial-photo">
                  <img
                    src="/ruslan-editorial.jpg"
                    alt={language === "ru" ? "Руслан Мамлеев" : "Ruslan Mamleev"}
                    width="1027"
                    height="1536"
                    loading="lazy"
                  />
                  <figcaption>{language === "ru" ? "Казань · 2026" : "Kazan · 2026"}</figcaption>
                </figure>
              </div>
            </div>
          </section>

          <section className="work shell section-grid" id="work">
            <div className="section-kicker"><span>02</span> {copy.workLabel}</div>
            <div className="section-body role-list">{copy.roles.map((item, index) => (
              <BorderGlow
                className={`role-glow${index === 0 ? " role-glow--gfp" : ""}`}
                key={item.company}
                backgroundColor="#f0eee5"
                borderRadius={2}
                glowRadius={22}
                glowIntensity={0.78}
                edgeSensitivity={36}
                coneSpread={22}
                colors={motionColors}
                fillOpacity={0.28}
              >
                <a className="role-row" href={item.href} target="_blank" rel="noreferrer">
                  <span className="role-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="role-title">
                    <div className="role-company-line">
                      {index === 0 && <span className="gfp-mark" aria-hidden="true"><img src="/getfloorplan-logo.svg" alt="" /></span>}
                      <h2>{item.company}</h2>
                    </div>
                    <p>{item.role}</p>
                  </div>
                  <p className="role-description">{item.text}</p><span className="role-arrow" aria-hidden="true">↗</span>
                </a>
              </BorderGlow>
            ))}</div>
          </section>

          <section className="selected shell section-grid" id="writing">
            <div className="section-kicker"><span>03</span> {copy.selectedLabel}</div>
            <div className="section-body selected-grid">{copy.features.map((item) => (
              <a className={`feature-card ${item.className}`} href={item.href} target="_blank" rel="noreferrer" key={item.title}>
                <div className="feature-meta"><span>{item.meta[0]}</span><span>{item.meta[1]}</span></div><h2>{item.title}</h2><p>{item.text}</p><span className="feature-link">{item.action} <span aria-hidden="true">↗</span></span>
              </a>
            ))}</div>
          </section>

          <section className="toolkit shell" aria-label={copy.toolkit}><p>{copy.toolkit}</p><div className="tool-list">{tech.map((item) => <span key={item}>{item}</span>)}</div></section>

          <section className="contact-block shell" id="contact">
            <div className="contact-kicker">04 / {copy.contactLabel}</div><h2>{copy.contactTitle}</h2>
            <div className="contact-actions"><a href="https://t.me/touchup" target="_blank" rel="noreferrer">{copy.telegram} <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/ruslan-mamleev-948550227/" target="_blank" rel="noreferrer">{copy.linkedin} <span aria-hidden="true">↗</span></a></div>
          </section>

            <footer className="footer shell"><p>© 2026 {copy.footer}</p><div className="footer-links">{socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>)}</div></footer>
          </main>
    </>
  );
}
