import type { Language } from "./content";

type Talk = {
  id: string;
  title: string;
  audience: string;
  format: string;
  duration: string;
  points: [string, string, string];
  sources: string[];
};

type SpeakingCopy = {
  title: string;
  description: string;
  lede: string;
  topicsLabel: string;
  topicsTitle: string;
  audienceLabel: string;
  formatLabel: string;
  durationLabel: string;
  pointsLabel: string;
  sourcesLabel: string;
  invite: string;
  bioLabel: string;
  name: string;
  bio: string;
  portraitAlt: string;
  portraitLink: string;
  teachingLabel: string;
  teachingTitle: string;
  teaching: string;
  teachingSource: string;
  contactTitle: string;
  contact: string;
  talks: Talk[];
};

export const PRACTICUM_URL = "https://practicum.yandex.ru/software-architect/";
export const SPEAKING_CONTACT = "https://t.me/touchup";

export const speaking: Record<Language, SpeakingCopy> = {
  en: {
    title: "Talks & teaching",
    description: "Invite Ruslan Mamleev, CTO at GetFloorPlan, to speak about AI infrastructure agents, configuration platforms, WebGL and technical leadership. Topics and bio.",
    lede: "Proposed talks and workshops drawn from my published engineering cases. Available for conferences, meetups and internal team sessions; scope and depth can be adapted to your audience.",
    topicsLabel: "Topics",
    topicsTitle: "From production to a shared lesson",
    audienceLabel: "Audience",
    formatLabel: "Format",
    durationLabel: "Duration",
    pointsLabel: "Three takeaways",
    sourcesLabel: "Based on published cases",
    invite: "Invite me to speak",
    bioLabel: "Bio for organisers",
    name: "Ruslan Mamleev",
    bio: "Ruslan Mamleev is CTO at GetFloorPlan and a software architect based in Kazan. He leads engineering for AI-powered real-estate visualisation, combining hands-on architecture with product and team leadership. His experience spans IoT platforms, distributed systems and graphics for the web. He also mentors engineers on Yandex Practicum’s Software Architecture course.",
    portraitAlt: "Portrait of Ruslan Mamleev",
    portraitLink: "Open portrait for a speaker card",
    teachingLabel: "Teaching",
    teachingTitle: "Software Architecture · Yandex Practicum",
    teaching: "As a mentor on the Software Architecture course, I run workshops and help learners work through architecture questions in chat. The official course page lists me among the mentors as CTO at Hart Estate, with experience building IoT systems and leading development and DevOps teams.",
    teachingSource: "Mentor profile on the official course page (in Russian)",
    contactTitle: "Bring a real engineering case to your audience",
    contact: "Send the event or team context, audience, preferred topic, date and format on Telegram. We can agree the session’s depth and time for questions there.",
    talks: [
      {
        id: "infrastructure-map",
        title: "A living infrastructure map with AI agents",
        audience: "CTOs, tech leads and engineers responsible for startup infrastructure",
        format: "Case-study talk + Q&A",
        duration: "40 minutes + 10 minutes Q&A",
        points: [
          "Turn scattered knowledge about servers, domains, access and backups into a structured inventory in Git.",
          "Use agents to build repeatable collection scripts, then keep the map current through CI and change reviews.",
          "Separate observed facts from the desired state, and recognise when an inventory needs to give way to a platform team and infrastructure as code.",
        ],
        sources: ["infrastructure-map"],
      },
      {
        id: "configuration-platform",
        title: "A configuration platform instead of a hundred forks",
        audience: "Frontend and platform engineers, architects and B2B product tech leads",
        format: "Technical talk + Q&A",
        duration: "40 minutes + 10 minutes Q&A",
        points: [
          "Find the configuration contract in TypeScript types and generate versioned JSON Schema with documentation in CI.",
          "Connect schemas to Monaco for validation and completion, and let a live preview shorten the feedback loop.",
          "Move partner branding from a repository and a build to runtime configuration: lessons from 800+ branded releases.",
        ],
        sources: ["json-schema-monaco"],
      },
      {
        id: "depth-map-png",
        title: "An apartment’s geometry in a PNG",
        audience: "Web graphics, WebGL and three.js engineers; architects of visualisation products",
        format: "Technical deep dive + Q&A",
        duration: "45 minutes + 15 minutes Q&A",
        points: [
          "Recover a 3D point from a cursor position and a panorama’s depth map to build a ruler without shipping a 3D scene.",
          "Pack depth into PNG colour channels and account for browser decoding, surface normals and occlusion.",
          "Weigh PNG against EXR using actual costs, distinguish depth precision from measurement accuracy, and make encoding conventions explicit.",
        ],
        sources: ["depth-map-png"],
      },
      {
        id: "technical-leadership",
        title: "Architecture decisions and technical leadership",
        audience: "Senior engineers, architects, team leads and first-time CTOs",
        format: "Workshop with case discussion",
        duration: "90 minutes, including discussion",
        points: [
          "Frame an architecture decision through product constraints, budget and team capacity using three published production cases.",
          "Compare alternatives and make the cost of ownership visible: duplicated forks, infrastructure uncertainty and implicit data contracts.",
          "Turn a decision into a team practice with an owner, an explicit contract and a feedback loop that shows when to revisit it.",
        ],
        sources: ["infrastructure-map", "json-schema-monaco", "depth-map-png"],
      },
    ],
  },
  ru: {
    title: "Выступления и преподавание",
    description: "Пригласить Руслана Мамлеева, CTO GetFloorPlan: ИИ-агенты и инфраструктура, конфигурационные платформы, WebGL и техническое лидерство. Темы, тезисы и биография.",
    lede: "Темы для будущих докладов и воркшопов на основе моих опубликованных инженерных кейсов. Можно пригласить меня на конференцию, митап или встречу команды; глубину разбора адаптирую под аудиторию.",
    topicsLabel: "Темы",
    topicsTitle: "От рабочего кейса к общему опыту",
    audienceLabel: "Аудитория",
    formatLabel: "Формат",
    durationLabel: "Длительность",
    pointsLabel: "Три тезиса",
    sourcesLabel: "Основа — опубликованные кейсы",
    invite: "Пригласить выступить",
    bioLabel: "Биография для организаторов",
    name: "Руслан Мамлеев",
    bio: "Руслан Мамлеев — CTO GetFloorPlan и архитектор ПО из Казани. Руководит разработкой AI-продуктов для визуализации недвижимости, совмещая практическую архитектуру, продуктовое мышление и управление командой. Работал с IoT-платформами, распределёнными системами и веб-графикой. Наставник курса «Архитектура программного обеспечения» в Яндекс Практикуме.",
    portraitAlt: "Портрет Руслана Мамлеева",
    portraitLink: "Открыть портрет для карточки спикера",
    teachingLabel: "Преподавание",
    teachingTitle: "Архитектура программного обеспечения · Яндекс Практикум",
    teaching: "Я наставник курса «Архитектура программного обеспечения»: провожу воркшопы и помогаю участникам разбирать архитектурные вопросы в чате. На официальной странице курса указан среди наставников как CTO Hart Estate с опытом создания IoT-систем и руководства командами разработки и DevOps.",
    teachingSource: "Профиль наставника на официальной странице курса",
    contactTitle: "Разберём инженерный кейс с вашей аудиторией",
    contact: "Напишите в Telegram о мероприятии или команде: кто будет слушать, какая тема интересна, желаемая дата и формат. Обсудим глубину разбора и время на вопросы.",
    talks: [
      {
        id: "infrastructure-map",
        title: "Живая карта инфраструктуры с ИИ-агентами",
        audience: "CTO, тимлиды и инженеры, отвечающие за инфраструктуру стартапа",
        format: "Доклад с разбором кейса и вопросами",
        duration: "40 минут + 10 минут на вопросы",
        points: [
          "Как собрать разрозненные знания о серверах, доменах, доступах и бэкапах в структурированный инвентарь в Git.",
          "Как поручить агентам создание повторяемых скриптов сбора данных, а актуальность поддерживать через CI и ревью изменений.",
          "Как отделить наблюдаемые факты от желаемого состояния и понять, когда инвентаря уже мало и нужны платформенная команда и инфраструктура как код.",
        ],
        sources: ["infrastructure-map"],
      },
      {
        id: "configuration-platform",
        title: "Конфигурационная платформа вместо сотни форков",
        audience: "Frontend- и платформенные инженеры, архитекторы и технические лидеры B2B-продуктов",
        format: "Технический доклад с вопросами",
        duration: "40 минут + 10 минут на вопросы",
        points: [
          "Как найти контракт конфигурации в TypeScript-типах и генерировать в CI версионированную JSON Schema вместе с документацией.",
          "Как подключить схемы к Monaco для валидации и подсказок, а живой предпросмотр использовать для короткого цикла обратной связи.",
          "Как перенести брендинг партнёра из репозитория и сборки в конфигурацию времени выполнения: опыт 800+ брендированных релизов.",
        ],
        sources: ["json-schema-monaco"],
      },
      {
        id: "depth-map-png",
        title: "Геометрия квартиры в PNG",
        audience: "Разработчики веб-графики, WebGL и three.js, архитекторы продуктов визуализации",
        format: "Подробный технический разбор с вопросами",
        duration: "45 минут + 15 минут на вопросы",
        points: [
          "Как по курсору и карте глубины панорамы восстановить точку в пространстве и сделать линейку без передачи 3D-сцены в браузер.",
          "Как упаковать глубину в цветовые каналы PNG и учесть декодирование браузером, нормали поверхностей и перекрытие объектов.",
          "Как сравнить реальную стоимость PNG и EXR, отделить точность хранения от точности измерения и явно описать соглашения о кодировании.",
        ],
        sources: ["depth-map-png"],
      },
      {
        id: "technical-leadership",
        title: "Архитектурные решения и техническое лидерство",
        audience: "Senior-инженеры, архитекторы, тимлиды и начинающие CTO",
        format: "Воркшоп с обсуждением кейсов",
        duration: "90 минут, включая обсуждение",
        points: [
          "Как сформулировать архитектурную задачу через ограничения продукта, бюджет и возможности команды на примере трёх опубликованных кейсов.",
          "Как сравнивать альтернативы и показывать стоимость владения: дублирование форков, неопределённость инфраструктуры и неявные контракты данных.",
          "Как превратить решение в практику команды: назначить ответственного, зафиксировать контракт и наладить обратную связь для пересмотра решения.",
        ],
        sources: ["infrastructure-map", "json-schema-monaco", "depth-map-png"],
      },
    ],
  },
};
