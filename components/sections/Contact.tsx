"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contact, site } from "@/content/copy";

type Status = "idle" | "loading" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
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
      task,
      message: message.trim(),
    };

    if (!payload.task) {
      setStatus("error");
      setError("Выберите задачу");
      return;
    }

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
      setTask("");
      setMessage("");
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

              <TaskPicker
                value={task}
                onChange={setTask}
                options={contact.taskOptions}
              />

              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-muted">
                  Есть ещё что рассказать?{" "}
                  <span className="text-muted/70">(необязательно)</span>
                </span>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Контекст, сроки, что уже пробовали…"
                  className="resize-y rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/40"
                />
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

function TaskPicker({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative flex flex-col gap-1.5">
      <span className="text-xs text-muted">Задача</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[10px] border border-border bg-background px-3 py-2.5 text-left text-sm outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/40"
      >
        <span className={value ? "text-foreground" : "text-muted"}>
          {value || "Выберите задачу"}
        </span>
        <span
          className={`font-mono text-accent transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ↓
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+6px)] z-20 max-h-60 w-full overflow-auto rounded-[10px] border border-border bg-surface py-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        >
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={value === opt}>
              <button
                type="button"
                className={`flex min-h-[44px] w-full items-center px-3 py-2.5 text-left text-sm transition hover:bg-accent-dim hover:text-accent ${
                  value === opt ? "bg-accent-dim text-accent" : "text-foreground"
                }`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
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
        className="min-h-[44px] rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/40"
      />
    </label>
  );
}
