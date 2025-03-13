import { use } from "react";

const promiseCache = new Map<string, Promise<unknown>>();

const useQuery = <T>({ fn, key }: { fn: () => Promise<T>; key: string }) => {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }

  const promise = promiseCache.get(key) as Promise<T>;

  const result = use(promise);

  return result;
};

export default useQuery;
