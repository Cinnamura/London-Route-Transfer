# London Route Transfers

**Сервис заказа трансферов в Лондоне** — многоязычное веб-приложение на Next.js с формой бронирования, панелью управления заказами и полным набором юридических страниц.

## Стек технологий

| Технология | Версия | Особенности |
|---|---|---|
| **Next.js** | 16.2.6 | App Router, Turbopack, конвенция `proxy.ts` |
| **React** | 19 | Server Components по умолчанию |
| **TypeScript** | 5 | Строгая типизация без `any` |
| **Tailwind CSS** | 4 | CSS-first конфигурация через `@theme`, без `tailwind.config.js` |
| **next-intl** | 4 | i18n маршрутизация (с/без префикса локали), typed-переводы |
| **React Hook Form** | — | Управление формой с производительной перерисовкой |
| **Zod** | 4.4.3 | Валидация форм через `zodResolver` |
| **NestJS** | 11 | Backend API для бронирований (в `backend/`) |
| **class-validator** | — | Валидация DTO на backend |

## Установка и запуск

```bash
# Клонирование
git clone <repository-url>
cd london-route-transfers

# Установка зависимостей
npm install
cd backend && npm install && cd ..

# Режим разработки (два терминала)

# Терминал 1 — Backend (NestJS, порт 4000)
cd backend && npm run start:dev

# Терминал 2 — Frontend (Next.js, порт 3000)
npm run dev

# Продакшн-сборка
npm run build
cd backend && npm run build && cd ..

# Запуск продакшн-серверов
# Терминал 1
cd backend && npm run start
# Терминал 2
npm run start
```

## Архитектурные решения

### Разделение формы и валидации
Схема Zod вынесена в отдельный модуль `src/schemas/booking.ts` и использует фабрику `getBookingSchema(t)`, принимающую функцию перевода. Это позволяет получить локализованные сообщения об ошибках, не смешивая валидацию с JSX.

### i18n и переключение языков
- next-intl `defineRouting` настраивает маршрутизацию с префиксом локали (`/en/book`, `/ru/manager`)
- `proxy.ts` (Next.js 16 конвенция вместо `middleware.ts`) перехватывает запросы и определяет локаль
- Все строки интерфейса хранятся в `messages/{locale}.json` — никакого хардкода в компонентах

### Архитектура страниц
- Все страницы — Server Components по умолчанию
- Client Components используются только для интерактивных элементов (форма, переключатель языка, карусель услуг, панель менеджера)
- `params` — всегда Promise (Next.js 16), требуется `await params`
