import { Tables } from "@/lib/dbTypes";
import { generateTestData } from "@/lib/test/generate";
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

db.version(4)
  .stores({
    logs: "++id, userId, inTime, outTime, month, year, [userId+year], note",
    users: "&id, role, firstName, lastName, idn, state",
  })
  .upgrade((tables) => {
    return tables
      .table("users")
      .toCollection()
      .modify((user) => {
        user.state = "active";
      });
  });

db.version(5).stores({
  logs: "++id, userId, inTime, outTime, month, year, [userId+year], note",
  users: "&id, role, firstName, lastName, idn, state",
  absences: "++id, userId, dateStart, dateEnd, month, year, cause, note",
});

/*
db.on("populate", () => {
  db.users.bulkAdd(users);
  db.absences.bulkAdd(workAbsences);
  db.logs.bulkAdd(logEntries);
});
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
    createTestData: () => void;
  }
}

/*
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  window.createTestData = createTestData;
}
  */
