/******************************
 * Utility helpers            *
 ******************************/

const DAY_MS = 86_400_000;

/** Returns a random integer in [min,max] (inclusive). */
export const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Returns a random Date between the given ISO date strings (inclusive). */
export const randDateBetween = (fromISO: string, toISO: string) => {
  const from = new Date(fromISO).getTime();
  const to = new Date(toISO).getTime();
  return new Date(randInt(from, to));
};

/** Returns the same date with `days` added. */
export const addDays = (d: Date, days: number) =>
  new Date(d.getTime() + days * DAY_MS);

/** Formats a Date in YYYY-MM-DD (ISO, date‑only) */
export const fmtDate = (d: Date) => d.toISOString().split("T")[0];

/** Formats a Date in full ISO (YYYY-MM-DDTHH:mm:ss.sssZ) */
export const fmtDateTime = (d: Date) => d.toISOString();
