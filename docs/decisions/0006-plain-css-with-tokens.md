# 0006. Plain CSS with design tokens instead of Tailwind

- Status: Accepted
- Date: 2026-10-20

## Context
The approved demo already defines the full visual language in plain CSS. RTL/LTR mirroring needs logical properties throughout.

## Decision
Use global CSS split into `tokens.css`, `base.css` and one file per component area, imported in a fixed order by the root layout. Class names follow a light BEM style.

## Consequences
- The demo's styles port directly, and designers can read them.
- No build plugin or configuration to maintain.
- Global class names require discipline: one block name per component, documented in design-system.md.
- CSS for all sections loads on every page (about 30 KB uncompressed); acceptable now, revisit if pages multiply.
