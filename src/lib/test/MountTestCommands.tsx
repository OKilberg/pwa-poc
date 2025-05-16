"use client";

import { useEffect } from "react";
import { generateTestData } from "./generate";
import { db } from "@/app/db";

const createTestData = () => {
  const { logEntries, users, workAbsences } = generateTestData();

  db.users
    .bulkAdd(users)
    .then(() => db.absences.bulkAdd(workAbsences))
    .then(() => db.logs.bulkAdd(logEntries));
};

const MountTestCommands = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined"
    ) {
      window.createTestData = createTestData;
    }
  }, []);

  return null;
};

export default MountTestCommands;
