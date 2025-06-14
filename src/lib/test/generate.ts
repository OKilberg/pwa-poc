import { generatePIN } from "@/features/Employees/Components/AddEmployee";
import {
  AbsenceCause,
  LogEntry,
  User,
  UserRole,
  WorkAbsence,
} from "../dbTypes";
import {
  addDays,
  fmtDate,
  fmtDateTime,
  randDateBetween,
  randInt,
} from "./util";

export function generateTestData() {
  // let uid = 1;
  let logId = 1;
  let absenceId = 1;

  // --- Users ------------------------------------------------------------
  const users: User[] = [
    {
      id: generatePIN(),
      role: "admin",
      firstName: "Alex",
      lastName: "Adminsson",
      idn: "AA-1000",
      state: "active",
    },
    ...["Erik", "Frida", "Lena", "Oskar"].map((first, i) => ({
      id: generatePIN(),
      role: "employee" as UserRole,
      firstName: first,
      lastName: `${first}sson`,
      idn: `EMP-${1000 + i}`,
      state: "active" as const,
    })),
  ];
  // uid += 4; // advance counter

  // --- Log entries ------------------------------------------------------
  const logEntries: LogEntry[] = [];

  users
    .filter((u) => u.role === "employee")
    .forEach((u) => {
      for (let i = 0; i < 30; i++) {
        const workDay = randDateBetween("2024-01-01", "2025-12-31");
        // Ensure we only create one log per day per user
        // If duplicate date chosen, regenerate
        while (
          logEntries.some(
            (le) => le.userId === u.id && le.inTime.startsWith(fmtDate(workDay))
          )
        ) {
          workDay.setTime(
            randDateBetween("2024-01-01", "2025-12-31").getTime()
          );
        }

        const startHour = randInt(7, 10);
        workDay.setHours(startHour, randInt(0, 59), 0, 0);
        const offTime = new Date(workDay.getTime());
        offTime.setHours(startHour + 8, randInt(0, 59), 0, 0);

        logEntries.push({
          id: logId++,
          userId: u.id,
          inTime: fmtDateTime(workDay),
          outTime: fmtDateTime(offTime),
          month: workDay.getMonth(),
          year: workDay.getFullYear(),
          note: null,
        });
      }
    });

  // --- Absences ---------------------------------------------------------
  const causes: AbsenceCause[] = ["sickLeave", "vacation", "other"];
  const workAbsences: WorkAbsence[] = [];

  users
    .filter((u) => u.role === "employee")
    .forEach((u) => {
      for (let i = 0; i < 10; i++) {
        const start = randDateBetween("2024-01-01", "2025-12-31");
        const length = randInt(1, 14);
        const end = addDays(start, length - 1);

        workAbsences.push({
          id: absenceId++,
          userId: u.id,
          dateStart: fmtDate(start),
          dateEnd: fmtDate(end),
          month: start.getMonth(),
          year: start.getFullYear(),
          cause: causes[randInt(0, causes.length - 1)],
          note: null,
        });
      }
    });

  return { users, logEntries, workAbsences };
}
