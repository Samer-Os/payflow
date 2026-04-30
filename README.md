<p align="center">
  <img src="public/readme/hero.png" alt="Payflow hero screenshot" width="100%" />
</p>

# Payflow — Payment Infrastructure for Developers

> Embed powerful payment APIs into your product. Build in days, launch in weeks.

[![Live Demo](https://img.shields.io/badge/demo-live-4f46e5?style=for-the-badge)](https://payflow.vercel.app)
[![CI](https://github.com/Samer-Os/payflow/actions/workflows/ci.yml/badge.svg)](https://github.com/Samer-Os/payflow/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## Stack

| Technology | Rationale |
|---|---|
| **Next.js 15** | App Router for streaming, RSC, and file-based routing |
| **React 19** | Latest concurrent features & server components |
| **TypeScript** | End-to-end type safety across components and i18n |
| **Tailwind CSS v4** | Utility-first styling with CSS-native `@theme` tokens |
| **Framer Motion** | Declarative animation API with `whileInView` triggers |
| **next-themes** | Zero-flash dark mode toggle via class strategy |
| **Iconify** | 200k+ icons, tree-shaken per use |
| **NextAuth.js** | Credential + social auth scaffolding |

## Features

- **i18n** — Full English / Turkish support via a custom React context (`context/LanguageContext`)
- **Dark mode** — System-aware, toggleable, zero-FOUC
- **Responsive** — Mobile-first grid layouts from 320px to 2xl
- **Animated** — Staggered reveal, count-up, scale & fade transitions on every section
- **Accessible** — Native `<dialog>` modals, skip-to-content, focus-visible rings, WCAG AA contrast
- **Type-safe** — Strict TypeScript, no `any` leaks in public APIs

## Lighthouse Scores

<p align="center">
  <img src="public/readme/lighthouse.png" alt="Lighthouse desktop scores: Performance 89, Accessibility 95, Best Practices 100, SEO 100" width="640" />
</p>

Measured via `lighthouse --preset=desktop` against the production build (`npm run build && npm run start`). Performance varies between **85–95** depending on system load; Accessibility, Best Practices, and SEO are consistently **95+**.

**Core Web Vitals (desktop):**
- **LCP** — 1.0–1.3 s
- **CLS** — 0.015
- **TBT** — 50–80 ms

Reproduce locally:

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000 --preset=desktop --view
```

## Quality Gates

- **Accessibility** — Zero serious or critical [axe-core](https://github.com/dequelabs/axe-core) violations across WCAG 2.1 A & AA. Verified by `tests/e2e/a11y.spec.ts`.
- **End-to-end** — 6 Playwright smoke tests cover dialog focus management, language toggle, theme toggle, skip-to-content, and signup form. Run with `npm run test:e2e`.

## Architecture

```
src/
├── app/                    # Next.js App Router (pages, layout, API routes)
│   ├── (site)/             # Route group for public pages
│   ├── api/                # NextAuth + data endpoints
│   ├── context/            # AuthDialog context
│   └── layout.tsx          # Root layout (font, theme, providers)
├── components/
│   ├── Home/               # Section components (Hero, Benefit, Method, Pricing, FAQ…)
│   ├── Layout/             # Header, Footer, Logo
│   ├── Auth/               # SignIn, SignUp, SocialSignIn
│   └── Common/             # Loader, Breadcrumb, shared UI
├── context/
│   └── LanguageContext.tsx  # i18n provider with EN/TR dictionaries
├── locales/
│   ├── en.json             # English translations
│   └── tr.json             # Turkish translations
└── Style/                  # Additional utility CSS
```

## Design System

**Color tokens** — defined in [`src/app/globals.css`](src/app/globals.css) under `@theme`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#6366f1` | CTAs, links, accents |
| `midnight_text` | `#102d47` | Headings, body text (light) |
| `muted` | `#3d5a73` | Secondary text (WCAG AA compliant) |
| `heroBg` | `#f5f3ff` | Light hero/section backgrounds |
| `darkmode` | `#0d0b1a` | Dark mode body background |
| `border` | `#ede9fe` | Card & input borders (light) |

**Type scale** — 8 semantic tokens from `caption` (0.8125rem) to `display` (3.5rem), each with a tuned line-height.

**Spacing** — Tailwind's default 4px scale plus custom section tokens (`--spacing-50`, percentage-based widths).

## Local Development

```bash
# Clone
git clone https://github.com/Samer-Os/payflow.git
cd payflow

# Install
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

## Image Optimization

A one-off script converts PNGs over 100 KB to WebP:

```bash
node scripts/optimize-images.mjs
```

Originals are kept as fallback. Next.js serves AVIF/WebP automatically via `next.config.mjs`.

## What I'd Build Next

- **Analytics dashboard route** — Real-time charts using Recharts, pulling from a Postgres/Supabase backend
- **Real auth via Clerk or Supabase** — Replace the NextAuth credential stub with production-grade auth, including MFA
- **Transaction history page** — Filterable, paginated table with CSV export and date-range picker

## License

[MIT](LICENSE) — free for personal and commercial use.
