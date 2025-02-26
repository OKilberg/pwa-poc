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

export const getLatestLogEntry = async (userId: User["id"]) => {
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

export const editLogEntry = async (
  id: LogEntry["id"],
  updates: Partial<LogEntry>
) => {
  const response = await tryFetch(() => db.logs.update(id, { ...updates }));

  return response;
};
