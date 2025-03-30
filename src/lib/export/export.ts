import { utils, writeFileXLSX } from "xlsx";
import { getRecordsByMonthYear, getRecordsByUserMonthYear } from "../db/logs";
import { getEmployeesMap } from "../db/users";
import { getISODate, getISOTime, getTimeDifferenceISO } from "@/util/util";
import { fullMonthNames } from "../date/constants";
import { LogEntry, User } from "../dbTypes";

export const exportEmployeeMonthlyLogsToXLSX = async (
  id: User["id"],
  year: number,
  month: number
) => {
  const employeeMonthlyLogs = await getRecordsByUserMonthYear(id, year, month);

  const workbook = utils.book_new();

  const logs = employeeMonthlyLogs.map((log) => {
    const { year } = log;

    const {
      formattedDay,
      formattedDuration,
      formattedInTime,
      formattedOutTime,
      formattedMonth,
      formattedNote,
    } = getFormattedLogInfo(log);

    return {
      Day: formattedDay,
      "Start Time": formattedInTime,
      "End Time": formattedOutTime,
      "Hours Worked": formattedDuration,
      Month: formattedMonth,
      Year: year,
      Note: formattedNote,
    };
  });

  const formattedMonth = fullMonthNames[month];
  const sheetName = `${year}-${formattedMonth}`;

  const logsSheet = utils.json_to_sheet(logs);

  utils.book_append_sheet(workbook, logsSheet, sheetName);

  const employeesMap = await getEmployeesMap();
  const employee = employeesMap.get(id);

  if (employee) {
    const { firstName, lastName } = employee;

    const fileName = `${firstName}${lastName}-WorkLogExport${year}-${
      month + 1
    }.xlsx`;

    writeFileXLSX(workbook, fileName);
  }
};

export const exportMonthlyLogsToXLSX = async (year: number, month: number) => {
  const employeesMap = await getEmployeesMap();
  const monthlyLogs = await getRecordsByMonthYear(year, month);

  const workbook = utils.book_new();

  const logsWithEmployeeInfo = monthlyLogs.map((log) => {
    const employee = employeesMap.get(log.userId);
    if (!employee) return;

    const { firstName, lastName, idn } = employee;
    const { year } = log;

    const {
      formattedDay,
      formattedDuration,
      formattedInTime,
      formattedOutTime,
      formattedMonth,
      formattedNote,
    } = getFormattedLogInfo(log);

    const formattedName = `${firstName} ${lastName}`;

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

const getFormattedLogInfo = (log: LogEntry) => {
  const { inTime, outTime, month, year, note } = log;

  const formattedInTime = getISOTime(inTime);
  const formattedOutTime = outTime ? getISOTime(outTime) : "";
  const duration = outTime ? getTimeDifferenceISO(inTime, outTime) : null;
  const formattedDuration = duration
    ? getFormattedDuration(duration.hours, duration.minutes)
    : "";

  const formattedMonth = fullMonthNames[month];

  const formattedDay = getISODate(inTime);
  const formattedNote = note ? note : "";

  return {
    formattedInTime,
    formattedOutTime,
    formattedDuration,
    formattedMonth,
    formattedDay,
    formattedNote,
  };
};
