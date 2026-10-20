# Design system

Source of truth: `src/styles/tokens.css`. Never write a raw colour or font in a component stylesheet; add a token instead.

## Concept

The construction grid behind the logo: hairline grid lines, corner brackets, a diamond geometry and one blue signal colour. The site commits to a single dark look.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--c-ink` | `#0a0a0b` | Page background, black sections |
| `--c-band` | `#17171a` | Alternating grey sections (`.section--alt`) |
| `--c-panel` / `--c-panel-2` | `#121214` / `#18181b` | Cards; lightened inside grey sections |
| `--c-line` / `--c-line-2` | 8% / 16% white | Hairlines and borders |
| `--c-fg` | `#f5f5f4` | Primary text |
| `--c-fg-soft` | `#cfcfcc` | Long-form text |
| `--c-mute` / `--c-dim` | `#8d8d94` / `#5a5a61` | Secondary text, captions |
| `--c-signal` | `#3b82ff` | Buttons, active states, progress — keep to about 5% of the surface |
| `--c-danger` | `#ff6b6b` | Form errors only |

Sections alternate: hero (black) → about (grey) → programmes (black) → readiness (grey) → research (black) → solutions (grey) → contact (black).

## Type

| Role | Family | Token |
| --- | --- | --- |
| Display (headings) | Readex Pro | `--f-display` |
| Body (both languages) | IBM Plex Sans Arabic | `--f-body` |
| Data and labels | IBM Plex Mono | `--f-mono` |

Fonts load through `next/font/google` in the layout and are self-hosted by Next at build time. Headings use `text-wrap: balance`; body copy is kept near 60 characters per line.

## Layout

- Container: `.wrap`, max 1180 px, side gutter `max(16px, safe-area inset)`.
- Section rhythm: `.section` has 110 px vertical padding.
- Use logical properties (`inset-inline-start`, `padding-inline`, `border-inline-end`) so layouts mirror correctly between RTL and LTR. Direction-specific rules use `[dir="rtl"]`.

## Naming

Class names follow a light BEM style: block (`course-card`), element (`course-card__title`), modifier (`btn--primary`), state (`is-active`, `is-current`). One stylesheet per component area in `src/styles/components/`.

## Components

| Component | Class | Notes |
| --- | --- | --- |
| Button | `.btn`, `.btn--primary`, `.btn--sm` | Add `data-magnetic` for the pointer effect |
| Section heading | `SectionHead` | Eyebrow with signal rule, title, optional intro |
| Card | `.course-card` | Add `data-tilt` for 3D tilt |
| Chip | `.chip` | Hero "next programme" |
| Pill list | `.pill-list` | Short tags |
| Segmented control | `.segmented` | Readiness answers, `aria-pressed` drives the state |

## Motion

Five signature motions, no more: assembling mark, neural field, decode text, card tilt, magnetic buttons. Supporting motion: scroll reveal, count-up, timeline fill, marquee.

Rules:
1. The page is complete without JavaScript and before any animation.
2. Everything stops under `prefers-reduced-motion`.
3. Canvas work pauses when off-screen.
4. Durations: 0.2–0.4 s for UI feedback, ~1 s for reveals; easing `--ease-out`.

## Brand mark

Geometry lives in `src/components/brand/geometry.ts` and `public/brand/mark.svg`: a 348-unit square, 38-unit strokes, rotated 45°, core circle radius 65. It was traced from the original artwork; change both files together.
