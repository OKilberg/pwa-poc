import { EntityTable } from "dexie";

type UserRole = "admin" | "employee";
type UserState = "active" | "archived";

export type User = {
  id: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  idn: string;
  state: UserState;
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

export type AbsenceCause = "sickLeave" | "vacation" | "other";

export type WorkAbsence = {
  id: number;
  userId: number;
  dateStart: string; // iso date,
  dateEnd: string; // not required if single day
  month: number;
  year: number;
  cause: AbsenceCause;
  note: string | null;
};

export type NewWorkAbsence = Omit<WorkAbsence, "id">;

export type Tables = {
  logs: EntityTable<LogEntry, "id">;
  users: EntityTable<User, "id">;
  absences: EntityTable<WorkAbsence, "id">;
};
