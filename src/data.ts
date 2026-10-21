export type Category = "ai" | "data" | "platform" | "web";

export type ProjectImage = {
  src: string;
  alt: string;
  label?: string;
};

export type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  role: string;
  category: Category;
  featured?: boolean;
  summary: string;
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  cover?: string;
  coverKind: "pipeline" | "etl" | "agent" | "ask" | "image";
  images?: ProjectImage[];
};

export const categoryLabel: Record<Category | "all", string> = {
  all: "Все",
  ai: "AI",
  data: "Данные",
  platform: "Сервисы",
  web: "Сайты",
};

export const site = {
  name: "Михаил Данюшин",
  role: "Разработчик и AI-инженер",
  location: "Калининград · удалённо",
  email: "mdanyushin@yandex.ru",
  phone: "+7 906 060-37-91",
  phoneHref: "tel:+79060603791",
  telegram: "https://t.me/devs_0107",
  telegramHandle: "@devs_0107",
  github: "https://github.com/summertime-fms",
  site: "https://danyushin.ru",
  english: "English C1",
} as const;

export const projects: Project[] = [
  {
    id: "rtk",
    title: "Учёт проектов и финансов",
    client: "Бизан / РТК",
    year: "2025—2026",
    role: "Backend-разработчик",
    category: "platform",
    featured: true,
    coverKind: "image",
    cover: "/cases/rtk/01-finance.jpg",
    summary:
      "Внутренний сервис: проекты, деньги, люди и связь с 1С — в одном месте.",
    problem:
      "В работе было больше 250 проектов. Воронка, финансы и загрузка людей жили в 1С, таблицах и ручных отчётах.",
    solution:
      "Собрал серверную часть сервиса: разные права доступа, единый вход, ежедневная связь с 1С, отчёты на экране. Вёл задачи, смотрел код младших разработчиков, писал инструкции.",
    results: [
      { label: "Проектов в системе", value: "250+" },
      { label: "Коммиты на серверной части", value: "1 475" },
      { label: "Срок", value: "~1 год" },
    ],
    stack: ["Laravel", "PHP", "React", "MySQL", "1C", "Docker"],
    links: [{ label: "bizan.pro", href: "https://bizan.pro" }],
    images: [
      {
        src: "/cases/rtk/01-finance.jpg",
        alt: "Финансовые показатели",
        label: "Финансы",
      },
      {
        src: "/cases/rtk/02-reports-projects.jpg",
        alt: "Список отчётов по проектам",
        label: "Отчёты",
      },
      {
        src: "/cases/rtk/05-project-detail.jpg",
        alt: "Карточка проекта",
        label: "Проект",
      },
      {
        src: "/cases/rtk/03-project-form.jpg",
        alt: "Редактирование отчёта проекта",
        label: "Отчёт проекта",
      },
      {
        src: "/cases/rtk/04-reports-employees.jpg",
        alt: "Реестр отчётов сотрудников",
        label: "Сотрудники",
      },
      {
        src: "/cases/rtk/06-permissions.jpg",
        alt: "Права доступа",
        label: "Права",
      },
    ],
  },
  {
    id: "content-fabric",
    title: "Тексты для клиники",
    client: "Клиника доктора Ласкова",
    year: "2026",
    role: "AI-инженер",
    category: "ai",
    featured: true,
    coverKind: "pipeline",
    summary:
      "Система готовит статьи и посты по правилам клиники и публикует их на сайт и в соцсети.",
    problem:
      "Сайт и соцсети держались на копирайтере и двух SMM. Тексты должны быть медицински точными, но держать трёх человек только ради этого было дорого.",
    solution:
      "Собрал цепочку: сначала проверенный источник, потом черновик, проверка и публикация. Версии текстов хранятся в git. Сотрудников учу пользоваться AI в обычной работе.",
    results: [
      { label: "Людей до перехода", value: "−3" },
      { label: "Расходы на штат", value: "~150 000 ₽/мес" },
      { label: "Эталонных текстов", value: "11" },
    ],
    stack: ["Python", "n8n", "Bitrix", "Git", "AI"],
    links: [{ label: "hemonc.ru", href: "https://hemonc.ru" }],
  },
  {
    id: "dwh",
    title: "Отчёты клиники",
    client: "Клиника доктора Ласкова",
    year: "2026",
    role: "Разработчик",
    category: "data",
    featured: true,
    coverKind: "etl",
    summary:
      "Данные из рекламы и CRM каждую ночь собираются в одном месте. Утром отчёты открываются без сбоев.",
    problem:
      "Отчёты тормозили и иногда не открывались. Цифры из рекламы, звонков и CRM не сходились. Сотрудникам было трудно найти нужный срез.",
    solution:
      "Ночью скрипты забирают данные, чистят их и кладут в базу. Оттуда Power BI строит отчёты. Если что-то сломалось — приходит сообщение в Telegram. Обновление отчётов ускорилось примерно с 55 до 19 минут.",
    results: [
      { label: "Обновление отчётов", value: "~55 → ~19 мин" },
      { label: "Где лежат данные", value: "своя база" },
      { label: "Откуда берём", value: "реклама, звонки, CRM" },
    ],
    stack: ["Python", "PostgreSQL", "Power BI", "Telegram"],
    links: [],
  },
  {
    id: "leads",
    title: "Разбор заявок в CRM",
    client: "Клиника доктора Ласкова",
    year: "2026",
    role: "AI-инженер",
    category: "ai",
    coverKind: "agent",
    summary:
      "Каждый день программа разбирает новые заявки: простые — по правилам, сложные — с помощью AI.",
    problem:
      "Колл-центр не успевал разбирать все заявки и заполнять поля. Каждый делал это по-своему.",
    solution:
      "Сначала срабатывают простые правила — так закрывается около половины заявок. Остальное смотрит AI и пишет результат в CRM. Если сотрудник нажимает «не согласен», на следующий день правила становятся точнее.",
    results: [
      { label: "Без нейросети", value: "~50% заявок" },
      { label: "Что умеет", value: "разбор и обучение" },
      { label: "Код", value: "открыт на GitHub" },
    ],
    stack: ["Python", "Bitrix24", "AI"],
    links: [
      {
        label: "lead-analysis-skill",
        href: "https://github.com/hemonc-team/lead-analysis-skill",
      },
      {
        label: "lead-feedback-apply",
        href: "https://github.com/hemonc-team/lead-feedback-apply",
      },
    ],
  },
  {
    id: "zap",
    title: "Магазин «Запятая» стал быстрее",
    client: "Книжный магазин «Запятая»",
    year: "2026",
    role: "Фронтенд",
    category: "web",
    coverKind: "image",
    cover: "/cases/zap/home.jpg",
    summary:
      "Каталог на телефоне открывался почти полминуты. Теперь — за несколько секунд.",
    problem:
      "На телефоне обложки каталога ждали около 23 секунд. Страницы были тяжёлыми, кнопка «избранное» плохо нажималась.",
    solution:
      "Убрал лишнее со страниц, уменьшил картинки, починил избранное. Отдельно с помощью AI нашёл визуальные ошибки и слабые места для поиска.",
    results: [
      { label: "Каталог на телефоне", value: "23с → ~3с" },
      { label: "Вес страницы", value: "−82%" },
      { label: "Оценка скорости", value: "~60 → 90+" },
    ],
    stack: ["WordPress", "WooCommerce", "PHP"],
    links: [{ label: "zapyataya.eu", href: "https://zapyataya.eu" }],
    images: [
      {
        src: "/cases/zap/home.jpg",
        alt: "Главная книжного магазина Запятая",
        label: "Витрина",
      },
    ],
  },
  {
    id: "ask-pbi",
    title: "Вопросы к отчётам своими словами",
    client: "Клиника доктора Ласкова",
    year: "2026",
    role: "AI-инженер",
    category: "ai",
    coverKind: "ask",
    summary:
      "Маркетолог спрашивает отчёт обычным языком и получает цифру — без ожидания аналитика.",
    problem:
      "Чтобы узнать одну цифру из отчёта, нужно было ждать человека, который умеет открывать Power BI.",
    solution:
      "Сделал навык для рабочего чата: вопрос на русском уходит в отчёт и возвращается ответом. Код открыт на GitHub.",
    results: [
      { label: "Как спрашивать", value: "своими словами" },
      { label: "Откуда ответ", value: "боевые отчёты" },
      { label: "Код", value: "открыт на GitHub" },
    ],
    stack: ["Power BI", "AI"],
    links: [{ label: "ask-pbi", href: "https://github.com/hemonc-team/ask-pbi" }],
  },
  {
    id: "greek",
    title: "Greek Legend",
    client: "Greek Legend",
    year: "2025",
    role: "Фронтенд",
    category: "web",
    coverKind: "image",
    cover: "/cases/greek/home.jpg",
    summary: "Сайт бренда оливкового масла на нескольких языках.",
    problem:
      "Нужна была аккуратная международная витрина, а не шаблонный лендинг.",
    solution:
      "Собрал лицевую часть сайта: структура, анимации, несколько языков. Работал вместе с дизайнером и серверной командой.",
    results: [
      { label: "Сайт", value: "greeklegend.gr" },
      { label: "Языки", value: "несколько" },
      { label: "Роль", value: "фронтенд" },
    ],
    stack: ["Nuxt", "Vite"],
    links: [{ label: "greeklegend.gr", href: "https://greeklegend.gr" }],
    images: [
      {
        src: "/cases/greek/home.jpg",
        alt: "Главная Greek Legend",
        label: "Главная",
      },
    ],
  },
  {
    id: "greek-ru",
    title: "Greek Legend — магазин в России",
    client: "Greek Legend",
    year: "2025",
    role: "Backend",
    category: "web",
    coverKind: "image",
    cover: "/cases/greek-ru/home.jpg",
    summary: "Серверная часть интернет-магазина на 1С-Битрикс: каталог, заказы, логика витрины.",
    problem:
      "Для российского сайта нужна была своя логика на Битриксе, а не копия греческой витрины.",
    solution:
      "Собрал backend на 1С-Битрикс: товары, корзина, оформление заказа и служебные сценарии магазина.",
    results: [
      { label: "Сайт", value: "greeklegend.ru" },
      { label: "Роль", value: "backend" },
      { label: "Платформа", value: "1С-Битрикс" },
    ],
    stack: ["1С-Битрикс", "PHP"],
    links: [{ label: "greeklegend.ru", href: "https://greeklegend.ru" }],
    images: [
      {
        src: "/cases/greek-ru/home.jpg",
        alt: "Главная greeklegend.ru",
        label: "greeklegend.ru",
      },
    ],
  },
  {
    id: "hemonc-web",
    title: "Сайт клиники hemonc.ru",
    client: "Клиника доктора Ласкова",
    year: "2026",
    role: "Разработчик",
    category: "web",
    coverKind: "image",
    cover: "/cases/hemonc/home.jpg",
    summary: "Рабочий сайт записи и контента клиники: hemonc.ru.",
    problem:
      "Клинике нужен был не одноразовый лендинг, а сайт, который можно развивать дальше.",
    solution:
      "Делаю и поддерживаю сайт на 1С-Битрикс: запись, тексты, цели для рекламы.",
    results: [
      { label: "hemonc.ru", value: "в работе" },
      { label: "Роль", value: "разработка и поддержка" },
      { label: "Платформа", value: "1С-Битрикс" },
    ],
    stack: ["1С-Битрикс", "PHP", "Docker"],
    links: [{ label: "hemonc.ru", href: "https://hemonc.ru" }],
    images: [
      {
        src: "/cases/hemonc/home.jpg",
        alt: "Главная hemonc.ru",
        label: "hemonc.ru",
      },
    ],
  },
  {
    id: "nmpl",
    title: "Сайт НМПЛ",
    client: "Независимые медицинские партнёры Ласкова",
    year: "2026",
    role: "Разработчик",
    category: "web",
    coverKind: "image",
    cover: "/cases/nmpl/home.jpg",
    summary: "Сайт для независимых врачей: nmpl.ru.",
    problem:
      "Нужна была отдельная витрина для врачей, которые работают не как клиника, а как независимые специалисты.",
    solution:
      "Собрал и поддерживаю сайт на 1С-Битрикс: специалисты, запись, тексты.",
    results: [
      { label: "nmpl.ru", value: "в работе" },
      { label: "Роль", value: "разработка и поддержка" },
      { label: "Платформа", value: "1С-Битрикс" },
    ],
    stack: ["1С-Битрикс", "PHP", "Docker"],
    links: [{ label: "nmpl.ru", href: "https://nmpl.ru" }],
    images: [
      {
        src: "/cases/nmpl/home.jpg",
        alt: "Главная nmpl.ru",
        label: "nmpl.ru",
      },
    ],
  },
  {
    id: "headache",
    title: "Клиника головной боли",
    client: "Клиника головной боли",
    year: "2025—2026",
    role: "Разработчик",
    category: "web",
    coverKind: "image",
    cover: "/cases/headache/home.jpg",
    summary: "Сайт узкопрофильной клиники: headache.ru.",
    problem:
      "Клинике нужен был сайт записи, контента и направлений — не шаблонная визитка.",
    solution:
      "Собрал фронтенд и логику сайта на 1С-Битрикс: страницы клиники, запись, поиск, формы.",
    results: [
      { label: "headache.ru", value: "в работе" },
      { label: "Роль", value: "разработка" },
      { label: "Платформа", value: "1С-Битрикс" },
    ],
    stack: ["1С-Битрикс", "PHP", "Vite"],
    links: [{ label: "headache.ru", href: "https://headache.ru" }],
    images: [
      {
        src: "/cases/headache/home.jpg",
        alt: "Главная headache.ru",
        label: "headache.ru",
      },
    ],
  },
  {
    id: "vegas",
    title: "Сайт ТРЦ Вегас",
    client: "Crocus Group",
    year: "2022—2025",
    role: "Разработчик",
    category: "web",
    coverKind: "image",
    cover: "/cases/vegas/kashirskoe.jpg",
    summary: "Сайт торговых центров VEGAS: магазины, события, сервисы.",
    problem:
      "ТРЦ нужны были рабочие сайты нескольких площадок, а не одна общая заглушка.",
    solution:
      "Делал сайт VEGAS: выбор центра, витрина, новости, карта и сервисы для посетителей.",
    results: [
      { label: "Сайт", value: "vegas-city.ru" },
      { label: "Площадки", value: "несколько ТРЦ" },
      { label: "Роль", value: "разработка" },
    ],
    stack: ["1С-Битрикс", "PHP"],
    links: [{ label: "vegas-city.ru", href: "https://vegas-city.ru" }],
    images: [
      {
        src: "/cases/vegas/kashirskoe.jpg",
        alt: "Главная ТРК VEGAS Каширское",
        label: "Каширское",
      },
      {
        src: "/cases/vegas/chooser.jpg",
        alt: "Выбор площадки VEGAS",
        label: "Площадки",
      },
    ],
  },
  {
    id: "crocus",
    title: "Сайт Crocus Group",
    client: "Crocus Group",
    year: "2022—2025",
    role: "Разработчик",
    category: "web",
    coverKind: "image",
    cover: "/cases/crocus/home.jpg",
    summary: "Корпоративный сайт девелопера: crocusgroup.ru.",
    problem:
      "Компании нужен был публичный сайт с проектами и цифрами, а не внутренняя визитка.",
    solution:
      "Собрал сайт компании: главная, проекты, материалы о группе.",
    results: [
      { label: "Сайт", value: "crocusgroup.ru" },
      { label: "Роль", value: "разработка" },
      { label: "Тип", value: "корпоративный" },
    ],
    stack: ["1С-Битрикс", "PHP"],
    links: [{ label: "crocusgroup.ru", href: "https://crocusgroup.ru" }],
    images: [
      {
        src: "/cases/crocus/home.jpg",
        alt: "Главная crocusgroup.ru",
        label: "Главная",
      },
    ],
  },
  {
    id: "zhara",
    title: "Жара Медиа",
    client: "Жара Медиа",
    year: "2021—2022",
    role: "Фронтенд",
    category: "web",
    coverKind: "image",
    cover: "/cases/zhara/home.jpg",
    summary: "Редизайн сайта холдинга и раздел Жара FM.",
    problem:
      "Старый сайт медиахолдинга выглядел устаревшим, а радио не имело нормальной витрины.",
    solution:
      "Сверстал редизайн основного сайта и страницу Жара FM: навигация, премьеры, эфир.",
    results: [
      { label: "Сайт", value: "zharamedia.ru" },
      { label: "Раздел", value: "Жара FM" },
      { label: "Роль", value: "фронтенд" },
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "zharamedia.ru", href: "https://zharamedia.ru" },
      { label: "Жара FM", href: "https://zharamedia.ru/fm/" },
    ],
    images: [
      {
        src: "/cases/zhara/home.jpg",
        alt: "Редизайн zharamedia.ru",
        label: "Редизайн",
      },
      {
        src: "/cases/zhara/fm.jpg",
        alt: "Раздел Жара FM",
        label: "Жара FM",
      },
    ],
  },
];

export const career = [
  {
    period: "2026 — сейчас",
    title: "AI-инженер",
    org: "Клиника доктора Ласкова",
    body: "Автоматизации, тексты, отчёты, обучение сотрудников работе с AI.",
  },
  {
    period: "2025 — сейчас",
    title: "Backend-разработчик",
    org: "Бизан / РТК",
    body: "Серверная часть финансовой платформы, база, связь с 1С, помощь младшим в команде.",
  },
  {
    period: "2022 — 2025",
    title: "Разработчик",
    org: "Crocus Group",
    body: "Внутренний портал, сайты, экраны в торговом центре, сбор и обработка данных.",
  },
  {
    period: "2021 — 2022",
    title: "Фронтенд",
    org: "Flexcore · Skillbox · Лига А.",
    body: "Сайты и интерфейсы с нуля, вёрстка, клиентская часть логистической платформы.",
  },
];

export const skills = [
  {
    title: "AI",
    items: [
      "Системы на нейросетях",
      "Промпты и проверка качества",
      "Поиск по своим документам",
      "OpenAI и открытые модели",
      "Cursor и Claude Code",
    ],
  },
  {
    title: "Автоматизация",
    items: ["Python", "n8n", "Telegram-боты", "Bitrix24"],
  },
  {
    title: "Данные",
    items: ["PostgreSQL", "ClickHouse", "Сбор данных по расписанию", "Power BI", "Yandex DataLens"],
  },
  {
    title: "Веб",
    items: ["Laravel", "API", "Docker", "Nuxt, Bitrix, WordPress"],
  },
];
