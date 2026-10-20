import { NextResponse, type NextRequest } from "next/server";
import { routeRequest } from "@/i18n/paths";

/**
 * Locale routing (rules in src/i18n/paths.ts):
 * - "/…"     → served as the Arabic page (internal rewrite to /ar/…)
 * - "/en/…"  → served as is
 * - "/ar/…"  → permanent redirect (308) to the root form, for old links
 */
export function middleware(request: NextRequest) {
  const decision = routeRequest(request.nextUrl.pathname);
  if (decision.action === "next") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = decision.pathname;
  return decision.action === "rewrite" ? NextResponse.rewrite(url) : NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, icons, robots.txt…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
