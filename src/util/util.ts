import { DATE_LOCALE, TIME_LOCALE } from "@/app/constants";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString(TIME_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getCurrentDate = () => {};

export function getHoursMinutesDifference(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (end < start) return "0h 0m"; // Prevent negative results

  const diffMs = end.getTime() - start.getTime(); // Difference in milliseconds
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

  return date.toLocaleTimeString(TIME_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function getISODate(isoString: string) {
  const date = new Date(isoString);

  return date.toLocaleDateString(DATE_LOCALE, {
    day: "numeric",
    weekday: "short",
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

export function getTimeDifferenceISO(isoDate1: string, isoDate2: string) {
  const date1 = new Date(isoDate1); // Convert ISO string to Date object
  const date2 = new Date(isoDate2); // Convert ISO string to Date object

  const diffInMs = Math.abs(date2.getTime() - date1.getTime()); // Difference in milliseconds
  const hours = Math.floor(diffInMs / (1000 * 60 * 60)); // Convert to hours
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes

  return { hours, minutes }; // Return the result as an object
}

export function getTimeDifferenceMinutesISO(
  isoDate1: string,
  isoDate2: string
) {
  const date1 = new Date(isoDate1); // Convert ISO string to Date object
  const date2 = new Date(isoDate2); // Convert ISO string to Date object

  const diffInMs = Math.abs(date2.getTime() - date1.getTime()); // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes

  return diffInMinutes; // Return the result
}

export function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60); // Calculate the number of hours
  const remainingMinutes = minutes % 60; // Get the remaining minutes after hours

  return { hours, minutes: remainingMinutes }; // Return as an object
}
