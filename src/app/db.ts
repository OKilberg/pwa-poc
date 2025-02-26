import { Tables } from "@/lib/dbTypes";
import Dexie from "dexie";

export const db = new Dexie("offlineDB") as Dexie & Tables;

db.version(1).stores({
  logs: "++id, userId, inTime, outTime",
  users: "&id, role, firstName, lastName",
});

/*
db.version(1).stores({
  posts: "++id, code, in, out",
  users: "++id, code, firstname, lastname",
});
*/

declare global {
  interface Window {
    db: Dexie;
  }
}

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  window.db = db;
}
