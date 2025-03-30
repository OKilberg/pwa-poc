import { promiseCache } from "@/features/Home/Components/useQuery";

export const clearCacheKeys = (keys: Array<string>) => {
  keys.forEach((key) => {
    promiseCache.delete(key);
  });
};
