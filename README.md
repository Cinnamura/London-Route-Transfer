# London Route Transfers

**Сервис заказа трансферов в Лондоне** — многоязычное веб-приложение на Next.js с формой бронирования, панелью управления заказами и полным набором юридических страниц.

## Стек технологий

| Технология | Версия | Особенности |
|---|---|---|
| **Next.js** | 16.2.6 | App Router, Turbopack, новая конвенция `proxy.ts` (вместо `middleware.ts`) |
| **React** | 19 | Server Components по умолчанию |
| **TypeScript** | 5 | Строгая типизация без `any` |
| **Tailwind CSS** | 4 | CSS-first конфигурация через `@theme`, без `tailwind.config.js` |
| **next-intl** | 4 | i18n маршрутизация (с/без префикса локали), typed-переводы |
| **React Hook Form** | — | Управление формой с производительной перерисовкой |
| **Zod** | 4.4.3 | Валидация форм через `zodResolver` |

## Структура проекта

```
london-route-transfers/
├── messages/                    # Файлы локализации (en, ru)
│   ├── en.json
│   └── ru.json
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Пасс-тру корень (без <html>/<body>)
│   │   ├── favicon.ico
│   │   └── [locale]/
│   │       ├── layout.tsx       # Корневой лэйаут: <html>, <body>, шрифты, Header, Footer
│   │       ├── globals.css      # Токены @theme, анимации, smooth scroll
│   │       ├── page.tsx         # Лендинг (Hero + About + Services + Benefits)
│   │       ├── book/
│   │       │   ├── layout.tsx   # Метаданные страницы бронирования
│   │       │   └── page.tsx     # Форма бронирования (Client Component)
│   │       ├── manager/
│   │       │   └── page.tsx     # Панель менеджера (Client Component)
│   │       ├── privacy/
│   │       │   └── page.tsx     # Политика конфиденциальности
│   │       ├── terms/
│   │       │   └── page.tsx     # Условия использования
│   │       ├── cookies/
│   │       │   └── page.tsx     # Политика cookie
│   │       └── services-terms/
│   │           └── page.tsx     # Условия предоставления услуг
│   ├── components/
│   │   ├── Header.tsx           # Server Component (навигация, логотип)
│   │   ├── Footer.tsx           # Server Component (реквизиты, ссылки на политики)
│   │   ├── LocaleSwitcher.tsx   # Client Component (переключатель en/ru)
│   │   ├── HeroSection.tsx      # Client Component (параллакс + градиент)
│   │   └── ServicesShowcase.tsx # Client Component (Editorial Split Showcase)
│   ├── i18n/
│   │   ├── routing.ts           # defineRouting (locales, defaultLocale)
│   │   ├── request.ts           # getRequestConfig (динамическая загрузка messages)
│   │   ├── navigation.ts        # createNavigation (Link, redirect, usePathname)
│   │   └── global.ts            # Типизация Messages
│   ├── schemas/
│   │   └── booking.ts           # Zod-схема бронирования (getBookingSchema)
│   ├── mocks/
│   │   └── bookings.ts          # 5 мок-бронирований для панели менеджера
│   ├── proxy.ts                 # next-intl middleware (export function proxy)
│   └── ...
├── next.config.ts               # withNextIntl плагин
├── eslint.config.mjs            # ESLint flat config
├── AGENTS.md                    # Правила и конвенции проекта
└── README.md
```

## Установка и запуск

```bash
# Клонирование
git clone <repository-url>
cd london-route-transfers

# Установка зависимостей
npm install

# Режим разработки (Turbopack)
npm run dev

# Продакшн-сборка
npm run build

# Запуск продакшн-сервера
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
