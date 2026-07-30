# danyushin.ru — Личный сайт

Одностраничный сайт Михаила Данюшина: позиционирование как Fractional AI-инженера и оркестратора IT-процессов.

## Текущий стек

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion
- Nodemailer (SMTP-доставка лидов)

## Что уже сделано

- Реализована структура лендинга по брифу: hero, подход, услуги, кейсы, путь/карьера, формат, контакты.
- В кейсе РТК подключены реальные скриншоты с каруселью.
- На мобильных работает свайп по слайдеру; есть lightbox для просмотра скриншотов.
- Форма заявок приведена к короткому UX-сценарию (имя, контакт, задача, optional comment).
- Основной канал лидов: SMTP (Яндекс), fallback-уведомление: Telegram bot API.
- Прод-деплой на VPS (PM2 + Nginx), домен `danyushin.ru`, HTTPS через Let's Encrypt.
- Прямой SMTP из РФ-сервера обойден туннелем через proxy VPS.

## Что пока не закрыто / ограничения

- Telegram-уведомления зависят от доступности прокси-туннеля.
- В логах есть посторонние ошибки Server Actions от внешних скриптов/ботов; на работу формы не влияют, но стоит отдельно почистить.
- Полноценная CRM/таблица лидов не подключена (сейчас email + Telegram).
- Не настроена канонизация `www -> non-www` или наоборот как отдельное бизнес-решение.
- Нет staging-среды.

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Переменные окружения

Скопируйте `.env.example` в `.env.local` (локально) или задайте env в PM2 (прод).

Ключевые переменные:

- `NEXT_PUBLIC_CAL_URL` — ссылка на календарь
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `SMTP_TLS_SERVERNAME`
- `CONTACT_TO_EMAIL`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- `TELEGRAM_API_BASE` (по умолчанию `https://api.telegram.org`)

## Прод-операции

- Обновить прод:
  - `ssh root@79.174.90.215`
  - `/var/www/dan/deploy.sh`
- Проверка процесса:
  - `pm2 status`
  - `pm2 logs dan --lines 100`
- Проверка nginx:
  - `nginx -t && systemctl reload nginx`

## Источники контента

- `content/copy.ts` — тексты секций
- `content/cases.ts` — кейсы и метрики
- Бриф-документы в корне (`*.docx`) — единственный source of truth по фактам

