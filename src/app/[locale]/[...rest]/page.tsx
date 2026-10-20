import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a locale (e.g. /ar/missing), so they
 * render the localized 404 page inside the site layout.
 */
export default function CatchAll() {
  notFound();
}
