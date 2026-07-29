import { Reveal } from "@/components/ui/Reveal";
import { approach } from "@/content/copy";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            О подходе
          </p>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            {approach.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {approach.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div
            className="flex flex-wrap items-center justify-center gap-2 rounded-[12px] border border-border bg-surface px-4 py-8 sm:gap-3 sm:px-8"
            aria-hidden={false}
            role="img"
            aria-label="Frontend, Backend, DevOps и AI Agents собираются в работающий продукт"
          >
            {approach.stack.map((item, i) => (
              <div key={item} className="flex items-center gap-2 sm:gap-3">
                <span className="select-none rounded-md border border-white/10 bg-surface-raised px-3 py-2 font-mono text-xs text-foreground/85 sm:px-3.5 sm:text-sm">
                  {item}
                </span>
                {i < approach.stack.length - 1 && (
                  <span className="select-none text-muted/60" aria-hidden>
                    +
                  </span>
                )}
              </div>
            ))}
            <span className="mx-1 select-none text-muted/60" aria-hidden>
              →
            </span>
            <span className="select-none rounded-md border border-accent/20 bg-accent-dim px-3 py-2 text-xs font-semibold text-accent sm:px-3.5 sm:text-sm">
              Работающий продукт
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal delay={0.1}>
            <ContrastCard
              title={approach.usual.title}
              points={approach.usual.points}
              tone="muted"
            />
          </Reveal>
          <Reveal delay={0.16}>
            <ContrastCard
              title={approach.mine.title}
              points={approach.mine.points}
              tone="accent"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContrastCard({
  title,
  points,
  tone,
}: {
  title: string;
  points: readonly string[];
  tone: "muted" | "accent";
}) {
  const accented = tone === "accent";
  return (
    <div
      className={`h-full rounded-[12px] border p-6 ${
        accented
          ? "border-accent/30 bg-accent-dim"
          : "border-border bg-surface"
      }`}
    >
      <h3
        className={`text-lg font-semibold ${accented ? "text-accent" : "text-muted"}`}
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                accented ? "bg-accent" : "bg-muted"
              }`}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
