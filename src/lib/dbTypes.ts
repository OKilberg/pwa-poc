import { EntityTable } from "dexie";

type UserRole = "admin" | "employee";

export type User = {
  id: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  idn: string;
};

export type LogEntry = {
  id: number;
  userId: number;
  inTime: string; // ISO-like datetime string
  outTime: string | null; // ISO-like datetime string
  month: number;
  year: number;
  note: string | null;
};

export type NewLogEntry = Omit<LogEntry, "id">;

export type Tables = {
  logs: EntityTable<LogEntry, "id">;
  users: EntityTable<User, "id">;
};
