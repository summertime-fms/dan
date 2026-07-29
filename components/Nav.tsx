"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { nav, site } from "@/content/copy";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {site.name}
          </span>
          <span className="hidden text-[10px] text-muted sm:block">
            Fractional AI-инженер
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Основная">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            className="hidden sm:inline-flex"
          >
            Telegram
          </LinkButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-foreground md:hidden"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-lg leading-none" aria-hidden>
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-4 py-4 md:hidden"
          aria-label="Мобильная"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[10px] px-3 py-3 text-sm text-foreground hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <LinkButton
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Telegram {site.telegramHandle}
              </LinkButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
