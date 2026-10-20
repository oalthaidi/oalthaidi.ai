# 0001. Next.js App Router with TypeScript

- Status: Accepted
- Date: 2026-10-20

## Context
Phase 1 is a fast, mostly static bilingual site. Phase 2 adds booking, accounts and payments. The technical plan asks for one foundation that serves both without a rewrite.

## Decision
Use Next.js 15 (App Router) with React 19 and strict TypeScript, deployed on Vercel.

## Consequences
- Pages are statically generated today and can become dynamic per route later (server actions, route handlers).
- Server components keep JavaScript off pages that do not need it.
- Next.js 15 passes `params` as a Promise; every page and layout awaits it.
- Ties hosting most naturally to Vercel; other Node hosts remain possible.
