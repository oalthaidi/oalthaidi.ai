# Deployment

The site deploys to **Vercel** from GitHub. Every push to `main` goes to production; every pull request gets its own preview URL.

## First-time setup

1. Create a Vercel account with Omar's email, then **Add New → Project → Import** this GitHub repository.
2. Framework preset: **Next.js** (auto-detected). Leave build and output settings at their defaults.
3. Environment variables (Production and Preview):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-domain>`. Optional until the domain exists: without it the site uses Vercel's production URL automatically. |

4. Deploy. The first build is the first full `next build` of this project; check the build log.
5. Plan: Vercel's free Hobby plan is for non-commercial use only. Switch to **Pro** before the site is used commercially.

## Custom domain

1. Buy the domain (Cloudflare Registrar recommended; see the technical plan).
2. Vercel → Project → Settings → Domains → add the domain and `www`.
3. Add the DNS records Vercel shows. With Cloudflare DNS, set the records to **DNS only** at first, confirm the site works, then decide on proxying.
4. Update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Branch workflow

```
feature branch ──► pull request ──► preview URL (review here) ──► merge to main ──► production
```

Protect `main` in GitHub (Settings → Branches) so changes arrive through pull requests with passing checks.

## Rollback

Vercel → Project → Deployments → pick the last good deployment → **Promote to Production**. This takes seconds and needs no code change. Then fix forward on a branch.

## After each production deploy

- Open `/ar` and `/en` on a phone.
- Open `/ar/programs/double-your-efficiency` and check the dates.
- Check `/sitemap.xml` uses the real domain.
