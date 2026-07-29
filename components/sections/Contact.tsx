"use client";

import { FormEvent, useState } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contact, site } from "@/content/copy";

type Status = "idle" | "loading" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const calHref = site.calUrl || undefined;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      contact: String(data.get("contact") || ""),
      task: String(data.get("task") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Не удалось отправить");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Контакты
          </p>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {contact.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="sm:flex-1"
          >
            {contact.tgLabel}
            <span className="font-mono text-xs font-normal opacity-80">
              {site.telegramHandle}
            </span>
          </LinkButton>

          {calHref && (
            <LinkButton
              href={calHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="sm:flex-1"
            >
              {contact.calLabel}
            </LinkButton>
          )}
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div
            id="contact-form"
            className="rounded-[12px] border border-border bg-surface p-5 sm:p-8"
          >
            <p className="text-sm text-muted">{contact.formLead}</p>

            <form onSubmit={onSubmit} className="mt-6 grid max-w-xl gap-4">
              <Field label="Имя" name="name" required autoComplete="name" />
              <Field
                label="Telegram / WhatsApp / Телефон"
                name="contact"
                required
                autoComplete="tel"
              />
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted">
                  Опишите кратко задачу или выберите из списка
                </span>
                <select
                  name="task"
                  required
                  defaultValue=""
                  className="rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/40"
                >
                  <option value="" disabled>
                    Выберите задачу
                  </option>
                  {contact.taskOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? "Отправка…" : "Отправить заявку"}
                </Button>
                {status === "ok" && (
                  <p className="text-sm text-accent">
                    Заявка принята. Свяжусь с вами.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/40"
      />
    </label>
  );
}
