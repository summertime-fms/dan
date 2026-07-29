import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/copy";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Услуги
          </p>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            {services.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {services.lead}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <article className="group h-full rounded-[12px] border border-border bg-surface p-5 transition-all duration-200 hover:border-accent/35 hover:bg-surface-raised">
                <span className="font-mono text-[10px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
