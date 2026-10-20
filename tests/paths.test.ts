import assert from "node:assert/strict";
import { test } from "node:test";
import { alternateLanguages, homeAnchor, localePath, routeRequest, splitPathname, switchLocalePath } from "../src/i18n/paths";

test("Arabic paths have no prefix, English paths start with /en", () => {
  assert.equal(localePath("ar"), "/");
  assert.equal(localePath("ar", "/programs/creative-teacher"), "/programs/creative-teacher");
  assert.equal(localePath("en"), "/en");
  assert.equal(localePath("en", "/privacy"), "/en/privacy");
  assert.equal(localePath("en", "/"), "/en");
});

test("home anchors", () => {
  assert.equal(homeAnchor("ar", "contact"), "/#contact");
  assert.equal(homeAnchor("en", "programs"), "/en#programs");
});

test("hreflang alternates point Arabic and x-default to the root form", () => {
  assert.deepEqual(alternateLanguages(), { ar: "/", en: "/en", "x-default": "/" });
  assert.deepEqual(alternateLanguages("/privacy"), { ar: "/privacy", en: "/en/privacy", "x-default": "/privacy" });
});

test("splitPathname accepts public and internal forms alike", () => {
  assert.deepEqual(splitPathname("/"), { locale: "ar", path: "" });
  assert.deepEqual(splitPathname("/ar"), { locale: "ar", path: "" });
  assert.deepEqual(splitPathname("/programs/x"), { locale: "ar", path: "/programs/x" });
  assert.deepEqual(splitPathname("/ar/programs/x"), { locale: "ar", path: "/programs/x" });
  assert.deepEqual(splitPathname("/en"), { locale: "en", path: "" });
  assert.deepEqual(splitPathname("/en/privacy"), { locale: "en", path: "/privacy" });
});

test("language switch keeps the same page", () => {
  assert.equal(switchLocalePath("/", "en"), "/en");
  assert.equal(switchLocalePath("/programs/x", "en"), "/en/programs/x");
  assert.equal(switchLocalePath("/ar/programs/x", "en"), "/en/programs/x");
  assert.equal(switchLocalePath("/en", "ar"), "/");
  assert.equal(switchLocalePath("/en/privacy", "ar"), "/privacy");
});

test("middleware routing: root is Arabic, /en passes, old /ar links redirect", () => {
  assert.deepEqual(routeRequest("/"), { action: "rewrite", pathname: "/ar" });
  assert.deepEqual(routeRequest("/programs/x"), { action: "rewrite", pathname: "/ar/programs/x" });
  assert.deepEqual(routeRequest("/en"), { action: "next" });
  assert.deepEqual(routeRequest("/en/programs/x"), { action: "next" });
  assert.deepEqual(routeRequest("/ar"), { action: "redirect", pathname: "/" });
  assert.deepEqual(routeRequest("/ar/programs/x"), { action: "redirect", pathname: "/programs/x" });
  // Unknown first segments are Arabic pages (the catch-all renders 404 if they don't exist).
  assert.deepEqual(routeRequest("/fr/x"), { action: "rewrite", pathname: "/ar/fr/x" });
});
