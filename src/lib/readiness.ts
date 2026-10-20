/**
 * Scoring for the "AI readiness" self-assessment.
 * Each question has four answers scored 0–3; the score is the share of the
 * maximum, as a whole percentage. Three levels split the range into thirds.
 */
export const MAX_ANSWER = 3;

export type ReadinessLevelIndex = 0 | 1 | 2;

export function readinessScore(answers: readonly number[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((sum, answer) => {
    const clamped = Math.min(Math.max(Math.round(answer), 0), MAX_ANSWER);
    return sum + clamped;
  }, 0);
  return Math.round((total / (answers.length * MAX_ANSWER)) * 100);
}

export function readinessLevel(score: number): ReadinessLevelIndex {
  if (score < 34) return 0;
  if (score < 67) return 1;
  return 2;
}
