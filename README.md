# London Route Transfers

**Премиальный сервис заказа трансферов в Лондоне** — многоязычное веб-приложение на Next.js с формой бронирования, панелью управления заказами и полным набором юридических страниц.

## Ключевые фишки интерфейса

- **Эффект параллакса** — фоновое изображение London skyline с `opacity-30 blur-[2px]` и градиентной маской `via-white/40` для глубины
- **Editorial Split Showcase** — журнальный сплит-каталог услуг: на десктопе левая/правая панель (5 + 7 колонок) с переключением по наведению; на мобильных — аккордеон с анимацией `animate-fade-in`
- **Стеклянная морфология (Glassmorphism)** — все карточки, хедер, селектор языка и таблица менеджера используют `bg-white/60 backdrop-blur-md border border-white/40`
- **Интерактивная админка** — панель менеджера с фильтрацией по статусу, выпадающим списком для смены статуса и цветными бейджами (amber/sky/emerald/rose)

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

### Стеклянная морфология (Glassmorphism)
Единый паттерн `bg-white/60 backdrop-blur-md border border-white/40` применяется во всех карточках, создавая премиальный полупрозрачный эффект на градиентном фоне.

### Анимации
Кастомные анимации в `globals.css`: `fade-in`, `fade-out`, `slide-up-fade` — используются при переключении услуг в Editorial Showcase и при смене статуса формы.
