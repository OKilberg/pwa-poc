import { utils, writeFileXLSX } from "xlsx";
import { getRecordsByMonthYear } from "../db/logs";
import { getEmployeesMap } from "../db/users";
import { getISODate, getISOTime, getTimeDifferenceISO } from "@/util/util";
import { fullMonthNames } from "../date/constants";

export const exportMonthlyLogsToXLSX = async (year: number, month: number) => {
  const employeesMap = await getEmployeesMap();
  const monthlyLogs = await getRecordsByMonthYear(year, month);

  const workbook = utils.book_new();

  const logsWithEmployeeInfo = monthlyLogs.map((log) => {
    const employee = employeesMap.get(log.userId);
    if (!employee) return;

    const { firstName, lastName, idn } = employee;
    const { inTime, outTime, month, year, note } = log;

    const formattedInTime = getISOTime(inTime);
    const formattedOutTime = outTime ? getISOTime(outTime) : "";
    const duration = outTime ? getTimeDifferenceISO(inTime, outTime) : null;
    const formattedDuration = duration
      ? getFormattedDuration(duration.hours, duration.minutes)
      : "";

    const formattedMonth = fullMonthNames[month];
    const formattedName = `${firstName} ${lastName}`;

    const formattedDay = getISODate(inTime);
    const formattedNote = note ? note : "";

    return {
      Name: formattedName,
      "Identification Number": idn,
      Day: formattedDay,
      "Start Time": formattedInTime,
      "End Time": formattedOutTime,
      "Hours Worked": formattedDuration,
      Month: formattedMonth,
      Year: year,
      Note: formattedNote,
    };
  });

  const logsSheet = utils.json_to_sheet(logsWithEmployeeInfo);

  utils.book_append_sheet(workbook, logsSheet, "Work logs");

  const fileName = `WorkLogExport${year}-${month + 1}.xlsx`;

  writeFileXLSX(workbook, fileName);
};

const getFormattedDuration = (hours: number, minutes: number) => {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDuration = `${hours}:${formattedMinutes}`;

  return formattedDuration;
};
