import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheOnly, Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// const queue = new BackgroundSyncQueue("myQueueName");

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache
  /*
  runtimeCaching: [
    {
      matcher: ({ url }) => url.pathname.startsWith("/"),
      handler: new CacheOnly(),
    },
  ],
  */
});

/*
serwist.addToPrecacheList([
  { url: "/", revision: "1" },
  { url: "/_not-found", revision: "1" },
  { url: "/admin", revision: "1" },
  { url: "/admin/employees", revision: "1" },
  { url: "/admin/reports", revision: "1" },
  { url: "/admin/employees/add", revision: "1" },
  { url: "/clockin", revision: "1" },
  { url: "/clockin/attendance", revision: "1" },
  { url: "/admin", revision: "1" },
]);
*/

// BACKGROUND SYNC QUEUE
/*
self.addEventListener("fetch", (event) => {
  // Add in your own criteria here to return early if this
  // isn't a request that should use background sync.
  if (event.request.method !== "POST") {
    return;
  }

  const backgroundSync = async () => {
    try {
      const response = await fetch(event.request.clone());
      return response;
    } catch (error) {
      await queue.pushRequest({ request: event.request });
      console.log(error);
      return Response.error();
    }
  };

  console.log("BACKGROUND SYNC");

  event.respondWith(backgroundSync());
})
*/

const urlsToPrecache = [
  "/",
  "/clockin",
  "/clockin/attendance",
  "/admin",
  "/admin/employees",
  "/admin/employees/add",
  "/admin/reports"
] as const;

self.addEventListener("install", (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({ request: new Request(entry), event });
    }),
  );

  event.waitUntil(requestPromises);
});

serwist.addEventListeners();
