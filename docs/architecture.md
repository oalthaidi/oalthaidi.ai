# Architecture

The site is a Next.js App Router application that renders almost everything on the server at build time. Client-side JavaScript is limited to interaction and motion.

## Request flow

```
Visitor ──► Cloudflare (DNS, protection; planned) ──► Vercel ──► middleware.ts
                                                                   │
                         path has /ar or /en? ── no ──► redirect to preferred locale
                                                                   │ yes
                                                                   ▼
                                               src/app/[locale]/… (static HTML)
                                                                   │
                                               hydrate client components only
```

1. `src/middleware.ts` makes sure every URL starts with a supported locale. It reads `Accept-Language` through `pickLocale()` and defaults to Arabic.
2. `src/app/[locale]/layout.tsx` sets `lang` and `dir`, loads fonts and styles, and renders the header, footer and page-wide effects.
3. Pages read text with `getContent(locale)` from `src/content/`. There is no runtime data source in phase 1, so every page is statically generated (`generateStaticParams`).

## Server and client components

| Kind | Where | Why |
| --- | --- | --- |
| Server (default) | Sections without interaction: About, Programs, Solutions, Contact shell, pages | Zero JavaScript shipped; content is in the HTML for SEO |
| Client (`"use client"`) | `SiteHeader`, `Readiness`, `Research`, `ContactForm`, `CopyButton`, `GuidedTour`, everything in `components/motion/` | Need state, events or browser APIs |

Client components receive only plain data (strings, numbers, arrays) as props.

**Progressive enhancement rule:** the server HTML is always complete and readable. Effects start from the final state and only animate after mount (for example, `CountUp` renders the real number, `DecodeText` renders the real name plus a screen-reader copy, reveal only hides elements below the fold).

## Page-wide effects

`components/motion/Enhancements.tsx` mounts once in the layout and wires effects to elements by data attribute, so sections can stay server components:

| Attribute | Effect | File |
| --- | --- | --- |
| `data-reveal` | Fade and rise on scroll, staggered | `effects/reveal.ts` |
| `data-magnetic` | Button leans toward the pointer | `effects/magnetic.ts` |
| `data-tilt` | 3D tilt and pointer glow | `effects/tilt.ts` |
| (always) | Background grid and cursor glow | `effects/cursorGlow.ts` |

All of them are skipped under `prefers-reduced-motion`; pointer effects also need a fine pointer.

## Content model

`src/content/types.ts` defines `SiteContent`. `ar.ts` and `en.ts` must both satisfy it, so a missing translation is a type error. `tests/content.test.ts` checks what types cannot: matching list lengths, identical session dates and links, valid tour targets, and no empty strings. See [content-guide.md](content-guide.md).

## Contact flow

Phase 1 has no database. `ContactForm` validates the name, builds a message with `composeLeadMessage()` and opens WhatsApp. Nothing is stored by the site. See [ADR 0004](decisions/0004-contact-via-whatsapp.md).

## Roadmap

| Phase | Adds | Architectural change |
| --- | --- | --- |
| 1 (this repo) | Personal site, bilingual | Static pages, no backend |
| 1.5 | Domain, analytics, Sanity CMS | Content moves from `src/content/*.ts` to Sanity behind the same `getContent()` interface; pages use incremental revalidation |
| 2 | Booking and KNET payments | Supabase (Postgres, auth), server actions, payment webhooks; full CSP |
| 3 | Solutions company | Separate site, shared design tokens and brand package |

Keeping `getContent()` as the only way pages read text is what makes the CMS move a local change.
