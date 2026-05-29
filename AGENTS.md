<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# LONDON ROUTE TRANSFERS — Project Guide

## Stack (verified)

- **Next.js 16.2.6** (App Router, Turbopack default)
- **React 19**, **TypeScript 5**
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- **next-intl 4** (i18n)
- **react-hook-form** + **zod**

## Critical Next.js 16 differences

- i18n routing is in **`src/middleware.ts`** using `next-intl/middleware` (see [next-intl docs](https://next-intl.dev/docs/routing/middleware))
- `next lint` **removed** — use ESLint directly
- All `params` are **Promises** — must `await params` in every page/layout/metadata
- Only the root layout at `app/[locale]/layout.tsx` contains `<html>` / `<body>`
- `app/layout.tsx` is a minimal pass-through (`return children`)

## Architecture

```
src/
  i18n/
    routing.ts        ← defineRouting({ locales, defaultLocale })
    request.ts        ← getRequestConfig (loads messages)
    navigation.ts     ← createNavigation (Link, useRouter, etc.)
    global.ts         ← type augmentation for Messages
  app/[locale]/
    layout.tsx        ← root layout: fonts, NextIntlClientProvider, Header, Footer
    page.tsx          ← home
    book/             ← booking form (Step 2)
    manager/          ← mock bookings panel (Step 3)
    privacy/          ← stub
    cookies/          ← stub
    terms/            ← stub
    services-terms/   ← stub
  components/
    Header.tsx        ← Server Component, uses getTranslations
    Footer.tsx        ← Server Component, uses getTranslations
    LocaleSwitcher.tsx ← Client Component
  schemas/
    booking.ts        ← Zod schema (Step 2)
  mocks/
    bookings.ts       ← typed mock data (Step 3)
messages/
  en.json             ← English locale
  ru.json             ← Russian locale
src/middleware.ts      ← next-intl createMiddleware for locale routing
next.config.ts        ← withNextIntl plugin
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint (via eslint.config.mjs) |

## Design system (Tailwind v4 @theme)

- **Fonts**: `font-serif` (Playfair Display for headings), `font-sans` (Geist for body)
- **Colors**: `slate-900`/`slate-600` text, `sky-500`/`sky-600` interactive, `emerald-500`/`emerald-600` CTAs
- **Glassmorphism**: `bg-white/70 backdrop-blur-md border border-white/40`
- **Container**: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- **Card grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- **Custom tokens** in `src/app/[locale]/globals.css` using `@theme {}` block
- **No dark mode** — light-only premium design

## Conventions

- All pages are **Server Components** unless they need interactivity (form, locale switcher, filters)
- Interface strings go in `messages/{locale}.json` — no hardcoding
- `metadata` uses `generateMetadata` with `await params` for locale-aware SEO
- Stub pages use `getTranslations('Stub')` — replace with real content later
- Form validation schema lives in `src/schemas/booking.ts` (separate from JSX)
- Mock data lives in `src/mocks/bookings.ts` with `BookingManagerItem` interface
- Build before committing: `npm run build` must pass

## Files from requirements (do not delete)

- `02-next-transfer-booking.md` — full task spec
- `02-transfer-client-content.md` — client text for all content blocks
