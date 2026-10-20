# Omar Al-Dhaidi Platform

Bilingual (Arabic / English) personal platform for **Eng. Omar Al-Dhaidi**, AI digital transformation consultant and accredited trainer in Kuwait.

> **بالعربية:** هذا مستودع موقع م. عمر الذايدي. لتعديل النصوص والدورات والمواعيد اقرأ [دليل المحتوى](docs/content-guide.md). بقية الوثائق موجهة للمطوّرين.

## Quick start

Requires Node.js 20.9 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /ar or /en
npm run check      # type-check + tests
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Production build (what Vercel runs) |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | TypeScript, no output files |
| `npm test` | Unit and content-integrity tests (`tests/`) |
| `npm run check` | Both of the above; run before every commit |

## What is in the site

- **Home** (`/ar`, `/en`): hero with the assembling mark and neural field, credentials strip, about and headline numbers, four programmes, AI readiness check, research timeline, enterprise roadmap, contact form.
- **Programme pages** (`/[locale]/programs/[slug]`): topics, outcomes, format, upcoming dates with registration links.
- **Privacy policy** (`/[locale]/privacy`).
- **Investor demo mode**: open any home page with `#tour` to show the guided tour.

## Project structure

```
├── docs/                     Documentation (start with architecture.md)
│   └── decisions/            Architecture Decision Records — one file per decision
├── public/                   Static files served as-is (portrait, brand mark)
├── src/
│   ├── app/                  Routes (Next.js App Router)
│   │   ├── [locale]/         Every page lives under /ar or /en
│   │   ├── icon.svg          Favicon
│   │   ├── robots.ts         robots.txt
│   │   └── sitemap.ts        sitemap.xml with hreflang alternates
│   ├── components/
│   │   ├── brand/            The mark: geometry, static and animated versions
│   │   ├── layout/           Header and footer
│   │   ├── motion/           Client-side effects (neural field, decode text, count-up…)
│   │   ├── sections/         One file per home-page section
│   │   ├── tour/             Investor guided tour
│   │   └── ui/               Small shared pieces (section heading, icons, copy button)
│   ├── config/site.ts        Contact details and site URL
│   ├── content/              ALL visible text: ar.ts, en.ts, types.ts
│   ├── i18n/config.ts        Supported locales and language detection
│   ├── lib/                  Pure logic with tests (scoring, dates, formatting)
│   ├── styles/               tokens.css → base.css → components/*.css
│   └── middleware.ts         Redirects / to the visitor's language
└── tests/                    node:test suites, run with tsx
```

**Rule of thumb:** each kind of change has one home. Text → `src/content/`. Colours and fonts → `src/styles/tokens.css`. Contact details → `src/config/site.ts`. Why something was built a certain way → `docs/decisions/`.

## Documentation

| Document | For whom | Contents |
| --- | --- | --- |
| [docs/content-guide.md](docs/content-guide.md) | Omar | Editing text, programmes, dates and numbers (Arabic) |
| [docs/architecture.md](docs/architecture.md) | Developers | How the parts fit, rendering model, data flow |
| [docs/design-system.md](docs/design-system.md) | Developers, designers | Tokens, type, components, motion rules |
| [docs/development.md](docs/development.md) | Developers | Conventions, testing, adding a page or section |
| [docs/deployment.md](docs/deployment.md) | Whoever deploys | Vercel setup, domain, rollback |
| [docs/decisions/](docs/decisions/) | Everyone | Why each major choice was made |
| [CHANGELOG.md](CHANGELOG.md) | Everyone | What changed and when |

## Status

Phase 1 front end. Not yet connected: domain, analytics, CMS, database. See [CHANGELOG.md](CHANGELOG.md) and the roadmap in [docs/architecture.md](docs/architecture.md#roadmap).

© Omar Al-Dhaidi. All rights reserved.
