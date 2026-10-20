import assert from "node:assert/strict";
import { test } from "node:test";
import { directionOf, isLocale } from "../src/i18n/config";

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
