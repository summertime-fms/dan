import { Reveal } from "@/components/ui/Reveal";
import { career } from "@/content/copy";

export function Career() {
  return (
    <section id="path" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            История
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {career.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {career.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <ol className="relative space-y-0 border-l border-border pl-6">
            {career.items.map((item) => (
              <li key={item.title} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[1.55rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                <p className="font-mono text-[11px] text-accent">
                  {item.period}
                </p>
                <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-[12px] border border-border bg-surface-raised/50 p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Партнёр по инфраструктуре
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {career.partnerNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
