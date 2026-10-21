import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  contact?: string;
  task?: string;
  message?: string;
};

const defaultCorsOrigins = ["https://summertime-fms.github.io"];

function allowedCorsOrigins() {
  const fromEnv = process.env.CONTACT_CORS_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return fromEnv?.length ? fromEnv : defaultCorsOrigins;
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {};
  const allowed = allowedCorsOrigins();
  if (!allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: Request) {
  const headers = corsHeaders(request.headers.get("origin"));
  if (!headers["Access-Control-Allow-Origin"]) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 204, headers });
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function notifyTelegram(payload: {
  name: string;
  contact: string;
  task: string;
  message?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const baseUrl = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";

  if (!token || !chatId) {
    console.warn("[contact] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set");
    return { sent: false as const, reason: "missing_env" };
  }

  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(payload.name)}`,
    `<b>Контакт:</b> ${escapeHtml(payload.contact)}`,
    `<b>Задача:</b> ${escapeHtml(payload.task)}`,
  ];
  if (payload.message) {
    lines.push(`<b>Комментарий:</b> ${escapeHtml(payload.message)}`);
  }
  lines.push(
    `<b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} (МСК)`,
  );

  const res = await fetch(`${baseUrl}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[contact] telegram error", res.status, body);
    return { sent: false as const, reason: "telegram_api" };
  }

  return { sent: true as const };
}

async function sendLeadEmail(payload: {
  name: string;
  contact: string;
  task: string;
  message?: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || user;
  const tlsServername = process.env.SMTP_TLS_SERVERNAME || host;

  if (!host || !user || !pass || !to) {
    throw new Error("SMTP environment is not configured");
  }

  const transporter = createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
      servername: tlsServername,
    },
  });

  const subject = `Новая заявка с сайта — ${payload.name}`;
  const textLines = [
    "Новая заявка с сайта",
    "",
    `Имя: ${payload.name}`,
    `Контакт: ${payload.contact}`,
    `Задача: ${payload.task}`,
    payload.message ? `Комментарий: ${payload.message}` : "",
    `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} (МСК)`,
  ].filter(Boolean);

  const htmlLines = [
    "<h2>Новая заявка с сайта</h2>",
    `<p><b>Имя:</b> ${escapeHtml(payload.name)}</p>`,
    `<p><b>Контакт:</b> ${escapeHtml(payload.contact)}</p>`,
    `<p><b>Задача:</b> ${escapeHtml(payload.task)}</p>`,
    payload.message
      ? `<p><b>Комментарий:</b> ${escapeHtml(payload.message)}</p>`
      : "",
    `<p><b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} (МСК)</p>`,
  ].filter(Boolean);

  await transporter.sendMail({
    from: `"Заявки danyushin.ru" <${user}>`,
    to,
    subject,
    text: textLines.join("\n"),
    html: htmlLines.join("\n"),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);

  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректный JSON" },
      { status: 400, headers: cors },
    );
  }

  const name = body.name?.trim();
  const contact = body.contact?.trim();
  const task = body.task?.trim();
  const message = body.message?.trim() || "";

  if (!name || !contact || !task) {
    return NextResponse.json(
      { error: "Заполните все обязательные поля" },
      { status: 400, headers: cors },
    );
  }

  console.info("[contact]", {
    name,
    contact,
    task,
    message: message || null,
    at: new Date().toISOString(),
  });

  try {
    await sendLeadEmail({ name, contact, task, message: message || undefined });
  } catch (err) {
    console.error("[contact] smtp send failed", err);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте еще раз." },
      { status: 502, headers: cors },
    );
  }

  // Доп. канал: не блокирует успешную заявку при сбое Telegram.
  try {
    await notifyTelegram({ name, contact, task, message: message || undefined });
  } catch (err) {
    console.error("[contact] telegram notify failed", err);
  }

  return NextResponse.json({ ok: true }, { headers: cors });
}
