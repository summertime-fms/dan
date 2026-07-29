import { site } from "@/content/copy";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold">{site.name}</p>
          <p className="mt-1 text-xs text-muted">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            {site.telegramHandle}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            {site.email}
          </a>
          <span className="font-mono text-xs">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
