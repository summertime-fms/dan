"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
  const [lightbox, setLightbox] = useState(false);
  const current = screenshots[index] ?? screenshots[0];
  const frame = useMemo(() => tallestScreenshot(screenshots), [screenshots]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  if (!current) return null;

  return (
    <>
      <div className="overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 flex-1 truncate rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] text-muted">
            {chromeLabel} · {current.label}
          </span>
        </div>

        <SwipeArea
          onSwipeLeft={next}
          onSwipeRight={prev}
          className="relative w-full cursor-zoom-in touch-pan-y bg-[#f4f6f8] select-none"
          style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
          onActivate={() => setLightbox(true)}
        >
          {screenshots.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              draggable={false}
              className={`pointer-events-none absolute inset-0 h-full w-full object-contain object-top transition-opacity duration-200 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 1152px"
              priority={i === 0}
            />
          ))}
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-black/10 bg-black/45 px-2 py-1 font-mono text-[10px] text-white/90 sm:hidden">
            свайп · тап для увеличения
          </span>
        </SwipeArea>

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
                    i === index
                      ? "w-4 bg-accent"
                      : "w-1.5 bg-muted/50 hover:bg-muted"
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

      {lightbox && (
        <Lightbox
          screenshots={screenshots}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setLightbox(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function SwipeArea({
  children,
  onSwipeLeft,
  onSwipeRight,
  onActivate,
  className = "",
  style,
}: {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onActivate?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const startX = useRef(0);
  const startY = useRef(0);
  const moved = useRef(false);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
    startY.current = e.clientY;
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) moved.current = true;
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
      return;
    }
    if (!moved.current && onActivate) onActivate();
  }

  return (
    <div
      role={onActivate ? "button" : undefined}
      tabIndex={onActivate ? 0 : undefined}
      className={className}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => {
        if (onActivate && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      {children}
    </div>
  );
}

function Lightbox({
  screenshots,
  index,
  onIndexChange,
  onClose,
  onPrev,
  onNext,
}: {
  screenshots: CaseScreenshot[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = screenshots[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/92"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр скриншота"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <p className="truncate font-mono text-xs text-white/70">
          {current.label}
          <span className="ml-2 text-white/40">
            {index + 1}/{screenshots.length}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/90"
          aria-label="Закрыть"
        >
          Закрыть
        </button>
      </div>

      <SwipeArea
        onSwipeLeft={onNext}
        onSwipeRight={onPrev}
        className="relative mx-auto flex min-h-0 w-full flex-1 touch-pan-y items-center justify-center px-2 pb-4 select-none"
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          draggable={false}
          className="pointer-events-none max-h-[min(85dvh,900px)] w-auto max-w-full object-contain"
          sizes="100vw"
          priority
        />
      </SwipeArea>

      {screenshots.length > 1 && (
        <div className="flex items-center justify-center gap-4 px-4 pb-6">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-md border border-white/20 px-3 py-2 text-white"
            aria-label="Предыдущий"
          >
            ←
          </button>
          <div className="flex gap-1.5">
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={shot.label}
                className={`h-1.5 rounded-full ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-white/35"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md border border-white/20 px-3 py-2 text-white"
            aria-label="Следующий"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
