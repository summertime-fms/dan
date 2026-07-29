import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  contact?: string;
  task?: string;
  message?: string;
};

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

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const contact = body.contact?.trim();
  const task = body.task?.trim();
  const message = body.message?.trim() || "";

  if (!name || !contact || !task) {
    return NextResponse.json(
      { error: "Заполните все обязательные поля" },
      { status: 400 },
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
    await notifyTelegram({ name, contact, task, message: message || undefined });
  } catch (err) {
    console.error("[contact] telegram notify failed", err);
  }

  return NextResponse.json({ ok: true });
}
