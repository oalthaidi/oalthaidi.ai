import assert from "node:assert/strict";
import { test } from "node:test";
import { readinessLevel, readinessScore } from "../src/lib/readiness";

test("score is the share of the maximum, as a whole percentage", () => {
  assert.equal(readinessScore([0, 0, 0, 0]), 0);
  assert.equal(readinessScore([3, 3, 3, 3]), 100);
  assert.equal(readinessScore([1, 0, 1, 0]), 17); // the sample answers
  assert.equal(readinessScore([2, 2, 1, 1]), 50);
});

test("out-of-range answers are clamped and empty input scores zero", () => {
  assert.equal(readinessScore([9, -2]), 50);
  assert.equal(readinessScore([]), 0);
});

test("levels split the range into thirds", () => {
  assert.equal(readinessLevel(0), 0);
  assert.equal(readinessLevel(33), 0);
  assert.equal(readinessLevel(34), 1);
  assert.equal(readinessLevel(66), 1);
  assert.equal(readinessLevel(67), 2);
  assert.equal(readinessLevel(100), 2);
});
