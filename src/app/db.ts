import Dexie from "dexie";

export const db = new Dexie("offlineDB");

db.version(1).stores({
  posts: "++id, code, in, out",
});
