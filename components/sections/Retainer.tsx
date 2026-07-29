import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { retainer } from "@/content/copy";

export function Retainer() {
  return (
    <section id="retainer" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Формат
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {retainer.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {retainer.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-[12px] border border-accent/25 bg-gradient-to-br from-accent-dim to-surface p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Ежемесячный retainer</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {retainer.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-base text-accent sm:text-lg">
              {retainer.priceAnchor}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {retainer.comparison}
            </p>
            <p className="mt-2 text-sm text-muted">{retainer.note}</p>

            <div className="mt-6">
              <LinkButton href="#contact" size="lg">
                Свяжитесь с нами
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
