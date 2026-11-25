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
  coverKind: "pipeline" | "etl" | "agent" | "ask" | "cards" | "rag" | "image";
  images?: ProjectImage[];
  badge?: string;
};

const PRACTICUM_BADGE = "Учебный проект в Я Практикум";

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
      "Внутренний сервис, где собраны проекты, финансы и загрузка сотрудников, с ежедневной синхронизацией с 1С.",
    problem:
      "У компании в работе больше 250 проектов. Воронка и финансы велись в 1С, загрузка людей — в таблицах, а сводные отчёты собирали вручную. Из-за этого руководство видело картину с опозданием и каждый раз в немного разном виде.",
    solution:
      "Я отвечал за серверную часть сервиса. Сделал систему ролей, чтобы каждый сотрудник видел только свои проекты и показатели, подключил единый вход и настроил ежедневный обмен с 1С. На этих данных построил отчёты по проектам, деньгам и сотрудникам, которые открываются прямо в интерфейсе. Параллельно вёл задачи команды, проверял код младших разработчиков и писал инструкции для пользователей.",
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
      "Система готовит статьи и посты по правилам клиники и публикует их на сайте и в соцсетях.",
    problem:
      "Сайт и соцсети клиники вели копирайтер и два SMM-специалиста. Медицинские тексты должны быть точными, но держать ради этого трёх человек выходило дорого, а качество всё равно зависело от конкретного автора.",
    solution:
      "Я собрал цепочку, в которой каждый текст начинается с проверенного источника. По нему модель пишет черновик, затем текст проверяется по правилам клиники и уходит на сайт и в соцсети. Стиль и структуру задают 11 эталонных текстов, а все версии хранятся в git, поэтому любую правку можно отследить и откатить. Кроме того, я учу сотрудников клиники пользоваться AI в повседневной работе.",
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
      "Каждую ночь данные из рекламы, звонков и CRM собираются в одной базе, и утром отчёты открываются без сбоев.",
    problem:
      "Отчёты в Power BI обновлялись около 55 минут, тормозили и иногда не открывались вовсе. Цифры из Яндекс Метрики, сервиса звонков и CRM между собой не сходились, а нужный срез сотрудники искали подолгу.",
    solution:
      "Я вынес сбор данных из Power BI в отдельную базу. Каждую ночь скрипты на Python забирают данные из Метрики, Calltouch и Битрикс24, чистят их, убирают дубли контактов и складывают в PostgreSQL. Power BI теперь строит отчёты из готовых таблиц, и обновление занимает около 19 минут вместо 55. Если какая-то выгрузка падает, в Telegram приходит сообщение, и сбой видно раньше, чем его заметят сотрудники.",
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
      "Каждый день программа разбирает новые заявки в CRM: простые по правилам, сложные с помощью AI.",
    problem:
      "Колл-центр не успевал разбирать все входящие заявки и заполнять в них поля. Каждый оператор делал это по-своему, поэтому данные в CRM получались неполными и плохо подходили для отчётов.",
    solution:
      "Разбор идёт в два этапа. Сначала срабатывают простые правила, и они закрывают примерно половину заявок без участия нейросети. Оставшиеся заявки разбирает AI и записывает результат в поля CRM. Если сотрудник не согласен с разбором, он отмечает это кнопкой, и на следующий день правила учитывают его правку. Код обеих частей открыт на GitHub.",
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
    id: "ask-pbi",
    title: "Вопросы к отчётам своими словами",
    client: "Клиника доктора Ласкова",
    year: "2026",
    role: "AI-инженер",
    category: "ai",
    coverKind: "ask",
    summary:
      "Маркетолог задаёт вопрос к отчёту обычными словами и сразу получает цифру, не дожидаясь аналитика.",
    problem:
      "Чтобы узнать одну цифру из отчёта, маркетолог писал аналитику и ждал, пока тот откроет Power BI и найдёт нужный показатель. Даже простой вопрос превращался в ожидание и отвлекал аналитика от его работы.",
    solution:
      "Я сделал навык для рабочего чата с AI. Вопрос на русском превращается в запрос к боевой модели Power BI, а ответ возвращается в чат. Можно спросить значение показателя, разбивку, например по каналам, или динамику за период. Навык работает через API Power BI Service, без Power BI Desktop и без Premium-подписки. Код открыт на GitHub.",
    results: [
      { label: "Как спрашивать", value: "своими словами" },
      { label: "Откуда ответ", value: "боевые отчёты" },
      { label: "Код", value: "открыт на GitHub" },
    ],
    stack: ["Power BI", "AI"],
    links: [{ label: "ask-pbi", href: "https://github.com/hemonc-team/ask-pbi" }],
  },
  {
    id: "cards-generation",
    title: "Карточки товаров на своей модели",
    client: "Маркетплейс «Полка»",
    year: "2026",
    role: "AI-инженер",
    category: "ai",
    coverKind: "cards",
    badge: PRACTICUM_BADGE,
    summary:
      "Открытая модель на собственном сервере пишет карточки товаров по характеристикам и отзывам, 300 штук за три минуты.",
    problem:
      "Маркетплейс растёт быстрее, чем контент-команда успевает писать карточки товаров. Каждая карточка должна содержать описание, плюсы, минусы и теги строго в формате витрины, а 1000 карточек должны обходиться не дороже 25 ₽. У части товаров по 200 отзывов, и целиком они в модель не помещаются.",
    solution:
      "Я развернул Qwen 2.5 на 1,5 млрд параметров на vLLM с видеокартой T4 и написал промпт с образцом готовой карточки. Ответ модели проверяется по схеме витрины, а если формат нарушен, запрос повторяется с указанием ошибки. Из длинных отзывов в промпт попадает выборка, в которой обязательно есть претензии, чтобы минусы не терялись. Затем я подобрал параметры генерации и число параллельных запросов, прогнал 300 товаров и сравнил стоимость с внешним API: своя модель оказалась почти втрое дешевле.",
    results: [
      { label: "Карточек в верном формате", value: "96%" },
      { label: "300 карточек", value: "3 мин 10 с" },
      { label: "1000 карточек: своя модель / API", value: "11 ₽ / 32 ₽" },
    ],
    stack: ["Python", "vLLM", "Qwen 2.5", "OpenRouter", "asyncio"],
    links: [],
  },
  {
    id: "filmoskop-rag",
    title: "Ассистент поддержки по справке",
    client: "Онлайн-кинотеатр «Фильмоскоп»",
    year: "2026",
    role: "AI-инженер",
    category: "ai",
    coverKind: "rag",
    badge: PRACTICUM_BADGE,
    summary:
      "Ассистент отвечает зрителям по справке онлайн-кинотеатра, а если ответа в справке нет, прямо об этом говорит.",
    problem:
      "В справке кинотеатра 181 статья, и в тексте много мусора: HTML-теги, сбитая кодировка, дубли. Ассистент должен находить нужные статьи, отвечать только по ним и не придумывать ответ, если в справке его нет.",
    solution:
      "Сначала я очистил базу до 138 статей и нарезал их на фрагменты. Поиск совмещает поиск по смыслу и по словам, а затем переранжирует найденное, и это подняло долю вопросов с нужной статьёй в топ-5 с 68 до 86%. Ответ по найденным статьям пишет Qwen 2.5 7B на vLLM. Качество я проверил на 66 вопросах вручную и с помощью второй модели-судьи: отказы работают без ошибок, но 76% верных ответов не дотягивают до цели в 90%, поэтому отвечать зрителям без проверки человеком ассистенту пока рано.",
    results: [
      { label: "Нужная статья в топ-5", value: "68% → 86%" },
      { label: "Отказ, когда ответа нет", value: "10 из 10" },
      { label: "Верных ответов", value: "76%" },
    ],
    stack: ["Python", "RAG", "vLLM", "Qwen 2.5", "Chroma", "BM25"],
    links: [],
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
      "Каталог книжного магазина на телефоне открывался почти полминуты, теперь открывается за несколько секунд.",
    problem:
      "На телефоне обложки в каталоге загружались около 23 секунд. Страницы весили слишком много, а кнопка «избранное» срабатывала не всегда.",
    solution:
      "Я убрал со страниц лишний код, уменьшил и пересжал изображения и починил кнопку «избранное». В итоге вес страницы снизился на 82%, а оценка скорости выросла примерно с 60 до 90+ баллов. Отдельно с помощью AI-агента проверил сайт на визуальные ошибки и слабые места для поиска и составил список исправлений.",
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
    id: "greek",
    title: "Greek Legend",
    client: "Greek Legend",
    year: "2025",
    role: "Фронтенд",
    category: "web",
    coverKind: "image",
    cover: "/cases/greek/home.jpg",
    summary:
      "Многоязычный сайт греческого бренда оливкового масла.",
    problem:
      "Бренду нужна была международная витрина на нескольких языках с аккуратной подачей продукта, а не шаблонный лендинг.",
    solution:
      "Я сделал фронтенд сайта на Nuxt: структуру страниц, анимации и переключение языков. Макеты приходили от дизайнера, а данные отдавала серверная команда, так что работа шла в постоянной связке с ними.",
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
    summary:
      "Серверная часть российского интернет-магазина Greek Legend на 1С-Битрикс.",
    problem:
      "Для продаж в России понадобился отдельный магазин со своим каталогом и оформлением заказа. Копия греческой витрины для этого не подходила.",
    solution:
      "Я сделал серверную часть магазина на 1С-Битрикс: каталог товаров, корзину, оформление заказа и служебные сценарии, которые нужны магазину в повседневной работе.",
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
    summary:
      "Сайт клиники hemonc.ru с онлайн-записью и медицинскими статьями.",
    problem:
      "Клинике нужен был сайт, который можно развивать дальше: добавлять разделы, статьи и цели для рекламы, а не одноразовый лендинг.",
    solution:
      "Я разрабатываю и поддерживаю сайт на 1С-Битрикс: запись к врачам, разделы с текстами, цели для рекламной аналитики. Правки сначала проверяются на тестовой копии и только потом попадают на основной сайт, а локально проект поднимается в Docker. Статьи из системы подготовки текстов публикуются на сайт автоматически.",
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
    summary:
      "Сайт для независимых врачей-партнёров клиники: nmpl.ru.",
    problem:
      "Врачам, которые работают как независимые специалисты, а не как сотрудники клиники, нужна была отдельная витрина со своими страницами и записью.",
    solution:
      "Я собрал и поддерживаю сайт на 1С-Битрикс: страницы специалистов, запись на приём и тексты. Локально проект запускается в Docker, так же как сайт клиники.",
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
    summary:
      "Сайт узкопрофильной клиники головной боли: headache.ru.",
    problem:
      "Клинике нужен был полноценный сайт с направлениями, статьями и записью, а не шаблонная визитка.",
    solution:
      "Я сделал фронтенд и логику сайта на 1С-Битрикс: страницы клиники и направлений, запись, поиск и формы. Фронтенд собирается через Vite.",
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
    summary:
      "Сайт сети торговых центров VEGAS: магазины, события и сервисы.",
    problem:
      "У сети несколько торговых центров, и каждому нужен свой рабочий сайт с магазинами и новостями, а не общая страница-заглушка.",
    solution:
      "Я разрабатывал сайт VEGAS на 1С-Битрикс: выбор торгового центра, витрину магазинов, новости, карту и сервисы для посетителей.",
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
    summary:
      "Корпоративный сайт девелопера Crocus Group.",
    problem:
      "Компании нужен был публичный сайт, где видны проекты группы и ключевые цифры.",
    solution:
      "Я собрал сайт на 1С-Битрикс: главную страницу, раздел проектов и материалы о группе.",
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
    summary:
      "Редизайн сайта медиахолдинга и новый раздел радио Жара FM.",
    problem:
      "Сайт медиахолдинга выглядел устаревшим, а у радиостанции не было нормальной страницы.",
    solution:
      "Я сверстал редизайн основного сайта и отдельную страницу Жара FM с навигацией, премьерами и эфиром.",
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
