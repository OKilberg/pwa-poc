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

export const getLogsCacheKey = (isoDate: string) => {
  const formattedDate = getFormattedDate(isoDate);

  const key = `date-${formattedDate}`;

  return key;
};

export const clearLogsCacheKey = (isoDate: string) => {
  const cacheKey = getLogsCacheKey(isoDate);

  clearCacheKeys([cacheKey]);
};

export const clearUserLogsCache = (userId: number, isoDate: string) => {
  const year = dayjs(isoDate).year();
  const cacheKey = `att-${userId}-${year}`;

  clearCacheKeys([cacheKey]);
};
