// Interface mockups for cases without real screenshots.
// All data inside is illustrative. SVG viewBox is 2:1 and is cropped with
// "slice", so it behaves like a screenshot in any container.

export type MockKind = "content" | "dwh" | "leads" | "ask" | "cards" | "rag";

const C = {
  bg: "#efece6",
  win: "#ffffff",
  ink: "#1c1b19",
  muted: "#6a655e",
  faint: "#9a948c",
  line: "#e4e0d8",
  soft: "#f6f4f0",
  warm: "#f1e7d3",
  green: "#3f7a55",
  greenSoft: "#e5efe7",
  red: "#a4553f",
};

type TextOpts = {
  size?: number;
  fill?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
};

function t(x: number, y: number, text: string, o: TextOpts = {}): string {
  return `<text x="${x}" y="${y}" font-size="${o.size ?? 13}" fill="${o.fill ?? C.ink}" font-weight="${
    o.weight ?? 400
  }" text-anchor="${o.anchor ?? "start"}">${text}</text>`;
}

function pill(
  x: number,
  y: number,
  w: number,
  label: string,
  o: { fill?: string; stroke?: string; color?: string; h?: number; size?: number } = {},
): string {
  const h = o.h ?? 22;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${o.fill ?? "none"}" stroke="${
    o.stroke ?? "none"
  }" />${t(x + w / 2, y + h / 2 + 4, label, { size: o.size ?? 11, fill: o.color ?? C.muted, anchor: "middle" })}`;
}

function bar(x: number, y: number, w: number, fill = C.line, h = 7): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" />`;
}

function check(cx: number, cy: number, r = 9, fill = C.ink): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" /><path d="M${cx - r * 0.42} ${cy}l${r * 0.3} ${
    r * 0.32
  }l${r * 0.52} -${r * 0.62}" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
}

function frame(title: string, label: string, body: string): string {
  return `<svg class="mock" viewBox="0 0 560 280" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="Onest, system-ui, sans-serif" role="img" aria-label="${label}">
    <rect width="560" height="280" fill="${C.bg}" />
    <rect x="24.5" y="16.5" width="511" height="300" rx="12" fill="${C.win}" stroke="${C.line}" />
    <circle cx="44" cy="35" r="4" fill="${C.line}" /><circle cx="58" cy="35" r="4" fill="${C.line}" /><circle cx="72" cy="35" r="4" fill="${C.line}" />
    ${t(92, 39.5, title, { size: 12, fill: C.muted })}
    <path d="M25 54h510" stroke="${C.line}" />
    ${body}
  </svg>`;
}

function askMock(): string {
  const bars = [34, 46, 40, 52, 44, 62];
  return frame(
    "Рабочий чат · навык ask-pbi",
    "Макет: вопрос к отчёту в чате и ответ цифрой",
    `
    <rect x="248" y="68" width="268" height="54" rx="14" fill="${C.ink}" />
    ${t(266, 90, "Сколько заявок пришло", { size: 14, fill: "#fff" })}
    ${t(266, 110, "из Директа в октябре?", { size: 14, fill: "#fff" })}
    <rect x="44" y="134" width="300" height="130" rx="14" fill="${C.soft}" />
    ${t(62, 170, "412 заявок", { size: 26, weight: 600 })}
    ${t(62, 192, "на 8% больше, чем в сентябре", { size: 13, fill: C.muted })}
    ${bars
      .map(
        (h, i) =>
          `<rect x="${62 + i * 26}" y="${252 - h * 0.85}" width="16" height="${h * 0.85}" rx="3" fill="${
            i === bars.length - 1 ? C.ink : C.line
          }" />`,
      )
      .join("")}
    ${pill(358, 140, 140, "из отчёта Power BI", { stroke: C.line })}
    ${pill(358, 170, 100, "разбивка", { stroke: C.line })}
    ${pill(358, 200, 100, "динамика", { stroke: C.line })}
  `,
  );
}

function leadsMock(): string {
  const rows: Array<[string, string, "правило" | "AI"]> = [
    ["Источник", "Сайт, форма записи", "правило"],
    ["Направление", "Гематология", "AI"],
    ["Тип обращения", "Первичная консультация", "AI"],
    ["Срочность", "Обычная", "правило"],
  ];
  return frame(
    "Битрикс24 · Заявка № 48213",
    "Макет: заявка в CRM, поля заполнены правилами и AI",
    `
    ${rows
      .map(([label, value, by], i) => {
        const y = 66 + i * 36;
        const ai = by === "AI";
        return `${t(48, y + 23, label, { size: 13, fill: C.muted })}
          ${t(176, y + 23, value, { size: 14 })}
          ${pill(432, y + 8, 76, by, { fill: ai ? C.warm : C.soft, color: ai ? C.ink : C.muted })}
          <path d="M44 ${y + 36}h472" stroke="${C.line}" />`;
      })
      .join("")}
    <rect x="44" y="222" width="116" height="36" rx="8" fill="${C.ink}" />
    ${t(102, 245, "Согласен", { size: 13, fill: "#fff", anchor: "middle" })}
    <rect x="170.5" y="222.5" width="128" height="35" rx="8" fill="none" stroke="${C.line}" />
    ${t(234, 245, "Не согласен", { size: 13, anchor: "middle" })}
    ${t(508, 245, "правки учтутся завтра", { size: 11, fill: C.faint, anchor: "end" })}
  `,
  );
}

function contentMock(): string {
  const steps = ["Источник", "Черновик", "Проверка", "Публикация"];
  return frame(
    "Подготовка текста · статья для раздела «Полезное»",
    "Макет: этапы подготовки медицинской статьи и превью публикации",
    `
    <path d="M57 88v126" stroke="${C.line}" stroke-width="2" />
    ${steps
      .map((s, i) => {
        const y = 88 + i * 42;
        const done = i < 3;
        return `${
          done
            ? check(57, y, 10)
            : `<circle cx="57" cy="${y}" r="10" fill="#fff" stroke="${C.ink}" stroke-width="1.5" /><circle cx="57" cy="${y}" r="3.5" fill="${C.ink}" />`
        }${t(78, y + 4.5, s, { size: 13, fill: done ? C.ink : C.muted, weight: done ? 400 : 500 })}`;
      })
      .join("")}
    <rect x="206" y="68" width="310" height="196" rx="12" fill="${C.soft}" />
    ${t(224, 92, "СТАТЬЯ · ПОЛЕЗНОЕ", { size: 10, fill: C.faint })}
    ${t(224, 118, "Анемия при химиотерапии:", { size: 17, weight: 600 })}
    ${t(224, 140, "что важно знать пациенту", { size: 17, weight: 600 })}
    ${bar(224, 156, 270)}${bar(224, 170, 248)}${bar(224, 184, 196)}
    ${pill(224, 202, 52, "Сайт", { fill: "#fff", stroke: C.line })}
    ${pill(282, 202, 42, "VK", { fill: "#fff", stroke: C.line })}
    ${pill(330, 202, 74, "Telegram", { fill: "#fff", stroke: C.line })}
    ${check(232, 242, 7, C.green)}
    ${t(246, 246.5, "Сверено с источником и правилами клиники", { size: 12, fill: C.green })}
  `,
  );
}

function dwhMock(): string {
  const rows: Array<[string, string]> = [
    ["Яндекс Метрика", "03:04"],
    ["Calltouch · звонки", "03:09"],
    ["Битрикс24 · заявки", "03:12"],
    ["Очистка и дубли контактов", "03:14"],
  ];
  return frame(
    "Ночная выгрузка · PostgreSQL",
    "Макет: статус ночной выгрузки данных и уведомление в Telegram",
    `
    ${rows
      .map(([name, time], i) => {
        const y = 66 + i * 34;
        return `${check(56, y + 17, 8, C.green)}
          ${t(74, y + 21.5, name, { size: 13 })}
          ${t(300, y + 21.5, time, { size: 12, fill: C.faint, anchor: "end" })}
          <path d="M44 ${y + 34}h256" stroke="${C.line}" />`;
      })
      .join("")}
    <rect x="44" y="214" width="256" height="50" rx="10" fill="${C.ink}" />
    ${t(60, 234, "Telegram · бот выгрузки", { size: 11, fill: "#bdb7ae" })}
    ${t(60, 253, "Все источники загружены без ошибок", { size: 12.5, fill: "#fff" })}
    <rect x="318" y="68" width="198" height="196" rx="12" fill="${C.soft}" />
    ${t(336, 94, "ОБНОВЛЕНИЕ POWER BI", { size: 10, fill: C.faint })}
    ${t(336, 138, "19 мин", { size: 34, weight: 600 })}
    ${t(336, 160, "было около 55 мин", { size: 12, fill: C.muted })}
    ${bar(336, 186, 56, C.ink, 8)}${t(400, 193.5, "сейчас", { size: 10.5, fill: C.muted })}
    ${bar(336, 206, 162, C.line, 8)}${t(336, 228, "было", { size: 10.5, fill: C.faint })}
    ${t(336, 252, "отчёты готовы к 07:00", { size: 12, fill: C.green })}
  `,
  );
}

function cardsMock(): string {
  return frame(
    "Полка · карточка товара P-0039",
    "Макет: сгенерированная карточка товара с плюсами, минусами и тегами",
    `
    <rect x="44" y="68" width="132" height="132" rx="12" fill="${C.soft}" />
    <path d="M86 168h48l-4-46h-40z" fill="none" stroke="${C.faint}" stroke-width="2" stroke-linejoin="round" />
    <path d="M134 132c14 0 16 22 0 24" fill="none" stroke="${C.faint}" stroke-width="2" />
    <path d="M92 122c0-10 36-10 36 0" fill="none" stroke="${C.faint}" stroke-width="2" />
    ${pill(44, 214, 132, "JSON по схеме ✓", { fill: C.greenSoft, color: C.green, h: 26, size: 11.5 })}
    ${t(196, 90, "Электрический чайник, 1,7 л", { size: 17, weight: 600 })}
    ${t(196, 112, "Стальной корпус, закипает за 4 минуты", { size: 12.5, fill: C.muted })}
    ${t(196, 129, "и долго держит воду горячей.", { size: 12.5, fill: C.muted })}
    ${t(196, 158, "ПЛЮСЫ", { size: 10, fill: C.faint })}
    ${t(196, 178, "+ Быстро закипает", { size: 13, fill: C.green })}
    ${t(196, 198, "+ Не пахнет пластиком", { size: 13, fill: C.green })}
    ${t(372, 158, "МИНУСЫ", { size: 10, fill: C.faint })}
    ${t(372, 178, "− Шумит при нагреве", { size: 13, fill: C.red })}
    ${pill(196, 220, 58, "кухня", { stroke: C.line })}
    ${pill(260, 220, 66, "чайник", { stroke: C.line })}
    ${pill(332, 220, 62, "сталь", { stroke: C.line })}
    ${t(516, 258, "из 191 отзыва отобрано 41", { size: 11, fill: C.faint, anchor: "end" })}
  `,
  );
}

function ragMock(): string {
  return frame(
    "Фильмоскоп · Помощь",
    "Макет: ассистент поддержки отвечает по справке и отказывает, если ответа нет",
    `
    <rect x="292" y="64" width="224" height="34" rx="14" fill="${C.ink}" />
    ${t(306, 86, "Как отключить автопродление?", { size: 12.5, fill: "#fff" })}
    <rect x="44" y="106" width="344" height="78" rx="14" fill="${C.soft}" />
    ${t(60, 128, "Откройте «Профиль → Подписка» и нажмите", { size: 12.5 })}
    ${t(60, 146, "«Отключить автопродление».", { size: 12.5 })}
    <rect x="60.5" y="156.5" width="200" height="20" rx="10" fill="#fff" stroke="${C.line}" />
    <rect x="70" y="161" width="8" height="10" rx="1.5" fill="none" stroke="${C.faint}" />
    ${t(84, 170.5, "Статья: Управление подпиской", { size: 10.5, fill: C.muted })}
    <rect x="320" y="192" width="196" height="34" rx="14" fill="${C.ink}" />
    ${t(334, 214, "Есть ли у вас Dolby Atmos?", { size: 12.5, fill: "#fff" })}
    <rect x="44" y="234" width="168" height="34" rx="14" fill="${C.soft}" />
    ${t(60, 256, "В справке этого нет.", { size: 12.5 })}
  `,
  );
}

const builders: Record<MockKind, () => string> = {
  content: contentMock,
  dwh: dwhMock,
  leads: leadsMock,
  ask: askMock,
  cards: cardsMock,
  rag: ragMock,
};

export function mockup(kind: MockKind): string {
  return builders[kind]();
}
