/**
 * Shape of all site text. Both src/content/ar.ts and src/content/en.ts must
 * satisfy SiteContent, so TypeScript refuses a build where one language is
 * missing a field. See docs/content-guide.md for how to edit content.
 */
import type { Locale } from "@/i18n/config";

/** Inline text where some parts are emphasised: ["plain ", { em: "highlighted" }, " plain"]. */
export type Rich = ReadonlyArray<string | { em: string }>;

export type CourseSlug =
  | "distinguished-employee"
  | "ai-digital-transformation"
  | "successful-teacher"
  | "double-your-efficiency";

export type CourseIcon = "employee" | "enterprise" | "teacher" | "individual";

export interface Session {
  /** ISO date-time with offset, e.g. "2026-10-26T17:00:00+03:00". */
  startsAt: string;
  /** ISO date-time with offset; must be on the same day, after startsAt. */
  endsAt: string;
  mode: string;
  registerUrl: string;
}

export interface Course {
  slug: CourseSlug;
  icon: CourseIcon;
  audience: string;
  title: string;
  summary: string;
  tags: readonly string[];
  topics: readonly string[];
  outcomes: readonly string[];
  format: string;
  /** Shown when there is no upcoming public session. */
  availability: string;
  sessions: readonly Session[];
}

export interface Stat {
  value: number;
  plus?: boolean;
  label: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  body: string;
  badge?: string;
}

export interface Phase {
  label: string;
  state: string;
  current?: boolean;
  title: string;
  body: string;
  items: readonly string[];
}

export interface ReadinessQuestion {
  prompt: string;
  options: readonly [string, string, string, string];
}

export interface ReadinessLevelText {
  title: string;
  body: string;
  recommendation: string;
  /** Course to link to as the starting point; omit to link to the contact form. */
  courseSlug?: CourseSlug;
}

export interface TourStep {
  /** Element id the step highlights. */
  target: string;
  title: string;
  body: string;
}

export interface SiteContent {
  locale: Locale;
  meta: { title: string; description: string; personName: string; jobTitle: string };
  nav: {
    about: string;
    programs: string;
    readiness: string;
    research: string;
    solutions: string;
    book: string;
    tour: string;
    switchLanguage: string;
    switchLanguageLabel: string;
    skipToContent: string;
    sectionsLabel: string;
    home: string;
  };
  hero: {
    prefix: string;
    name: string;
    role: string;
    lead: Rich;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
    nextSessionLabel: string;
    countdown: { in: string; days: string; hours: string; minutes: string; started: string };
    markCaption: string;
  };
  credentials: readonly string[];
  credentialsLabel: string;
  about: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    card: { name: string; role: string; photoAlt: string; rows: ReadonlyArray<{ label: string; value: string }> };
    stats: readonly Stat[];
  };
  programs: {
    eyebrow: string;
    title: string;
    intro: string;
    detailsCta: string;
    registerCta: string;
    requestCta: string;
    nextLabel: string;
    andLabel: string;
    courses: readonly Course[];
    page: {
      back: string;
      topics: string;
      outcomes: string;
      format: string;
      upcoming: string;
      noUpcoming: string;
      ctaTitle: string;
      ctaBody: string;
    };
  };
  readiness: {
    eyebrow: string;
    title: string;
    intro: string;
    questions: readonly ReadinessQuestion[];
    /** Answer index pre-selected for each question so the tool opens with a result. */
    sampleAnswers: readonly number[];
    levels: readonly [ReadinessLevelText, ReadinessLevelText, ReadinessLevelText];
    startHere: string;
    resultLabel: string;
  };
  research: { eyebrow: string; title: string; events: readonly TimelineEvent[] };
  solutions: { eyebrow: string; title: string; intro: string; phases: readonly Phase[]; note: string };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
    copied: string;
    copyFallback: string;
    whatsappCta: string;
    form: {
      name: string;
      namePlaceholder: string;
      nameRequired: string;
      org: string;
      orgPlaceholder: string;
      type: string;
      types: readonly string[];
      details: string;
      detailsPlaceholder: string;
      submit: string;
      privacyNote: string;
      opened: string;
      /** Template for the WhatsApp message; {name} {org} {type} {details} are replaced. */
      messageTemplate: string;
    };
  };
  footer: { tagline: string; privacy: string; rights: string };
  privacy: { title: string; updated: string; sections: ReadonlyArray<{ heading: string; body: string }> };
  tour: { steps: readonly TourStep[]; prev: string; next: string; finish: string; close: string; of: string };
  notFound: { title: string; body: string; home: string };
}
