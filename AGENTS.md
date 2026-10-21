# AGENTS GUIDE — danyushin.ru

Короткий гайд для агентской доработки проекта.

## 1) Контент и факты

- Не придумывать цифры и кейсы.
- Источник правды: `content/copy.ts`, `content/cases.ts` и брифы в корне.
- Если данных не хватает — оставить явный placeholder/TODO в UI или тексте.

## 2) UI/UX принципы

- Тёмная тема, аккуратная типографика, высокий контраст CTA и trust-блоков.
- Без «технических» фраз в публичном UI (`TODO`, внутренние пометки и т.п.).
- Мобильный UX обязателен: кликабельные зоны >= 44px, корректный свайп/скролл.

## 3) Форма лидов (критично)

- Endpoint: `app/api/contact/route.ts`.
- Основной канал: SMTP (обязателен).
- Доп. канал: Telegram (не должен ломать успешную отправку формы).
- При поломке SMTP — возвращать ошибку клиенту (не фейковый success).

## 4) GitHub Pages (статический превью)

- Workflow: `.github/workflows/deploy-pages.yml` (push в `main`).
- URL: `https://summertime-fms.github.io/dan/` (`NEXT_PUBLIC_BASE_PATH=/dan`).
- Сборка: `output: export` при `GITHUB_PAGES=true`; папка `app/api` удаляется в CI (API на Pages нет).
- Форма на Pages шлёт заявки на `https://danyushin.ru/api/contact` (нужен CORS + деплой API на VPS).
- В настройках репозитория: **Settings → Pages → Build and deployment → GitHub Actions**.

## 5) Прод-архитектура

- App server: `79.174.90.215` (PM2 + Nginx + Let's Encrypt).
- Proxy server: `195.135.253.101` (туннели для SMTP/TG при блокировках).
- Deploy script: `/var/www/dan/deploy.sh`.
- PM2 app: `dan`.

## 6) Проверки перед деплоем

Локально:

```bash
npx tsc --noEmit
npm run build
```

На сервере после деплоя:

```bash
pm2 status
curl -I https://danyushin.ru
```

Проверка формы:

- Отправить тестовую заявку через `POST /api/contact`.
- Убедиться, что письмо пришло и (если включено) Telegram-уведомление доставлено.

## 7) Безопасность

- Не хранить секреты в git.
- Секреты только в env на сервере/PM2.
- Если секрет случайно попал в историю чата или код — ротировать сразу.

