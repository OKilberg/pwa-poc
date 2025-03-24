import { Tables } from "@/lib/dbTypes";
import { getRandomIdentityNumber } from "@/util/util";
import Dexie from "dexie";

export const db = new Dexie("offlineDB") as Dexie & Tables;

db.version(1).stores({
  logs: "++id, userId, inTime, outTime, month, year, [userId+year]",
  users: "&id, role, firstName, lastName",
});

db.version(2)
  .stores({
    logs: "++id, userId, inTime, outTime, month, year, [userId+year]",
    users: "&id, role, firstName, lastName, idn",
  })
  .upgrade((tables) => {
    return tables
      .table("users")
      .toCollection()
      .modify((user) => {
        user.idn = getRandomIdentityNumber();
      });
  });

db.version(3)
  .stores({
    logs: "++id, userId, inTime, outTime, month, year, [userId+year], note",
    users: "&id, role, firstName, lastName, idn",
  })
  .upgrade((tables) => {
    return tables
      .table("logs")
      .toCollection()
      .modify((log) => {
        log.note = null;
      });
  });

/*
db.on("populate", ()=>{
  db.users.add({
    id: 123, role: 'admin', firstName: 'Adman', lastName: 'Testsson',
    idn: getRandomIdentityNumber()
  })
})
*/

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
