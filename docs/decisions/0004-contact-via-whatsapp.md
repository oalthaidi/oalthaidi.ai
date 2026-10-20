# 0004. Contact form sends via WhatsApp until the backend phase

- Status: Accepted
- Date: 2026-10-20

## Context
Phase 1 has no database or email service, but the contact form must work on launch day. WhatsApp is the channel Omar's audience in Kuwait already uses.

## Decision
The form validates input, composes a message (`composeLeadMessage()` in `src/lib/leads.ts`) and opens `wa.me` with it. The site stores nothing.

## Consequences
- Works with no backend, no secrets and no privacy exposure for the site.
- Leads are not captured centrally and cannot be counted; the visitor must press send in WhatsApp.
- Phase 2 replaces the submit handler with a server action that writes to Supabase and notifies by email, keeping WhatsApp as a secondary option.
