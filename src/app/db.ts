import Dexie from "dexie";

export const db = new Dexie("offlineDB");

db.version(1).stores({
  posts: "++id, code, in, out",
  users: "++id, code, firstname, lastname",
});

declare global {
  interface Window {
    db: Dexie;
  }
}

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  window.db = db;
}
