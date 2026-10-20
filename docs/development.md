# Development guide

## Setup

```bash
nvm use            # Node 22
npm install
cp .env.example .env.local
npm run dev
```

## Before every commit

```bash
npm run check      # typecheck + tests
npm run build      # catches anything the checks miss
```

Add a line to `CHANGELOG.md` under **Unreleased** for any change a visitor or Omar would notice.

## Conventions

- **TypeScript strict.** No `any` in source files.
- **Server components by default.** Add `"use client"` only when a component needs state, effects or browser APIs, and pass it plain data.
- **Links:** build internal URLs with `localePath()` / `homeAnchor()` from `src/i18n/paths.ts`.
- **Text never lives in components.** Every visible string comes from `src/content/` through props.
- **Logic lives in `src/lib/` as pure functions** with a test in `tests/`.
- **Styles:** tokens only, logical properties, BEM-style class names (see [design-system.md](design-system.md)).
- **Accessibility:** every interactive element is a real `<button>` or `<a>`, has a visible focus state, and works by keyboard. Decorative SVGs get `aria-hidden`.
- **Comments** explain why, not what. Each file starts with a short comment saying what it is for.

## Common tasks

### Add a home-page section

1. Add its text to `SiteContent` in `src/content/types.ts`, then to `ar.ts` and `en.ts`.
2. Create `src/components/sections/NewSection.tsx` and `src/styles/components/new-section.css`.
3. Import the stylesheet in `src/app/[locale]/layout.tsx` and render the section in `src/app/[locale]/page.tsx`.
4. Give the `<section>` an `id`, add it to the header (`SECTION_IDS` in `SiteHeader.tsx`) if it should be linked, and to `SECTION_IDS` in `tests/content.test.ts` if the tour may point to it.

### Add a programme

Content only: add an entry to `programs.courses` in both `ar.ts` and `en.ts` with the same `slug`, and extend `CourseSlug` in `types.ts`. The detail page, sitemap and cards pick it up automatically.

### Add a language

Add the code to `locales` in `src/i18n/config.ts`, create `src/content/<code>.ts`, register it in `src/content/index.ts`, and extend `intlTagOf` and `directionOf`.

## Tests

`tests/*.test.ts` use Node's built-in test runner through `tsx`:

| File | Covers |
| --- | --- |
| `readiness.test.ts` | Score and level boundaries |
| `i18n.test.ts` | Locale validation and text direction |
| `paths.test.ts` | URL scheme: Arabic at the root, `/en`, old `/ar` redirects, language switch |
| `seo.test.ts` | Social preview metadata |
| `sessions.test.ts` | Next upcoming session, countdown maths |
| `format-and-leads.test.ts` | Arabic digits, Kuwait time zone, WhatsApp message |
| `content.test.ts` | Arabic/English parity and content integrity |

Planned: Playwright end-to-end tests and axe accessibility checks in CI (see the technical plan).

## Linting

ESLint is not configured yet, and `next.config.ts` skips linting during builds. Adding `eslint` + `eslint-config-next` with a flat config is the next tooling task.

## Known limits of the initial build

The first version was written in an environment without npm registry access. It was verified by a strict TypeScript check against type stubs, the test suite above, and a static render of the real components with React 19 (no hydration errors, no horizontal overflow at 390 px and 1366 px). The first full `next build` runs on Vercel; fix anything it reports before launch.
