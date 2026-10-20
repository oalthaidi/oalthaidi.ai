import type { Locale } from "@/i18n/config";
import { ar } from "./ar";
import { en } from "./en";
import type { Course, CourseSlug, SiteContent } from "./types";

const dictionaries: Record<Locale, SiteContent> = { ar, en };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export function getCourse(locale: Locale, slug: string): Course | undefined {
  return dictionaries[locale].programs.courses.find((course) => course.slug === slug);
}

export function courseSlugs(): CourseSlug[] {
  return ar.programs.courses.map((course) => course.slug);
}

export type { Course, CourseSlug, SiteContent } from "./types";
