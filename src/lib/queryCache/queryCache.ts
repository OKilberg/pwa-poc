import { promiseCache } from "@/shared/hooks/useQuery";

export const clearCacheKeys = (keys: Array<string>) => {
  keys.forEach((key) => {
    promiseCache.delete(key);
  });
};
