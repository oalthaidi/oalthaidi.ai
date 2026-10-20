# Changelog

All notable changes to this project. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); dates are Kuwait time.

## [Unreleased]

### To do before launch
- Review every `REVIEW` comment in `src/content/ar.ts` and `src/content/en.ts`.
- Confirm session start times (currently 18:00 Kuwait as a placeholder).
- Set `NEXT_PUBLIC_SITE_URL` once the domain is chosen.
- Lawyer review of the privacy policy.

## [0.1.0] — 2026-10-20

### Added
- Next.js 15 (App Router) project with TypeScript and Arabic/English routing under `/ar` and `/en`, with browser-language redirect.
- Home page sections ported from the approved interactive demo: hero, credentials strip, about and stats, programmes, readiness check, research timeline, enterprise roadmap, contact.
- Programme detail pages for the four programmes, with structured data (schema.org `Course`).
- Privacy policy page and localized 404 page.
- Vector brand mark traced from the original logo (`public/brand/mark.svg`) and favicon.
- Design tokens and component stylesheets; alternating black and grey sections.
- Motion: assembling mark, neural field, decode text, count-up numbers, 3D card tilt, magnetic buttons, scroll reveal, timeline progress. All respect reduced-motion settings.
- Contact form that composes a WhatsApp message (no data stored).
- Investor guided tour, shown only with `#tour`.
- SEO: metadata, hreflang alternates, sitemap, robots, `Person` structured data.
- Baseline security headers.
- Tests for scoring, locale detection, sessions, formatting, lead messages and content parity (24 tests).
- Documentation: README, architecture, design system, development, deployment, content guide, seven decision records.
