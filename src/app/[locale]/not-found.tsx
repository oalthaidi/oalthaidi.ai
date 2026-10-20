"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { notFoundText } from "@/content/not-found";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * 404 page. not-found files receive no params, so the locale is read from
 * the URL on the client.
 */
export default function NotFound() {
  const segment = usePathname()?.split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const notFound = notFoundText[locale];

  return (
    <div className="wrap not-found">
      <span className="mono">404</span>
      <h1 className="page__title">{notFound.title}</h1>
      <p className="page__lead">{notFound.body}</p>
      <div>
        <Link className="btn btn--primary" href={`/${locale}`}>
          {notFound.home}
        </Link>
      </div>
    </div>
  );
}
