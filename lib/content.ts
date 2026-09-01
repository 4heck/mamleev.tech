// Site copy for both locales. Rendered on the server for each route, so the
// text is in the HTML rather than swapped in by the client.
export type Language = "en" | "ru";

export const LANGUAGES: Language[] = ["en", "ru"];

export const SITE_URL = "https://mamleev.tech";

// Path each locale is served from. English is the root; hreflang and the
// sitemap are generated from this map.
export const localePath: Record<Language, string> = {
  en: "/",
  ru: "/ru/",
};

export const content = {
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

export const tech = ["Python", "Go", "Kubernetes", "AWS", "Terraform", "PostgreSQL", "Redis", "FastAPI", "Django", "Docker", "GitLab CI", "Observability"];
export const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/ruslan-mamleev-948550227/"],
  ["GitHub", "https://github.com/4heck"],
  ["Habr", "https://habr.com/ru/users/4heck/"],
  ["GetMentor", "https://getmentor.dev/mentor/ruslan-mamleev-3868"],
  ["Telegram", "https://t.me/touchup"],
];
export const systemWords = ["SYSTEMS LIVE", "PRODUCT READY", "TEAM ONLINE"];
export const motionColors = ["#2457ff", "#ff6038", "#ffd166"];
