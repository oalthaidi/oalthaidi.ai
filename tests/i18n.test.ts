import assert from "node:assert/strict";
import { test } from "node:test";
import { directionOf, isLocale, pickLocale } from "../src/i18n/config";

test("isLocale accepts only supported locales", () => {
  assert.equal(isLocale("ar"), true);
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("fr"), false);
  assert.equal(isLocale(undefined), false);
});

test("direction follows the script", () => {
  assert.equal(directionOf("ar"), "rtl");
  assert.equal(directionOf("en"), "ltr");
});

test("pickLocale honours browser preference order and quality", () => {
  assert.equal(pickLocale("en-US,en;q=0.9,ar;q=0.8"), "en");
  assert.equal(pickLocale("ar-KW,ar;q=0.9,en;q=0.8"), "ar");
  assert.equal(pickLocale("fr-FR,en;q=0.5"), "en");
  assert.equal(pickLocale("en;q=0.2,ar;q=0.9"), "ar");
});

test("pickLocale falls back to Arabic", () => {
  assert.equal(pickLocale(null), "ar");
  assert.equal(pickLocale(""), "ar");
  assert.equal(pickLocale("de-DE,fr;q=0.8"), "ar");
  assert.equal(pickLocale("en;q=0"), "ar");
});
