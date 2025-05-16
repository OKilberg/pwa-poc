import { EntityTable } from "dexie";

export type UserRole = "admin" | "employee";
export type UserState = "active" | "archived";

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
  inTime: string;
  outTime: string | null;
  month: number;
  year: number;
  note: string | null;
};

export type NewLogEntry = Omit<LogEntry, "id">;

export type AbsenceCause = "sickLeave" | "vacation" | "other";

export type WorkAbsence = {
  id: number;
  userId: number;
  dateStart: string;
  dateEnd: string;
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
