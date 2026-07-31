"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenshotCarousel } from "@/components/ui/ScreenshotCarousel";
import {
  EtlVisual,
  PerformanceVisual,
  PipelineVisual,
} from "@/components/ui/Visuals";
import {
  caseCategoryFilters,
  cases,
  type CaseCategory,
  type CaseItem,
} from "@/content/cases";
import { casesAttribution } from "@/content/copy";

type Filter = (typeof caseCategoryFilters)[number];

const filterLabels: Record<Filter, string> = {
  Все: "Все",
  "AI-агенты": "AI-агенты",
  "Аналитика и BI": "Аналитика и BI",
  "Performance & DevOps": "Performance & DevOps",
  "Наведение порядка в IT": "Наведение порядка",
};

export function Cases() {
  const [filter, setFilter] = useState<Filter>("Все");

  const visible = cases.filter((item) =>
    filter === "Все" ? true : item.categories.includes(filter as CaseCategory),
  );

  return (
    <section id="cases" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Кейсы
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Результаты, а не резюме
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            Реальные проекты с бизнес-задачей и измеримым эффектом.
          </p>
        </Reveal>

        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Фильтр кейсов по категории"
        >
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            Показать:
          </span>
          {caseCategoryFilters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={`min-h-11 rounded-md border px-3 py-2 font-mono text-[11px] transition-colors duration-200 ${
                  active
                    ? "border-accent/50 bg-accent-dim text-accent"
                    : "border-border bg-surface/60 text-muted hover:border-accent/30 hover:text-foreground"
                }`}
              >
                {filterLabels[item]}
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-6">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={0.04 * i}>
              {item.status === "soon" ? (
                <SoonCard />
              ) : (
                <CaseCard item={item} />
              )}
            </Reveal>
          ))}
        </div>

        <p
          id="cases-attribution"
          className="mt-8 text-xs leading-relaxed text-muted/80"
        >
          {casesAttribution}
        </p>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: CaseItem }) {
  const hasShots = Boolean(item.screenshots?.length);
  const hasDiagram =
    item.visual === "pipeline" ||
    item.visual === "etl" ||
    item.visual === "performance";

  return (
    <article className="overflow-hidden rounded-[12px] border border-border bg-surface transition-colors duration-200 hover:border-accent/25">
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 p-5 sm:p-7">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {item.title}
              {item.starred && (
                <a
                  href="#cases-attribution"
                  className="ml-0.5 text-muted no-underline hover:text-accent"
                  aria-label="Сноска об атрибуции"
                >
                  *
                </a>
              )}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 text-sm leading-relaxed sm:grid-cols-2 sm:gap-6">
            <Block label="Было" text={item.problem} />
            <Block label="Сделано" text={item.solution} />
          </div>

          <CaseResults results={item.results} className="sm:max-w-2xl" />
        </div>

        {hasShots && (
          <div className="border-t border-border bg-surface-raised/40 p-3 sm:p-5">
            <ScreenshotCarousel
              screenshots={item.screenshots!}
              chromeLabel="РТК · демо на тестовых данных"
            />
          </div>
        )}

        {hasDiagram && !hasShots && (
          <div className="border-t border-border bg-surface-raised/30 p-4 sm:p-6">
            {item.visual === "pipeline" ? (
              <PipelineVisual />
            ) : item.visual === "etl" ? (
              <EtlVisual />
            ) : (
              <PerformanceVisual />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function CaseResults({
  results,
  className = "",
}: {
  results: CaseItem["results"];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-3 gap-2 rounded-[10px] border border-border bg-background/50 p-3 sm:gap-3 ${className}`}
    >
      {results.map((r) => (
        <div key={r.label} className="flex min-h-[4.25rem] flex-col">
          <p className="flex min-h-[2.5rem] items-end font-mono text-sm font-semibold leading-snug text-accent sm:text-base">
            {r.value}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-muted">{r.label}</p>
        </div>
      ))}
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-accent">
        {label}
      </p>
      <p className="text-foreground/90">{text}</p>
    </div>
  );
}

function SoonCard() {
  return (
    <article className="flex min-h-[140px] flex-col items-start justify-center rounded-[12px] border border-dashed border-border bg-surface/60 p-6 sm:p-8">
      <span className="rounded-full border border-border bg-accent-dim px-3 py-1 font-mono text-xs text-accent">
        Скоро
      </span>
      <h3 className="mt-3 text-lg font-semibold text-foreground/80">
        Сквозная аналитика клиники
      </h3>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Кейс появится после подтверждения бренда и цифр клиентом.
      </p>
    </article>
  );
}
