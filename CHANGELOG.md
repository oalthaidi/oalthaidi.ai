# Changelog

All notable changes to this project. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); dates are Kuwait time.

## [Unreleased]

### Changed (phones)
- Phone header (≤860 px) uses Apple's 44 px touch size: mark and social icons 44 px with 22 px glyphs, language switch 16 px. The written name is hidden there and the booking button hides below 600 px. Steps down to 40 px below 375 px and 36 px below 340 px.

### Added
- Social icons (WhatsApp, email, Instagram, TikTok, YouTube) in the header and footer: white on black, inverted on hover. Icons from `react-icons` (Font Awesome 6); profiles in `src/config/site.ts`.

### Changed
- Programme names aligned with Global Training: «المعلم الناجح في زمن الذكاء الاصطناعي» and «ضاعف كفاءتك في عصر الذكاء الاصطناعي». The teacher programme slug is now `successful-teacher`; old `creative-teacher` links redirect permanently.
- Session times corrected to 5:00–8:30 pm Kuwait time (from the institute's pages), shown on programme pages; format mentions the one-day online cohort and Global Training attendance certificate.
- Registration call to action renamed to «احجز مقعد» / “Book a seat”. Fees are intentionally not shown.
- Arabic is now the root of the site (`oalthaidi.com`, `/programs/…`); English stays under `/en`. Old `/ar` links redirect permanently. Browser-language redirect removed; visitors switch with the EN link ([ADR 0008](docs/decisions/0008-arabic-at-root.md)).
- Production domain set to `oalthaidi.com`; deployment guide updated for GoDaddy DNS.
- English surname corrected to **Al-Thaidi** across the site, metadata and docs; portrait file renamed to `omar-althaidi.jpg`.

### Fixed
- No preview card when sharing the bare domain in WhatsApp: link-preview crawlers now get the Arabic page directly at `/` instead of a redirect, every page sets `og:url`, and previews use a 1200×630 card (`public/images/og-card.jpg`) with `summary_large_image` for X.
- Canonical links, sitemap and social-card URLs pointed to `localhost:3000` on Vercel. The site URL now falls back to Vercel's production URL when `NEXT_PUBLIC_SITE_URL` is not set.

### To do before launch
- Review every `REVIEW` comment in `src/content/ar.ts` and `src/content/en.ts`.
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
