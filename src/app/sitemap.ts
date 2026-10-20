import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { courseSlugs } from "@/content";
import { locales } from "@/i18n/config";

/** Every page in both languages, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/privacy", ...courseSlugs().map((slug) => `/programs/${slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    })),
  );
}
