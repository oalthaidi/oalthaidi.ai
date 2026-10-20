# 0002. Content in typed files, CMS later

- Status: Accepted
- Date: 2026-10-20

## Context
The plan names Sanity as the content system. Wiring a CMS first would delay the front end and add accounts, schemas and webhooks before the content shape is settled.

## Decision
Keep all text in `src/content/ar.ts` and `src/content/en.ts`, typed by `SiteContent`. Pages read content only through `getContent(locale)`.

## Consequences
- A missing translation fails the type check; content tests guard the rest.
- Omar can edit through GitHub's web editor with a preview URL per change (see content-guide.md).
- Moving to Sanity later means reimplementing `getContent()` and keeping `SiteContent` as the schema, with no changes to components.
- Until then, editing requires a commit, which is acceptable at the current update rate.
