# 0008. Arabic at the root, English under `/en`

- Status: Accepted
- Date: 2026-10-20

## Context
The site launched with every page under `/ar` or `/en` and a redirect from `/` based on the browser language. Omar wants Arabic to be the identity of the site: `oalthaidi.com` should be the Arabic site with no `/ar` in any link, and English should stay at `/en`.

## Decision
- Arabic pages are served at the root (`/`, `/programs/…`, `/privacy`). The middleware rewrites them internally to `/ar/…`, so the app keeps one `[locale]` route tree.
- English stays under `/en/…`.
- Old `/ar/…` links get a permanent (308) redirect to the root form.
- No automatic language detection and no "English available" banner: the header's EN link is enough (Omar's decision).
- All internal links go through `localePath()` and `homeAnchor()` in `src/i18n/paths.ts`; `paths.test.ts` covers the scheme.

## Consequences
- Shorter, cleaner Arabic URLs for sharing; search engines get correct `hreflang` with `x-default` pointing to the root.
- Visitors whose browser is in English land on the Arabic page and switch manually.
- `usePathname()` can return either form around the rewrite, so components use `splitPathname()`, which accepts both.
- Supersedes the language-detection part of the original middleware and the crawler special case added for link previews (every crawler now gets a page at `/` directly).
