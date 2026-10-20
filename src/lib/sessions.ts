/**
 * Helpers for upcoming course sessions and the hero countdown.
 * Session times are ISO strings with an explicit offset (Kuwait is UTC+03:00).
 */
export interface DatedSession {
  startsAt: string;
}

export interface UpcomingSession<T> {
  item: T;
  startsAt: Date;
}

/** Returns the earliest session that has not started yet, or null. */
export function nextUpcoming<T extends DatedSession>(sessions: readonly T[], now: Date): UpcomingSession<T> | null {
  let best: UpcomingSession<T> | null = null;
  for (const item of sessions) {
    const startsAt = new Date(item.startsAt);
    if (Number.isNaN(startsAt.getTime()) || startsAt <= now) continue;
    if (!best || startsAt < best.startsAt) best = { item, startsAt };
  }
  return best;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
}

/** Splits a positive duration into whole days, hours and minutes. Negative input yields zeros. */
export function countdownParts(ms: number): CountdownParts {
  const safe = Math.max(0, ms);
  return {
    days: Math.floor(safe / 86_400_000),
    hours: Math.floor((safe % 86_400_000) / 3_600_000),
    minutes: Math.floor((safe % 3_600_000) / 60_000),
  };
}
