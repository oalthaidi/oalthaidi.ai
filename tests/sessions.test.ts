import assert from "node:assert/strict";
import { test } from "node:test";
import { countdownParts, nextUpcoming } from "../src/lib/sessions";

const sessions = [
  { id: "b", startsAt: "2026-11-09T18:00:00+03:00" },
  { id: "a", startsAt: "2026-10-26T18:00:00+03:00" },
  { id: "c", startsAt: "2026-11-30T18:00:00+03:00" },
];

test("nextUpcoming returns the earliest future session", () => {
  const result = nextUpcoming(sessions, new Date("2026-10-20T12:00:00+03:00"));
  assert.equal(result?.item.id, "a");
});

test("nextUpcoming skips sessions that already started", () => {
  const result = nextUpcoming(sessions, new Date("2026-10-26T18:00:00+03:00"));
  assert.equal(result?.item.id, "b");
});

test("nextUpcoming returns null when nothing is ahead", () => {
  assert.equal(nextUpcoming(sessions, new Date("2027-01-01T00:00:00Z")), null);
  assert.equal(nextUpcoming([], new Date()), null);
});

test("countdownParts splits a duration and floors negatives to zero", () => {
  const ms = ((2 * 24 + 5) * 60 + 7) * 60_000 + 30_000;
  assert.deepEqual(countdownParts(ms), { days: 2, hours: 5, minutes: 7 });
  assert.deepEqual(countdownParts(-1000), { days: 0, hours: 0, minutes: 0 });
});
