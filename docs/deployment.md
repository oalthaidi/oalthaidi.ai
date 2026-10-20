# Deployment

The site deploys to **Vercel** from GitHub. Every push to `main` goes to production; every pull request gets its own preview URL.

## First-time setup

1. Create a Vercel account with Omar's email, then **Add New → Project → Import** this GitHub repository.
2. Framework preset: **Next.js** (auto-detected). Leave build and output settings at their defaults.
3. Environment variables (Production and Preview):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-domain>`. Optional: without it the site uses the project's production domain automatically. |

4. Deploy. The first build is the first full `next build` of this project; check the build log.
5. Plan: Vercel's free Hobby plan is for non-commercial use only. Switch to **Pro** before the site is used commercially.

## Custom domain

Production domain: **oalthaidi.com** (registered at GoDaddy, DNS managed at GoDaddy).

1. Vercel → Project → Settings → Domains → add `oalthaidi.com` and accept the suggested `www.oalthaidi.com` redirect. Keep `oalthaidi.com` as the primary domain.
2. GoDaddy → My Products → the domain → **DNS**. Do not change the nameservers.
   - Edit the `A` record named `@` to the value Vercel shows (remove any other `A` or `AAAA` records named `@`).
   - Edit the `CNAME` record named `www` to the project-specific value Vercel shows.
3. Wait until Vercel shows **Valid Configuration**; it issues the HTTPS certificate automatically.
4. Redeploy production once (merge any change, or Deployments → Redeploy). The build reads `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets to the shortest custom production domain, so canonical links, the sitemap and social cards switch to `https://oalthaidi.com` with no code change. `NEXT_PUBLIC_SITE_URL` is only needed to override that choice.

## Branch workflow

```
feature branch ──► pull request ──► preview URL (review here) ──► merge to main ──► production
```

Protect `main` in GitHub (Settings → Branches) so changes arrive through pull requests with passing checks.

## Rollback

Vercel → Project → Deployments → pick the last good deployment → **Promote to Production**. This takes seconds and needs no code change. Then fix forward on a branch.

## After each production deploy

- Open `/` (Arabic) and `/en` on a phone.
- Open `/programs/double-your-efficiency` and check the dates.
- Open an old link such as `/ar/privacy` and confirm it lands on `/privacy`.
- Check `/sitemap.xml` uses the real domain.
