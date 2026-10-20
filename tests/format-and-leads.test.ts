import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate, formatNumber, formatPercent } from "../src/lib/format";
import { composeLeadMessage } from "../src/lib/leads";

test("Arabic numbers use Arabic-Indic digits", () => {
  assert.equal(formatNumber(150, "ar"), "١٥٠");
  assert.equal(formatNumber(150, "en"), "150");
});

test("percentages follow the locale", () => {
  assert.equal(formatPercent(42, "en"), "42%");
  assert.match(formatPercent(42, "ar"), /٤٢/);
});

test("dates are shown in Kuwait time", () => {
  // 23:30 UTC on 25 Oct is already 26 Oct in Kuwait.
  assert.equal(formatDate("2026-10-25T23:30:00Z", "en"), "26 October 2026");
  assert.match(formatDate("2026-10-26T18:00:00+03:00", "ar", false), /أكتوبر/);
});

test("lead message fills the template and marks empty fields", () => {
  const message = composeLeadMessage("Name: {name}\nOrg: {org}\nType: {type}\nDetails: {details}", {
    name: "  Sara ",
    org: "",
    type: "Training",
    details: "20 people",
  });
  assert.equal(message, "Name: Sara\nOrg: —\nType: Training\nDetails: 20 people");
});
