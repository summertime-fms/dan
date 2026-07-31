export type CaseStatus = "published" | "soon";

export type CaseCategory =
  | "AI-агенты"
  | "Аналитика и BI"
  | "Performance & DevOps"
  | "Наведение порядка в IT";

export type CaseScreenshot = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export type CaseItem = {
  id: string;
  status: CaseStatus;
  title: string;
  starred: boolean;
  /** Технические бирки стека (под заголовком) */
  tags: string[];
  /** Категории для фильтра над сеткой */
  categories: CaseCategory[];
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  visual: "browser" | "pipeline" | "etl" | "performance" | "soon";
  screenshots?: CaseScreenshot[];
};

export const caseCategoryFilters: Array<"Все" | CaseCategory> = [
  "Все",
  "AI-агенты",
  "Аналитика и BI",
  "Performance & DevOps",
  "Наведение порядка в IT",
];

export const cases: CaseItem[] = [
  {
    id: "rtk",
    status: "published",
    title: "РТК — внутренняя ERP/BI-платформа",
    starred: true,
    tags: ["Laravel", "React", "MySQL", "Keycloak SSO", "Chart.js"],
    categories: ["Аналитика и BI", "Наведение порядка в IT"],
    problem:
      "При портфеле 250+ проектов не было единой системы учёта: воронка, финансы, загрузка сотрудников и отчётность жили в 1С, таблицах и ручных отчётах.",
    solution:
      "Построена внутренняя платформа: воронка продаж по проектам, автогенерация отчётов, контрагенты и персонал, гибкие права, SSO + 2FA, ежедневный синк с 1С и BI-дашборды.",
    results: [
      { label: "Проектов в единой системе", value: "250+" },
      { label: "Коммиты backend", value: "1 475" },
      { label: "Срок", value: "~1 год" },
    ],
    visual: "browser",
    screenshots: [
      {
        src: "/cases/rtk/01-finance.png",
        alt: "РТК — ключевые финансовые показатели",
        label: "BI · финансы",
        width: 3289,
        height: 1468,
      },
      {
        src: "/cases/rtk/02-reports-projects.png",
        alt: "РТК — реестр отчётов проектов",
        label: "Реестр отчётов",
        width: 3336,
        height: 1397,
      },
      {
        src: "/cases/rtk/05-project-detail.png",
        alt: "РТК — карточка проекта",
        label: "Карточка проекта",
        width: 3370,
        height: 1786,
      },
      {
        src: "/cases/rtk/03-project-form.png",
        alt: "РТК — редактирование отчёта проекта",
        label: "Отчёт проекта",
        width: 3382,
        height: 1876,
      },
      {
        src: "/cases/rtk/04-reports-employees.png",
        alt: "РТК — реестр отчётов сотрудников",
        label: "Отчёты сотрудников",
        width: 3411,
        height: 1648,
      },
      {
        src: "/cases/rtk/06-permissions.png",
        alt: "РТК — группы прав доступа",
        label: "Права доступа",
        width: 3333,
        height: 1824,
      },
    ],
  },
  {
    id: "hemonc-content",
    status: "published",
    title: "hemonc.ru — контент-завод на AI-агентах",
    starred: true,
    tags: ["AI Agents", "Multi-agent QA", "LLM Pipeline"],
    categories: ["AI-агенты"],
    problem:
      "Пациентский контент для сайта и соцсетей требовал копирайтера и двух SMM — нужно было сохранить медицинскую точность без штатной зависимости от трёх человек.",
    solution:
      "Спроектирован и ведётся мультиагентный конвейер с сводом правил, банком источников и выборочной врачебной вычиткой. Отдельный конвейер закрывает иллюстрации. Сотрудников клиники обучаю работе с AI-инструментами.",
    results: [
      { label: "Штат до перехода", value: "−3 ед." },
      { label: "ФОТ до", value: "~150 000 ₽/мес" },
      { label: "Эталоны", value: "11 материалов" },
    ],
    visual: "pipeline",
  },
  {
    id: "hemonc-dwh",
    status: "published",
    title: "Клиника Ласкова — DWH и Power BI",
    starred: true,
    tags: ["Power BI", "PostgreSQL", "Python", "ETL"],
    categories: ["Аналитика и BI", "Наведение порядка в IT"],
    problem:
      "Модели были перегружены, регулярный рефреш уходил в таймаут, отчёт — одна громоздкая модель с множеством вкладок. Сотрудникам сложно найти нужный срез.",
    solution:
      "Модель упрощена и разделена по смыслу, добавлены подсказки в интерфейсе, настроен инкрементальный ночной рефреш. Появился промежуточный DWH с наблюдаемостью: алерты, панель статусов, сверка данных.",
    results: [
      { label: "Было", value: "таймауты" },
      { label: "Стало", value: "стабильный доступ" },
      { label: "Слой данных", value: "PostgreSQL DWH" },
    ],
    visual: "etl",
  },
  {
    id: "headache-clinic",
    status: "soon",
    title: "Сквозная аналитика клиники",
    starred: false,
    tags: ["DataLens", "Yandex Cloud", "ETL"],
    categories: ["Аналитика и BI"],
    problem: "",
    solution: "",
    results: [],
    visual: "soon",
  },
  {
    id: "zapyataya",
    status: "published",
    title: "Запятая — ускорение и UX книжного магазина",
    starred: true,
    tags: ["WordPress", "WooCommerce", "Core Web Vitals", "Photon CDN"],
    categories: ["Performance & DevOps", "Наведение порядка в IT"],
    problem:
      "Покупатель на телефоне ждал обложки каталога около 23 секунд — витрина «Запятой» почти не открывалась на мобильном. Избранное и кнопки покупки срывали клики: мелкий тап, долгий спиннер, непредсказуемое поведение — люди уходили до корзины.",
    solution:
      "Сделал каталог и карточки быстрыми на мобильном: страницы стали легче, витрина открывается за секунды вместо десятков. Починил избранное и кнопки «В корзину» — тап срабатывает сразу, путь к покупке короче. Магазин снова удобно листать с телефона.",
    results: [
      { label: "Каталог на телефоне", value: "23с → ~3с" },
      { label: "Вес страницы", value: "−82%" },
      { label: "Lighthouse", value: "~60 → 90+" },
    ],
    visual: "performance",
  },
];
