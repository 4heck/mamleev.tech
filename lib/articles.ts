import type { Language } from "./content";

type Section = { heading: string; paragraphs: string[] };

// Original summaries written for this site, one per publication and locale.
// They are not excerpts of the Habr articles: each is a shorter piece in its
// own words that follows the same four beats — problem, decision, outcome,
// takeaways. The labels for those beats live in content.writing.sectionLabels.
export type ArticleSummary = {
  // Meta description for the summary page, kept near 160 characters.
  description: string;
  lede: string;
  sections: [Section, Section, Section, Section];
};

export const summaries: Record<string, Record<Language, ArticleSummary>> = {
  "depth-map-png": {
    en: {
      description:
        "How GetFloorPlan built a ruler into photoreal tours with no 3D scene in the browser: a depth map packed into a PNG, the raycast maths, and what it cost.",
      lede:
        "A photoreal panorama or a ruler you can measure a room with looks like a choice between two things. This summary covers how we got both, and why the real price was paid in undocumented conventions rather than bytes.",
      sections: [
        {
          heading: "An image with nothing to measure",
          paragraphs: [
            "Anyone buying a flat wants to check whether the wardrobe fits and how high the ceiling is. In a browser 3D scene that ruler is a textbook exercise: cast a ray from the cursor, hit a wall, subtract two points. We deliberately have no 3D scene in the browser.",
            "GetFloorPlan tours are path-traced in Unreal Engine. A single frame takes tens of minutes on a farm of RTX machines, which no buyer's phone could reproduce, so the client receives a finished panorama of half a megabyte to a couple of megabytes. It loads fast and looks right, but it carries no geometry — there is nothing for the cursor to hit.",
          ],
        },
        {
          heading: "A second image that stores distance instead of colour",
          paragraphs: [
            "In the same engine pass we render a depth map next to the colour panorama, where each pixel holds the distance from the camera to the visible surface. Finding the point under the cursor then takes four steps: screen coordinates become a direction, the direction becomes coordinates on the unwrapped sphere, and the depth at that pixel turns it into a point in space.",
            "A single point does not tell the user which surface they are on, so we estimate a normal from a small window of neighbouring pixels and slide a finder along the surface, turned to match it. The window size is a trade-off: a larger one steadies the finder on a flat wall but blends two surfaces at the edge of a cabinet. Occlusion by furniture happens in the shader — where the scene is closer than the ruler, the line fades.",
            "Delivery was the hard part. The engine writes depth to EXR, which browsers cannot decode: parsing it in JavaScript took about 241 ms against 34 ms for a PNG, and had to move into a web worker. So we pack each value into the 24 bits of a PNG's three colour channels, which the browser decodes natively.",
          ],
        },
        {
          heading: "A working ruler, and the bill for the PNG",
          paragraphs: [
            "The ruler has lived in our internal viewer since 2024 and now runs in the web widget, where it can be tried in a demo tour. At one to five metres the stored depth resolves to roughly 0.6–2.5 mm. The dominant error lies elsewhere — in how closely a model built from a floor plan matches the finished flat — and we have not yet measured the tool's end-to-end accuracy.",
            "The format saved no bytes. The PNG came out 1.8 times heavier than the source EXR, and a brotli-compressed float16 array would have been 2.7 times lighter than the PNG. We chose PNG for the client work it saved and did not measure size at the time. The migration stretched over twenty months, and the fallback to EXR spent more than a year filing meaningless errors in Sentry.",
          ],
        },
        {
          heading: "The convention is as much a part of the system as the code",
          paragraphs: [
            "The trade-off between photoreal and measurable turned out to be false. But data packed into a format designed for something else brings an unwritten agreement about how to read it. Our packing multiplier lives in three systems written in three languages; change it in one and every distance silently shrinks tenfold, with no test or alert to notice.",
            "Starting again, I would ship the packing parameters with the data and make the loader verify them, add a byte-exact round-trip test to CI, keep the source files, and measure the ruler against known dimensions from the floor plan before calling it accurate.",
          ],
        },
      ],
    },
    ru: {
      description:
        "Как GetFloorPlan сделал линейку в фотореалистичных турах без 3D-сцены в браузере: карта глубины в PNG, математика рейкаста и честная цена такого формата.",
      lede:
        "Фотореалистичная панорама или линейка, которой можно мерить комнату, — выглядит как выбор одного из двух. Это краткий разбор того, как мы получили и то и другое и почему главную цену заплатили не в байтах, а в незаписанных соглашениях.",
      sections: [
        {
          heading: "Картинка, в которой нечем мерить",
          paragraphs: [
            "Покупателю квартиры хочется проверить, встанет ли шкаф и какой высоты потолок. В браузерной 3D-сцене такая линейка — почти учебная задача: луч от курсора пересекает стену, расстояние считается одной строкой. Но 3D-сцены в браузере у нас нет, и это сознательное решение.",
            "Туры GetFloorPlan рендерятся в Unreal Engine с трассировкой пути: один кадр считается десятки минут на ферме с видеокартами RTX, и повторить это на телефоне покупателя невозможно. Поэтому клиенту уходит готовая панорама весом от половины мегабайта до пары. Она быстро грузится и хорошо выглядит, но геометрии в ней нет — курсору не во что попасть.",
          ],
        },
        {
          heading: "Вторая картинка, где вместо цвета — расстояние",
          paragraphs: [
            "Тем же прогоном движка рядом с цветной панорамой рендерится карта глубины: в каждом пикселе хранится дистанция от камеры до видимой поверхности. Точка под курсором находится за четыре шага: экранные координаты превращаются в направление, направление — в координаты на развёртке сферы, а глубина в этом пикселе даёт точку в пространстве.",
            "Одной точки мало, чтобы пользователь понимал, на какую плоскость навёлся. Поэтому по небольшому окну соседних пикселей считается нормаль, и по поверхности скользит «искатель», повёрнутый вместе с ней. Размер окна — компромисс: на гладкой стене большое окно убирает дрожание, а на ребре шкафа смешивает две поверхности. Перекрытие мебелью считается прямо в шейдере: если сцена в этом направлении ближе линейки, линия становится полупрозрачной.",
            "Сложнее всего оказалось довезти данные до браузера. Движок пишет глубину в EXR, который браузер не понимает: разбор на JavaScript занимал около 241 мс против 34 мс у PNG, и его пришлось увести в web worker. Поэтому мы упаковали каждое значение в 24 бита трёх цветовых каналов PNG — такой файл браузер декодирует нативно.",
          ],
        },
        {
          heading: "Линейка работает — и счёт за PNG",
          paragraphs: [
            "Линейка живёт во внутреннем вьюере с 2024 года, а теперь и в веб-виджете, где её можно попробовать в демо-туре. На дистанциях от одного до пяти метров шаг хранения глубины — примерно 0,6–2,5 мм. Основная погрешность при этом не в формате, а в том, насколько модель по чертежу совпадает с реальной квартирой; сквозную точность инструмента мы пока не измеряли.",
            "Экономии в байтах не случилось: PNG вышел в 1,8 раза тяжелее исходного EXR, а сжатый brotli массив float16 был бы в 2,7 раза легче PNG. Формат выбирали по объёму работы на клиенте, размер тогда не измеряли. Миграция растянулась на двадцать месяцев, а резервный путь на EXR больше года сыпал в Sentry ошибками, которые ничего не значили.",
          ],
        },
        {
          heading: "Соглашение — такая же часть системы, как код",
          paragraphs: [
            "Компромисс «красиво или измеримо» оказался ложным. Но у данных, упакованных в формат, придуманный для другого, появляется незаписанное соглашение о том, как их читать. Множитель упаковки у нас живёт в трёх системах на трёх языках, и если поменять его в одном месте, все расстояния молча станут в десять раз меньше — ни тесты, ни мониторинг этого не заметят.",
            "Начиная заново, я положил бы параметры упаковки рядом с данными и заставил загрузчик их сверять, добавил бы в CI круговой тест на побайтовую сохранность, не удалял бы исходники и измерил бы точность линейки по известным размерам из чертежа, прежде чем называть её точной.",
          ],
        },
      ],
    },
  },

  "json-schema-monaco": {
    en: {
      description:
        "How GetFloorPlan replaced a hundred client forks with one configuration contract — TypeScript, JSON Schema, S3 and Monaco — and shipped 800+ brandings.",
      lede:
        "Every new partner used to mean a new fork. This summary covers why the forks were only a symptom, where the missing contract had been all along, and how a branded release stopped needing a developer.",
      sections: [
        {
          heading: "A hundred forks and the question “which one?”",
          paragraphs: [
            "Our product is a 3D tour widget that developers, property portals and agencies embed through an iframe. Nearly every B2B client wants their own look: colours, logo, buttons, language, where the minimap sits. The first design was sensible — the core in an npm package and a thin wrapper with a config file, forked per client.",
            "It worked for five clients and fell apart by the hundredth. Each fork froze a version of the core; over four years the package shipped around 450 versions, so a bug fix became a campaign across dozens of repositories. Onboarding a partner took up to two weeks, and developers spent their time nudging elements and swapping hex codes. Worst of all, nobody could say which settings a given version supported — the answer lived in code, stale docs and one person's memory. The real problem was the absence of a configuration contract.",
          ],
        },
        {
          heading: "The type as source, the schema as an executable contract",
          paragraphs: [
            "We already had that contract: the TypeScript type for the widget config, with its unions, flags and TSDoc comments. The job was not to invent it but to carry it to the people who set clients up. On every release tag, CI generates a JSON Schema from the type — comments become descriptions, union types become enums.",
            "Schemas go to S3, laid out by version with a release manifest pointing at the commit and pipeline. No database was needed, because published versions never change. One detail would otherwise have broken things silently: latest moves only when the tag matches the current npm release, so a hotfix to an old line cannot overwrite it.",
            "In the admin panel the schema is wired into Monaco, the editor behind VS Code. It provides completion, inline documentation and error highlighting out of the box, and an invalid config cannot be saved. Next to it sit a schema version picker and an iframe running the real widget, which cut the edit loop from days to a couple of seconds. At runtime the widget fetches its branding by hostname, so a new client is a database row rather than a build: hundreds of subdomains are served by one wildcard config and four certificates.",
          ],
        },
        {
          heading: "800+ branded releases, no developer involved",
          paragraphs: [
            "The system has run in production for three years and served more than 800 brandings, 20 to 45 new ones a month. Around a hundred repositories became one, partner onboarding dropped from two weeks to a couple of days, typo-driven misconfigurations disappeared, and about a third of engineering time went back to the product. Fewer than one per cent of clients still need custom JavaScript.",
            "Usage data held a surprise. About two thirds of brandings never touch a parameter, and three keys account for 95% of the configurations that do. The most used one overrides interface text, not colours as we had assumed.",
          ],
        },
        {
          heading: "What to take away",
          paragraphs: [
            "Forks are the symptom; a missing contract is the disease. The source of that contract usually already exists in your types, and the work is carrying it all the way to the UI without creating a new chore — we stopped maintaining parameter documentation separately, because TSDoc now reaches the editor on its own.",
            "And we would not have guessed which settings mattered most. Exposing the whole schema and deriving forms from it turned out safer than designing a polished screen around the ten options that looked important.",
          ],
        },
      ],
    },
    ru: {
      description:
        "Как GetFloorPlan заменил сотню клиентских форков виджета одним контрактом конфигурации: TypeScript, JSON Schema, S3 и Monaco. 800+ брендингов без разработчика.",
      lede:
        "Каждый новый партнёр когда-то означал новый форк репозитория. Это краткий разбор того, почему форки оказались лишь симптомом, где на самом деле лежал нужный контракт и как брендированный релиз перестал требовать разработчика.",
      sections: [
        {
          heading: "Сотня форков и вопрос «в каком из них?»",
          paragraphs: [
            "Наш продукт — виджет 3D-тура, который застройщики, классифайды и агентства встраивают к себе через iframe. Почти каждому B2B-клиенту нужна своя подача: цвета, логотип, набор кнопок, язык, положение миникарты. Первое решение было разумным: ядро в npm-пакете и тонкая обёртка с конфигом, которую форкали под клиента.",
            "На пяти клиентах это работало, к сотому — развалилось. Форк замораживал версию ядра, за четыре года вышло около 450 версий пакета, и багфикс превращался в кампанию по обновлению десятков репозиториев. Подключение партнёра занимало до двух недель, а разработчики тратили время на сдвиг плашек и замену цветов. Хуже всего, что никто не знал, какие параметры доступны в конкретной версии: описание жило в коде, устаревшей документации и памяти автора. Настоящей проблемой было отсутствие контракта конфигурации.",
          ],
        },
        {
          heading: "Тип как исходник, схема как исполняемый контракт",
          paragraphs: [
            "Контракт у нас уже существовал — в TypeScript-типе конфигурации с перечислениями, флагами и TSDoc-комментариями. Его нужно было не придумать, а донести до людей, которые настраивают клиентов. В CI по тегу релиза из типа генерируется JSON Schema: комментарии становятся описаниями, union-типы — перечислениями.",
            "Схемы лежат в S3 с раскладкой по версиям и паспортом релиза со ссылкой на коммит и пайплайн. База данных не понадобилась: опубликованные версии не меняются. Одна деталь без присмотра ломала бы всё тихо — latest обновляется, только если тег совпадает с актуальной версией в npm, иначе хотфикс в старую ветку перезаписал бы схему.",
            "В админке схема подключается к Monaco Editor — редактору, на котором построен VS Code. Он сам даёт автодополнение, подсказки по параметрам и подсветку ошибок, а невалидный конфиг нельзя сохранить. Рядом — выбор версии схемы и iframe с живым виджетом: цикл правки сократился с дней до пары секунд. Сам виджет при загрузке запрашивает брендинг по домену, поэтому новый клиент — это строка в базе, а не сборка: сотни поддоменов обслуживают один wildcard-конфиг и четыре сертификата.",
          ],
        },
        {
          heading: "800+ брендированных релизов без разработчика",
          paragraphs: [
            "Система три года работает в продакшене и обслужила больше восьмисот брендингов, по 20–45 новых в месяц. Около сотни репозиториев свелись к одному, подключение партнёра — с двух недель до пары дней, ошибки из-за опечаток в конфигах исчезли, а примерно треть времени разработки вернулась к продукту. Кастомный JavaScript понадобился меньше чем одному проценту клиентов.",
            "Статистика использования удивила. Примерно две трети брендингов вообще не трогают параметры, а три самых популярных ключа покрывают 95% настроек у остальных. Первое место заняло переопределение текстов интерфейса, а не цвета, как мы ожидали.",
          ],
        },
        {
          heading: "Что забрать с собой",
          paragraphs: [
            "Форки — симптом, болезнь — отсутствие контракта. Исходник контракта почти всегда уже есть в типах, и задача в том, чтобы протащить его до интерфейса, не создав новой рутины: документацию к параметрам мы перестали вести отдельно, потому что TSDoc доезжает до подсказок в редакторе сам.",
            "И второе: мы бы не угадали, какие настройки важнее. Показать всю схему и строить форму из неё оказалось надёжнее, чем проектировать удобный экран под десяток параметров, которые кажутся главными.",
          ],
        },
      ],
    },
  },

  "infrastructure-map": {
    en: {
      description:
        "How a startup left without DevOps used AI agents to build a living infrastructure inventory in three weeks: servers, access, domains, TLS and backups.",
      lede:
        "When a small company loses its only DevOps engineer, the map of its systems leaves with them. This summary covers how we rebuilt that map without a hire or enterprise tooling — and why a one-off inventory turned into a source of truth we still maintain.",
      sections: [
        {
          heading: "Infrastructure one person understood",
          paragraphs: [
            "During a round of budget cuts our DevOps engineer left. He was the only person who knew which servers we ran, which domains pointed where, how the proxies were wired and who still had access. For two months every change started with detective work.",
            "The estate was small but awkward: twenty to thirty machines across several providers, no cluster, some servers in Hetzner because it is cheaper and some inside Russia because the service has to stay reachable there, more than a hundred domains, and proxy chains crossing borders. Hiring meant a search, onboarding and budget we did not have. Not hiring meant keeping the risk.",
          ],
        },
        {
          heading: "A model of the system, not a server list",
          paragraphs: [
            "It started as what looked like a one-off chore: list the machines. The first input was literally screenshots of the Hetzner and AWS consoles, which an agent transcribed into JSON. There was no upfront schema; the structure grew with each urgent question.",
            "Every new concern became another layer in the same file. A registry of SSH keys with aliases showed who could actually log in, and turned up about ten keys that should not have been there. Hardware specs exposed machines we were paying for but did not need at that size. Container lists showed what really ran on each node. Domains gained labels for role, environment, priority and audience region — the last one matters because a Russian user should not hit a foreign IP and a foreign client should not see a Russian footprint. A TLS check records the issuer and expiry of every certificate, including whether older Android devices still get an RSA one.",
            "Two choices made it hold. First, instead of letting the agent regenerate the same collection code on every run, we had it write each script once, stored it and ran it directly: fewer tokens, and data collected the same way every time. Second, we started describing the expected state, not just facts. A well-configured reference server became a monitoring standard with required components and an acceptance checklist, and every machine got a coverage status. Backups followed the same pattern: destinations, policies and the latest observations.",
          ],
        },
        {
          heading: "Ten thousand lines under version control",
          paragraphs: [
            "Three weeks later the inventory was close to 10,000 lines. It lives in Git, refreshes with a short command, and backup checks run daily from GitLab CI. Infrastructure work now leaves a commit behind: a link is enough for a colleague to see what changed, and changes to the repository post to Telegram.",
            "The bigger win was a single source of truth that new checks and tools can be built around cheaply. Switching tools proved the point — when I moved from Codex to Claude Code, the new agent read the structure and carried on where the old one had stopped.",
          ],
        },
        {
          heading: "What I would carry into the next project",
          paragraphs: [
            "The agents did not replace an engineer; they sped up work that would otherwise have been done by hand. The durable value is the data model: while the structure stays stable, it can take on new jobs without rewriting what is already there.",
            "The approach has a boundary. Enterprises and heavily regulated systems still call for Terraform, Ansible, Kubernetes and a proper platform team. For a startup that needs speed, repeatability and a small budget, a living inventory buys control without a hire — a compromise that worked for us.",
          ],
        },
      ],
    },
    ru: {
      description:
        "Как стартап без DevOps за три недели собрал с ИИ-агентами живой инвентарь инфраструктуры: серверы, доступы, домены, TLS, мониторинг и бэкапы в одном JSON в Git.",
      lede:
        "Когда из небольшой компании уходит единственный DevOps, вместе с ним уходит и карта системы. Это краткий разбор того, как мы восстановили её без найма и без энтерпрайз-инструментов — и почему разовая инвентаризация превратилась в постоянный источник правды.",
      sections: [
        {
          heading: "Инфраструктура, которую понимал один человек",
          paragraphs: [
            "На фоне сокращения бюджетов у нас ушёл DevOps. Он был единственным, кто держал в голове, какие серверы у нас есть, какие домены на них смотрят, где стоят прокси и у кого остались доступы. Следующие два месяца мы жили в режиме догадок: любое изменение начиналось с раскопок.",
            "Масштаб при этом скромный, но неудобный: 20–30 машин у разных провайдеров, никакого кластера, часть серверов в Hetzner ради цены, часть — в российском контуре ради доступности, больше сотни доменов и цепочки проксирования между странами. Нанять нового специалиста значило поиск, онбординг и бюджет, которого не было. Не нанимать — оставить риск на месте.",
          ],
        },
        {
          heading: "Модель системы вместо списка серверов",
          paragraphs: [
            "Всё началось с того, что выглядело разовой задачей, — собрать перечень машин. Первым входом стали буквально скриншоты из панелей Hetzner и AWS: агент переписал их в JSON. Схему заранее не проектировали, структура росла под каждый следующий срочный вопрос.",
            "Дальше каждый новый слой добавлялся в тот же файл. Реестр SSH-ключей с алиасами показал, кто вообще может зайти на серверы, — нашлось около десяти лишних ключей. Характеристики машин помогли найти переплату за избыточные ресурсы. Список контейнеров показал, что реально работает на каждом узле. Для доменов появились метки роли, окружения, приоритета и региона аудитории: последняя важна, потому что российский пользователь не должен видеть зарубежный IP, а иностранный клиент — российский след. Проверка TLS фиксирует издателя и срок каждого сертификата, в том числе ради старых Android-устройств, которым нужен RSA.",
            "Удержать это помогли два решения. Первое — не гонять агента заново на каждый прогон, а один раз сохранить написанный им скрипт и дальше запускать его напрямую: так дешевле по токенам, и данные собираются одинаково. Второе — описывать не только факты, но и норму. Эталонный сервер превратился в стандарт мониторинга с обязательными компонентами и чек-листом приёмки, а у каждой машины появился статус покрытия. Так же описаны бэкапы: куда они уходят, по какому расписанию и что показывают последние наблюдения.",
          ],
        },
        {
          heading: "Десять тысяч строк, которые живут в Git",
          paragraphs: [
            "За три недели получился инвентарь почти в 10 000 строк. Он хранится в репозитории, обновляется короткой командой, а проверки бэкапов раз в день запускаются из GitLab CI. Любая инфраструктурная работа теперь оставляет коммит: коллеге достаточно ссылки, чтобы понять, что поменялось, а об изменениях в репозитории приходят уведомления в Telegram.",
            "Важнее цифр другое: у команды появился один источник правды, вокруг которого новые проверки и утилиты пишутся быстро и дёшево. Смена инструмента это подтвердила — когда я перешёл с Codex на Claude Code, новый агент просто прочитал структуру и продолжил с того же места.",
          ],
        },
        {
          heading: "Что я забрал бы в следующий проект",
          paragraphs: [
            "ИИ здесь не заменил инженера, а ускорил работу, которую всё равно пришлось бы делать руками. Долгосрочная ценность не в агентах, а в модели данных: пока структура стабильна, её можно расширять под новые задачи, не переписывая то, что уже есть.",
            "У подхода есть граница. В энтерпрайзе и системах с жёсткими требованиями к соответствию место за Terraform, Ansible, Kubernetes и зрелой платформенной командой. Но стартапу, где важны скорость, воспроизводимость и каждый рубль бюджета, живой инвентарь даёт управляемость без найма — это компромисс, который у нас сработал.",
          ],
        },
      ],
    },
  },
};
