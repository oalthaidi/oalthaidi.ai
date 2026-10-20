# 0005. Baseline security headers now, full CSP in phase 2

- Status: Accepted
- Date: 2026-10-20

## Context
A strict Content-Security-Policy with Next.js needs per-request nonces, which forces dynamic rendering and interacts with fonts, analytics and future payment scripts. Phase 1 serves static pages with no user data.

## Decision
Send `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy` and a restrictive `Permissions-Policy` from `next.config.ts`. HTTPS and HSTS come from Vercel. Add a nonce-based CSP in phase 2 together with payments.

## Consequences
- Clickjacking and MIME sniffing are covered today.
- Script-injection protection relies on React's escaping and the absence of user-generated HTML until the CSP lands.
