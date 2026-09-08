import { content, localePath, LANGUAGES, socialLinks, writingPath, type Language } from "@/lib/content";

// Header and footer are shared by the home page and the writing page. `paths`
// is the current route in each locale, so the language switcher stays on the
// page the visitor is reading instead of dropping them on the home page.
export function SiteHeader({
  language,
  paths = localePath,
}: {
  language: Language;
  paths?: Record<Language, string>;
}) {
  const copy = content[language];
  const basePath = localePath[language];

  return (
    <header className="site-header shell">
      <a className="wordmark" href={`${basePath}#top`} aria-label="Ruslan Mamleev — home">
        <span className="wordmark-mark">RM</span><span className="wordmark-domain">mamleev.tech</span>
      </a>
      <div className="header-actions">
        <nav aria-label={language === "ru" ? "Основная навигация" : "Primary navigation"}>
          <a href={`${basePath}#about`}>{copy.nav[0]}</a><a href={`${basePath}#work`}>{copy.nav[1]}</a><a href={writingPath[language]}>{copy.nav[2]}</a><a href={`${basePath}#contact`}>{copy.nav[3]}</a>
        </nav>
        <div className="lang-list">
          {LANGUAGES.map((code) => (
            <a
              key={code}
              className="lang-trigger"
              href={paths[code]}
              hrefLang={code}
              aria-current={language === code ? "page" : undefined}
            >
              {code.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ language }: { language: Language }) {
  return (
    <footer className="footer shell">
      <p>© 2026 {content[language].footer}</p>
      <div className="footer-links">
        {socialLinks.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
        ))}
      </div>
    </footer>
  );
}
