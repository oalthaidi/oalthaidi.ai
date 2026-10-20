"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { notFoundText } from "@/content/not-found";
import { localePath, splitPathname } from "@/i18n/paths";

/**
 * 404 page. not-found files receive no params, so the locale is read from
 * the URL on the client.
 */
export default function NotFound() {
  const { locale } = splitPathname(usePathname() ?? "/");
  const notFound = notFoundText[locale];

  return (
    <div className="wrap not-found">
      <span className="mono">404</span>
      <h1 className="page__title">{notFound.title}</h1>
      <p className="page__lead">{notFound.body}</p>
      <div>
        <Link className="btn btn--primary" href={localePath(locale)}>
          {notFound.home}
        </Link>
      </div>
    </div>
  );
}
