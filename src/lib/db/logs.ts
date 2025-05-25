import { db } from "@/app/db";
import { LogEntry, NewLogEntry, User } from "../dbTypes";
import { tryFetch } from "@/util/util";

export const addLogEntry = async (logEntry: NewLogEntry) => {
  const response = await tryFetch(() => db.logs.add(logEntry));

  return response;
};

export const getLogEntries = async () => {
  const response = await tryFetch(() => db.logs.toArray());

  if (!response) {
    return [];
  }

  return response;
};

export const getLogEntry = async (id: LogEntry["id"]) => {
  const response = await tryFetch(() => db.logs.get(id));

  return response;
};

export const getActiveLogEntry = async (userId: User["id"]) => {
  const response = await tryFetch(() =>
    db.logs
      .where("userId")
      .equals(userId)
      .reverse()
      .first((log) => {
        if (log && log.outTime === null) return log; // TODO: prone to bugs, rework
      })
  );

  return response;
};

export const getRecordsByDate = async (date: string) => {
  const response = await tryFetch(() =>
    db.logs.where("inTime").startsWith(date).toArray()
  );

  if (!response) {
    return [];
  }

  return response;
};

export const getRecordsByUserMonthYear = async (
  userId: User["id"],
  year: LogEntry["year"],
  month: LogEntry["month"]
) => {
  return db.logs.where({ userId: userId, year: year, month: month }).toArray();
};

export const getRecordsByUserYear = async (
  userId: User["id"],
  year: LogEntry["year"]
) => {
  return db.logs
    .where("[userId+year]") // Compound index for efficient lookup
    .equals([userId, year]) // Ensure case consistency
    .toArray();
};

export const getRecordsByMonthYear = async (
  year: LogEntry["year"],
  month: LogEntry["month"]
) => {
  return db.logs
    .where("year") // Compound index for efficient lookup
    .equals(year) // Ensure case consistency
    .and((log) => log.month === month)
    .toArray();
};

// DEPRECATED
export const getLatestLogEntry = async (userId: User["id"]) => {
  console.warn("Deprecated, use getActiveLogEntry()");
  const response = await tryFetch(() =>
    db.logs
      .where("userId")
      .equals(userId)
      .reverse()
      .first((log) => {
        if (!log?.outTime) return log;
      })
  );

  return response;
};

export const getClockedInEntries = async () => {
  const response = await tryFetch(() =>
    db.logs
      .where("userId")
      .above(0)
      .and((log) => !log.outTime)
      .toArray()
  );

  return response;
};

export const editLogEntry = async (
  id: LogEntry["id"],
  updates: Partial<LogEntry>
) => {
  const response = await tryFetch(() => db.logs.update(id, { ...updates }));

  return response;
};

export const removeLogEntry = async (id: LogEntry["id"]) => {
  const response = await tryFetch(() => db.logs.delete(id));

  return response;
};
