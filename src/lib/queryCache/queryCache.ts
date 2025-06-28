import { promiseCache } from "@/shared/hooks/useQuery";
import dayjs from "dayjs";

export const clearCacheKeys = (keys: Array<string>) => {
  keys.forEach((key) => {
    promiseCache.delete(key);
  });
};

const getFormattedDate = (isoDate: string) => {
  const formattedDate = isoDate.split("T")[0];

  return formattedDate;
};

export const getAbsenceCacheKey = (isoDate: string) => {
  const formattedDate = getFormattedDate(isoDate);

  const key = `absence-${formattedDate}`;

  return key;
};

export const clearAbsenceCacheKey = (isoDate: string) => {
  const cacheKey = getAbsenceCacheKey(isoDate);

  clearCacheKeys([cacheKey]);
};

export const clearAbsenceEditCacheKey = (id: number) => {
  const cacheKey = `edit-${id}`;

  clearCacheKeys([cacheKey]);
};

export const clearAbsencesCacheKey = (userId: number, isoDate: string) => {
  const year = dayjs(isoDate).year();
  const month = dayjs(isoDate).month();
  const cacheKey = `absences-${userId}-${month}-${year}`;

  clearCacheKeys([cacheKey]);
};

export const getLogsCacheKey = (isoDate: string) => {
  const formattedDate = getFormattedDate(isoDate);

  const key = `date-${formattedDate}`;

  return key;
};

export const clearLogsCacheKey = (isoDate: string) => {
  const cacheKey = getLogsCacheKey(isoDate);

  clearCacheKeys([cacheKey]);
};

export const clearLogEditCacheKey = (id: number) => {
  const cacheKey = `log-${id}`;
  const cacheKey1 = "clockedIn";

  clearCacheKeys([cacheKey, cacheKey1]);
};

export const clearDateCacheKey = (isoDate: string) => {
  const calendarDate = dayjs(isoDate);
  const dateFormatted = calendarDate.format("YYYY-MM-DD");
  const cacheKey = String(`date-${dateFormatted}`);

  clearCacheKeys([cacheKey]);
};

export const clearUserLogsCache = (userId: number, isoDate: string) => {
  const year = dayjs(isoDate).year();
  const month = dayjs(isoDate).month();
  const cacheKey1 = `att-${userId}-${year}`;
  const cacheKey2 = `logs-${userId}-${month}-${year}`;
  const cacheKey3 = "clockedIn";

  clearCacheKeys([cacheKey1, cacheKey2, cacheKey3]);
};
