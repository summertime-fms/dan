import type { ReactNode } from "react";

export function BrowserMockup({
  children,
  label = "demo · тестовые данные",
}: {
  children?: ReactNode;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] text-muted">
          {label}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-surface-raised">
        {children ?? <BlurDashboard />}
      </div>
    </div>
  );
}

function BlurDashboard() {
  return (
    <div className="absolute inset-0 p-4" aria-hidden>
      <div className="mb-3 flex gap-2">
        <div className="h-8 w-24 rounded-md bg-accent/20 blur-[1px]" />
        <div className="h-8 w-16 rounded-md bg-white/5" />
        <div className="h-8 w-16 rounded-md bg-white/5" />
      </div>
      <div className="grid h-[70%] grid-cols-3 gap-3">
        <div className="col-span-2 rounded-lg bg-gradient-to-br from-accent/15 to-transparent blur-[2px]" />
        <div className="flex flex-col gap-2">
          <div className="flex-1 rounded-lg bg-white/5 blur-[1px]" />
          <div className="flex-1 rounded-lg bg-white/5 blur-[1px]" />
        </div>
      </div>
    </div>
  );
}

function Node({
  title,
  subtitle,
  accent = false,
}: {
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[88px] flex-col justify-center rounded-[10px] border px-4 py-3 ${
        accent
          ? "border-accent/30 bg-accent-dim"
          : "border-border bg-surface-raised/80"
      }`}
    >
      <p
        className={`font-mono text-sm font-semibold ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {title}
      </p>
      <p className="mt-1 text-xs leading-snug text-muted">{subtitle}</p>
    </div>
  );
}

function Arrow() {
  return (
    <span
      className="hidden shrink-0 self-center font-mono text-accent/70 sm:inline"
      aria-hidden
    >
      →
    </span>
  );
}

export function PipelineVisual() {
  return (
    <div className="rounded-[12px] border border-border bg-background/40 p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        Архитектура контент-завода
      </p>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Мультиагентный конвейер с правилами, банком источников и врачебным
        контролем качества — вместо штата копирайтера и SMM.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch">
        <Node title="Planner" subtitle="План материала по типу и аудитории" />
        <Arrow />
        <Node title="Critic" subtitle="Проверка плана по своду правил" />
        <Arrow />
        <Node title="Executor" subtitle="Текст строго по утверждённым источникам" accent />
        <Arrow />
        <Node title="QA" subtitle="Выборочная врачебная вычитка" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[10px] border border-dashed border-border px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Governance
          </p>
          <p className="mt-1 text-sm text-foreground/90">
            Свод правил, роли, версионирование
          </p>
        </div>
        <div className="rounded-[10px] border border-dashed border-border px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Источники
          </p>
          <p className="mt-1 text-sm text-foreground/90">
            Банк утверждённых материалов
          </p>
        </div>
        <div className="rounded-[10px] border border-dashed border-border px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Каналы
          </p>
          <p className="mt-1 text-sm text-foreground/90">
            Сайт, соцсети, позиционные блоки
          </p>
        </div>
      </div>
    </div>
  );
}

export function EtlVisual() {
  return (
    <div className="rounded-[12px] border border-border bg-background/40 p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        Архитектура данных
      </p>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Промежуточный DWH вместо прямых тяжёлых коннекторов в отчётах —
        стабильный рефреш и наблюдаемость процесса.
      </p>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1.1fr_auto_1fr_auto_1.1fr] lg:items-stretch">
        <div className="rounded-[10px] border border-border bg-surface-raised/80 p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Источники
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Операционные системы клиники
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              CRM и маркетинг
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Внешние API
            </li>
          </ul>
        </div>

        <Arrow />

        <div className="rounded-[10px] border border-accent/30 bg-accent-dim p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
            PostgreSQL DWH
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            <li>Инкрементальный ETL</li>
            <li>Идемпотентные загрузки</li>
            <li>Сверка с источником</li>
          </ul>
        </div>

        <Arrow />

        <div className="rounded-[10px] border border-border bg-surface-raised/80 p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Витрины
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Power BI — операционка
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Power BI — маркетинг
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Алерты и панель статусов
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PortraitPlaceholder() {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px] border border-border"
      aria-label="Портрет эксперта — скоро"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-surface-raised" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,229,255,0.15),transparent_55%)]" />
      <div className="absolute inset-x-[22%] top-[18%] bottom-[28%] rounded-full bg-foreground/5 blur-sm" />
      <div className="absolute inset-x-[18%] bottom-[8%] h-[35%] rounded-t-[40%] bg-foreground/8" />
    </div>
  );
}
