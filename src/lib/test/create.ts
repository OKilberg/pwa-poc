import { db } from "@/app/db";
import { generateTestData } from "./generate";

const createTestData = async () => {
  const { logEntries, users, workAbsences } = generateTestData();

  const admin = users[0];

  await db.users
    .bulkAdd(users)
    .then(() => db.absences.bulkAdd(workAbsences))
    .then(() => db.logs.bulkAdd(logEntries));

  return admin;
};

export default createTestData;
