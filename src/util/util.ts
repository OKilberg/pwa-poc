export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getCurrentDate = () => {};

export function getHoursMinutesDifference(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (end < start) return "0h 0m"; // Prevent negative results

  let diffMs = end.getTime() - start.getTime(); // Difference in milliseconds
  let totalMinutes = Math.floor(diffMs / (1000 * 60)); // Convert to full minutes
  const hasRemainingSeconds = diffMs % (1000 * 60) !== 0; // Check if there are leftover seconds

  if (hasRemainingSeconds) {
    totalMinutes += 1; // Only round up if there are leftover seconds
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export function getISOTime(isoString: string) {
  const date = new Date(isoString);

  return date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const tryFetch = async <T>(
  asyncFunction: () => Promise<T>
): Promise<T | undefined> => {
  try {
    const response = await asyncFunction();

    return response;
  } catch (error) {
    console.error("Error:", error);

    return undefined;
  }
};

export function withSubcomponents<
  T extends object,
  S extends Record<string, unknown>
>(Component: T, subcomponents: S): T & S {
  return Object.assign(Component, subcomponents);
}
