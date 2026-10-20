# 0003. No i18n or animation libraries

- Status: Accepted
- Date: 2026-10-20

## Context
The plan listed next-intl, Tailwind and GSAP. The site has two locales, one dictionary per locale and a handful of motion effects, all already proven in plain JavaScript in the approved demo. The first build was also written without npm registry access, so every dependency was an unverifiable risk.

## Decision
Runtime dependencies are only `next`, `react` and `react-dom`. Locale routing is a 20-line middleware plus `src/i18n/config.ts`. Motion is plain TypeScript in `src/components/motion/`.

## Consequences
- Fewer upgrades, smaller bundles, no library API churn.
- We maintain locale detection and motion code ourselves; both are covered by tests or small enough to read in one sitting.
- Revisit if the site needs pluralisation rules, many locales, or complex timeline animation.
