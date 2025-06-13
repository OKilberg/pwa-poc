import { tryFetch } from "@/util/util";
import { NewWorkAbsence, WorkAbsence } from "../dbTypes";
import { db } from "@/app/db";
import { clearAbsenceCacheKey } from "../queryCache/queryCache";

export const addWorkAbsence = async (workAbsence: NewWorkAbsence) => {
  const response = await tryFetch(() => db.absences.add(workAbsence));

  if (response) {
    clearAbsenceCacheKey(workAbsence.dateStart);
  }

  return response;
};

export const getWorkAbsences = async () => {
  const response = await tryFetch(() => db.absences.toArray());

  if (!response) {
    return [];
  }

  return response;
};

export const getWorkAbsencesByDate = async (date: string) => {
  const response = await tryFetch(() =>
    db.absences
      .where("dateStart")
      .belowOrEqual(date)
      .filter((entry) => entry.dateEnd >= date)
      .toArray()
  );

  if (!response) {
    return [];
  }

  return response;
};

export const getWorkAbsenceByYearMonth = async (
  year: WorkAbsence["year"],
  month: WorkAbsence["month"]
) => {
  return await db.absences.where({ year: year, month: month }).toArray();
};

export const getWorkAbsenceByYearMonthUser = async (
  year: WorkAbsence["year"],
  month: WorkAbsence["month"],
  userId: WorkAbsence["userId"]
) => {
  return await db.absences
    .where({ year: year, month: month, userId: userId })
    .toArray();
};

export const removeWorkAbsence = async (id: WorkAbsence["id"]) => {
  const response = await tryFetch(() => db.absences.delete(id));

  return response;
};
