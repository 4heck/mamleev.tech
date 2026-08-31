"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SplitFlapText from "@/components/SplitFlapText";
import BorderGlow from "@/components/BorderGlow";
import ColorBends from "@/components/ColorBends";

type Language = "en" | "ru";

const content = {
  en: {
    nav: ["About", "Work", "Writing", "Contact"],
    name: "Руслан Мамлеев",
    role: "CTO & Software Architect",
    headline: "I build systems that turn ambitious products into reliable businesses.",
    lede: "Technical leader working across AI, PropTech, IoT, and distributed systems. I combine hands-on architecture with product thinking and engineering leadership.",
    explore: "Explore my work",
    talk: "Let's talk",
    system: ["PRODUCT", "PLATFORM", "TEAM", "SYSTEMS / ONLINE"],
    signals: ["AI & PropTech", "Distributed systems", "Engineering leadership", "Architecture mentoring"],
    aboutLabel: "About",
    aboutStatement: "My job is to make complexity manageable:\nshape the architecture, build the team,\nand keep technology aligned with what the business actually needs.",
    aboutColumns: [
      "I have worked with legacy systems and greenfield products, from cloud platforms managing thousands of IoT devices to AI-driven visualization pipelines.",
      "I still stay close to implementation. Python, Go, Kubernetes, cloud infrastructure, data platforms, and code reviews remain part of how I lead.",
    ],
    workLabel: "Work",
    roles: [
      { company: "Hart Estate / GetFloorPlan", role: "Chief Technology Officer", text: "Leading product engineering for AI-powered real-estate visualization: floor plans, 3D experiences, and the platforms that deliver them at scale.", href: "https://getfloorplan.com/" },
      { company: "Virtual Technologies LLC", role: "Co-founder", text: "Building technology products from Innopolis at the intersection of software, visualization, and the built environment.", href: "https://hart-estate.ru/" },
      { company: "Yandex Practicum", role: "Software Architecture Mentor", text: "Helping engineers reason about trade-offs, distributed systems, reliability, and the decisions behind production architecture.", href: "https://practicum.yandex.ru/software-architect/" },
      { company: "Mircod", role: "Backend Team Lead · Earlier", text: "Designed backend and cloud platforms for IoT, medical, and biotechnology products, including systems managing thousands of connected devices.", href: "https://mircod.com/" },
    ],
    selectedLabel: "Selected",
    features: [
      { className: "article-card", meta: ["Field note", "Infrastructure · 2026"], title: "Building a living infrastructure map with AI agents", text: "A practical account of making startup infrastructure legible, reducing operational uncertainty, and turning scattered knowledge into a system the team can maintain.", action: "Read on Habr", href: "https://habr.com/ru/companies/yandex_praktikum/articles/1027476/" },
      { className: "dark-card", meta: ["Code", "GitHub · @4heck"], title: "Backend, infrastructure, and teaching materials", text: "Public experiments and examples across Python, Go, Docker, distributed systems, computer vision, and software architecture.", action: "Explore repositories", href: "https://github.com/4heck" },
      { className: "mentor-card", meta: ["Mentoring", "Architecture · Leadership"], title: "From senior engineer to technical leader", text: "Hands-on mentoring for engineers, team leads, and first-time CTOs working through architecture and management decisions.", action: "View mentoring profile", href: "https://getmentor.dev/mentor/ruslan-mamleev-3868" },
    ],
    toolkit: "Technology I work with",
    contactLabel: "Contact",
    contactTitle: "Have a hard technical problem? Let's make it legible.",
    telegram: "Message on Telegram",
    linkedin: "Connect on LinkedIn",
    footer: "Ruslan Mamleev · CTO & Software Architect",
  },
  ru: {
    nav: ["Обо мне", "Опыт", "Публикации", "Контакты"],
    name: "Руслан Мамлеев",
    role: "CTO и архитектор ПО",
    headline: "Строю системы, которые превращают амбициозные продукты в надёжный бизнес.",
    lede: "Технический руководитель с опытом в AI, PropTech, IoT и распределённых системах. Совмещаю практическую архитектуру, продуктовое мышление и управление разработкой.",
    explore: "Посмотреть опыт",
    talk: "Связаться",
    system: ["ПРОДУКТ", "ПЛАТФОРМА", "КОМАНДА", "СИСТЕМЫ / В РАБОТЕ"],
    signals: ["AI и PropTech", "Распределённые системы", "Управление разработкой", "Наставничество по архитектуре"],
    aboutLabel: "Обо мне",
    aboutStatement: "Моя задача — сделать сложность управляемой:\nспроектировать архитектуру, собрать команду\nи удерживать технологии в связке с реальными потребностями бизнеса.",
    aboutColumns: [
      "Работал и с легаси, и с продуктами с нуля: от облачных платформ, управляющих тысячами IoT-устройств, до AI-конвейеров визуализации недвижимости.",
      "Остаюсь близко к реализации. Python, Go, Kubernetes, облачная инфраструктура, платформы данных и код-ревью по-прежнему остаются частью моей работы.",
    ],
    workLabel: "Опыт",
    roles: [
      { company: "Hart Estate / GetFloorPlan", role: "Технический директор", text: "Руковожу разработкой AI-продуктов для визуализации недвижимости: планировки, 3D-пространства и платформы, которые доставляют их пользователям в масштабе.", href: "https://getfloorplan.com/" },
      { company: "ООО «Виртуальные технологии»", role: "Соучредитель", text: "Создаю в Иннополисе технологические продукты на пересечении разработки, визуализации и недвижимости.", href: "https://hart-estate.ru/" },
      { company: "Яндекс Практикум", role: "Наставник по архитектуре ПО", text: "Помогаю инженерам разбираться в компромиссах, распределённых системах, надёжности и решениях, из которых складывается промышленная архитектура.", href: "https://practicum.yandex.ru/software-architect/" },
      { company: "Mircod", role: "Тимлид backend · ранее", text: "Проектировал backend- и облачные платформы для IoT, медицинских и биотехнологических продуктов, включая системы управления тысячами устройств.", href: "https://mircod.com/" },
    ],
    selectedLabel: "Избранное",
    features: [
      { className: "article-card", meta: ["Технический кейс", "Инфраструктура · 2026"], title: "Как собрать живую карту инфраструктуры с помощью ИИ-агентов", text: "Практический рассказ о том, как сделать инфраструктуру стартапа понятной, снизить операционную неопределённость и превратить разрозненные знания в поддерживаемую систему.", action: "Читать на Habr", href: "https://habr.com/ru/companies/yandex_praktikum/articles/1027476/" },
      { className: "dark-card", meta: ["Код", "GitHub · @4heck"], title: "Backend, инфраструктура и учебные материалы", text: "Публичные эксперименты и примеры на Python и Go, а также материалы по Docker, распределённым системам, компьютерному зрению и архитектуре ПО.", action: "Открыть репозитории", href: "https://github.com/4heck" },
      { className: "mentor-card", meta: ["Наставничество", "Архитектура · Лидерство"], title: "От senior-инженера к техническому лидеру", text: "Практическое наставничество для инженеров, тимлидов и начинающих CTO, которые принимают сложные архитектурные и управленческие решения.", action: "Посмотреть профиль", href: "https://getmentor.dev/mentor/ruslan-mamleev-3868" },
    ],
    toolkit: "Технологии, с которыми я работаю",
    contactLabel: "Контакты",
    contactTitle: "Есть сложная техническая задача? Давайте сделаем её понятной.",
    telegram: "Написать в Telegram",
    linkedin: "Связаться в LinkedIn",
    footer: "Руслан Мамлеев · CTO и архитектор ПО",
  },
} satisfies Record<Language, Record<string, unknown>>;

const tech = ["Python", "Go", "Kubernetes", "AWS", "Terraform", "PostgreSQL", "Redis", "FastAPI", "Django", "Docker", "GitLab CI", "Observability"];
const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/ruslan-mamleev-948550227/"],
  ["GitHub", "https://github.com/4heck"],
  ["Habr", "https://habr.com/ru/users/4heck/"],
  ["GetMentor", "https://getmentor.dev/mentor/ruslan-mamleev-3868"],
  ["Telegram", "https://t.me/touchup"],
];
const systemWords = ["SYSTEMS LIVE", "PRODUCT READY", "TEAM ONLINE"];
const motionColors = ["#2457ff", "#ff6038", "#ffd166"];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("mamleev-language");
    if (saved === "ru" || saved === "en") setLanguage(saved);
    else if (window.navigator.language.toLowerCase().startsWith("ru")) setLanguage("ru");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("mamleev-language", language);
    document.title = language === "ru" ? "Руслан Мамлеев — CTO и архитектор ПО" : "Ruslan Mamleev — CTO & Software Architect";
  }, [language]);

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
        <a className="wordmark" href="#top" aria-label="Ruslan Mamleev — home">
          <span className="wordmark-mark">RM</span><span className="wordmark-domain">mamleev.tech</span>
        </a>
        <div className="header-actions">
          <nav aria-label={language === "ru" ? "Основная навигация" : "Primary navigation"}>
            <a href="#about">{copy.nav[0]}</a><a href="#work">{copy.nav[1]}</a><a href="#writing">{copy.nav[2]}</a><a href="#contact">{copy.nav[3]}</a>
          </nav>
          <Tabs className="lang-tabs" value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <TabsList className="lang-list" variant="line" aria-label={language === "ru" ? "Выбор языка" : "Choose language"}>
              <TabsTrigger className="lang-trigger" value="en">EN</TabsTrigger>
              <TabsTrigger className="lang-trigger" value="ru">RU</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>{copy.name}</span> / {copy.role}</p>
          <h1>{copy.headline}</h1>
          <p className="hero-lede">{copy.lede}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{copy.explore} <span aria-hidden="true">↘</span></a>
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
