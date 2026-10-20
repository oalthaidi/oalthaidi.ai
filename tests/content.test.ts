/**
 * Content integrity: both languages must describe the same site.
 * TypeScript already checks that every field exists; these tests check the
 * things types cannot: matching list lengths, valid dates and links, and no
 * empty text.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { ar } from "../src/content/ar";
import { en } from "../src/content/en";

/** Section ids on the home page that the guided tour may point to. */
const SECTION_IDS = ["hero", "credentials", "about", "programs", "readiness", "research", "solutions", "contact"];

test("both languages list the same programmes in the same order", () => {
  assert.deepEqual(
    en.programs.courses.map((c) => c.slug),
    ar.programs.courses.map((c) => c.slug),
  );
  ar.programs.courses.forEach((course, i) => {
    const other = en.programs.courses[i];
    assert.equal(other.icon, course.icon, `${course.slug} icon`);
    assert.deepEqual(
      other.sessions.map((s) => [s.startsAt, s.registerUrl]),
      course.sessions.map((s) => [s.startsAt, s.registerUrl]),
      `${course.slug} sessions`,
    );
  });
});

test("lists have the same length in both languages", () => {
  const pairs: Array<[string, readonly unknown[], readonly unknown[]]> = [
    ["credentials", ar.credentials, en.credentials],
    ["stats", ar.about.stats, en.about.stats],
    ["card rows", ar.about.card.rows, en.about.card.rows],
    ["paragraphs", ar.about.paragraphs, en.about.paragraphs],
    ["events", ar.research.events, en.research.events],
    ["phases", ar.solutions.phases, en.solutions.phases],
    ["questions", ar.readiness.questions, en.readiness.questions],
    ["tour steps", ar.tour.steps, en.tour.steps],
    ["form types", ar.contact.form.types, en.contact.form.types],
    ["privacy sections", ar.privacy.sections, en.privacy.sections],
  ];
  for (const [name, a, b] of pairs) assert.equal(b.length, a.length, name);
});

test("stats carry the same numbers in both languages", () => {
  assert.deepEqual(
    en.about.stats.map((s) => [s.value, Boolean(s.plus)]),
    ar.about.stats.map((s) => [s.value, Boolean(s.plus)]),
  );
});

test("sessions have valid Kuwait-time dates and https registration links", () => {
  for (const course of ar.programs.courses) {
    for (const session of course.sessions) {
      assert.match(session.startsAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+03:00$/, session.startsAt);
      assert.ok(!Number.isNaN(Date.parse(session.startsAt)), session.startsAt);
      assert.match(session.registerUrl, /^https:\/\//, session.registerUrl);
    }
  }
});

test("readiness sample answers match the questions", () => {
  for (const content of [ar, en]) {
    assert.equal(content.readiness.sampleAnswers.length, content.readiness.questions.length);
    content.readiness.sampleAnswers.forEach((answer) => assert.ok(answer >= 0 && answer <= 3));
  }
});

test("readiness levels link to programmes that exist", () => {
  const slugs = new Set(ar.programs.courses.map((c) => c.slug));
  for (const level of [...ar.readiness.levels, ...en.readiness.levels]) {
    if (level.courseSlug) assert.ok(slugs.has(level.courseSlug), level.courseSlug);
  }
});

test("tour steps point to real sections", () => {
  for (const step of [...ar.tour.steps, ...en.tour.steps]) assert.ok(SECTION_IDS.includes(step.target), step.target);
});

test("message templates use every form field", () => {
  for (const content of [ar, en]) {
    for (const key of ["{name}", "{org}", "{type}", "{details}"]) {
      assert.ok(content.contact.form.messageTemplate.includes(key), `${content.locale} ${key}`);
    }
  }
});

test("no text field is empty", () => {
  const walk = (value: unknown, path: string) => {
    if (typeof value === "string") assert.ok(value.trim().length > 0, `empty text at ${path}`);
    else if (Array.isArray(value)) value.forEach((item, i) => walk(item, `${path}[${i}]`));
    else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
  };
  walk(ar, "ar");
  walk(en, "en");
});
