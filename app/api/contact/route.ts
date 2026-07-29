import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  contact?: string;
  task?: string;
};

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

  if (!name || !contact || !task) {
    return NextResponse.json(
      { error: "Заполните все обязательные поля" },
      { status: 400 },
    );
  }

  // Webhook / Telegram Bot / email — подключить позже
  console.info("[contact]", {
    name,
    contact,
    task,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
