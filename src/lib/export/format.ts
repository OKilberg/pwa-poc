import { getEmployeesMap } from "../db/users";
import { WorkAbsence } from "../dbTypes";
import { fullMonthNames } from "../date/constants";
import dayjs from "dayjs";

export const getLogsFormatted = () => {
  // TODO
};

export const getAbsencesFormatted = async (absences: Array<WorkAbsence>) => {
  // TODO
  const employeesMap = await getEmployeesMap();

  const absencesFormatted = absences.map(
    ({ cause, dateEnd, dateStart, month, note, year, userId }) => {
      const employee = employeesMap.get(userId);
      if (!employee) return;

      const { firstName, lastName, idn } = employee;

      const formattedName = `${firstName} ${lastName}`;

      const formattedStartDay = dayjs(dateStart).format("YYYY-MM-DD");
      const formattedEndDay = dayjs(dateEnd).format("YYYY-MM-DD");
      const formattedNote = note ? note : "";

      return {
        Name: formattedName,
        "Identification Number": idn,
        Cause: cause,
        "Start Date": formattedStartDay,
        "End Date": formattedEndDay,
        Month: fullMonthNames[month],
        Year: year,
        Note: formattedNote,
      };
    }
  );

  return absencesFormatted;
};
