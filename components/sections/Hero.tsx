import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { HeroOrchestration } from "@/components/ui/HeroOrchestration";
import { Reveal } from "@/components/ui/Reveal";
import { hero, site } from "@/content/copy";

export function Hero() {
  const diagnosticHref = site.calUrl || "#contact";

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="flex flex-col gap-6">
            <Badge pulse>{hero.badge}</Badge>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {hero.h1}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton href={diagnosticHref} size="lg">
                {hero.ctaPrimary}
              </LinkButton>
              <LinkButton href="#cases" variant="secondary" size="lg">
                {hero.ctaSecondary}
              </LinkButton>
            </div>

            <div className="border-t border-border pt-4">
              <p className="mb-2.5 text-[11px] uppercase tracking-[0.16em] text-muted">
                {hero.trustLabel}
              </p>
              <ul className="flex flex-wrap gap-2">
                {hero.trustClients.map((client) => (
                  <li
                    key={client}
                    className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground shadow-[inset_0_0_0_1px_rgba(0,229,255,0.08)]"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mx-auto w-full max-w-sm lg:max-w-none">
          <HeroOrchestration />
        </Reveal>
      </div>
    </section>
  );
}
