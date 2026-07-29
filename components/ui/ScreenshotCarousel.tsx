"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CaseScreenshot } from "@/content/cases";

function tallestScreenshot(screenshots: CaseScreenshot[]) {
  return screenshots.reduce((best, shot) =>
    shot.height / shot.width > best.height / best.width ? shot : best,
  );
}

export function ScreenshotCarousel({
  screenshots,
  chromeLabel = "demo · тестовые данные",
}: {
  screenshots: CaseScreenshot[];
  chromeLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const current = screenshots[index] ?? screenshots[0];
  const frame = useMemo(() => tallestScreenshot(screenshots), [screenshots]);

  if (!current) return null;

  function prev() {
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }

  function next() {
    setIndex((i) => (i + 1) % screenshots.length);
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] text-muted">
          {chromeLabel} · {current.label}
        </span>
      </div>

      <div
        className="relative w-full bg-[#f4f6f8]"
        style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
      >
        {screenshots.map((shot, i) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            className={`absolute inset-0 h-full w-full object-contain object-top transition-opacity duration-200 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority={i === 0}
          />
        ))}
      </div>

      {screenshots.length > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2.5">
          <button
            type="button"
            onClick={prev}
            className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent/40 hover:text-accent"
            aria-label="Предыдущий скриншот"
          >
            ←
          </button>
          <div className="flex items-center gap-1.5">
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={shot.label}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-muted/50 hover:bg-muted"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent/40 hover:text-accent"
            aria-label="Следующий скриншот"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
