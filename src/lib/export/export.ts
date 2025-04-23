import { utils, writeFileXLSX } from "xlsx";
import { getRecordsByMonthYear, getRecordsByUserMonthYear } from "../db/logs";
import { getEmployeesMap } from "../db/users";
import { fullMonthNames } from "../date/constants";
import { User } from "../dbTypes";
import {
  appendSheetToWorkbook,
  createWorkbookSheetFromJson,
  exportWorkbook,
  getFormattedLogInfo,
  getWorkbookFilename,
} from "./utils";
import { getWorkAbsenceByYearMonth } from "../db/absence";
import { getAbsencesFormatted } from "./format";

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

  const logsSheet = createWorkbookSheetFromJson(logsWithEmployeeInfo);
  // const logsSheet = utils.json_to_sheet(logsWithEmployeeInfo); // TODO: Extract each sheet to a function
  const absencesSheet = await createAbsenceWorkbookSheet(year, month);

  appendSheetToWorkbook(workbook, logsSheet, "Work logs");
  appendSheetToWorkbook(workbook, absencesSheet, "Absence logs");

  const workbookFilename = getWorkbookFilename("WorkLogExport", year, month);

  exportWorkbook(workbook, workbookFilename);
};

const createAbsenceWorkbookSheet = async (year: number, month: number) => {
  const absences = await getWorkAbsenceByYearMonth(year, month);

  const formattedAbsences = await getAbsencesFormatted(absences);

  const absencesSheet = createWorkbookSheetFromJson(formattedAbsences);

  return absencesSheet;
};

// TODO
export const exportMonthlyAbsenceToXLSX = async (
  year: number,
  month: number
) => {
  const absences = await getWorkAbsenceByYearMonth(year, month);

  const formattedAbsences = await getAbsencesFormatted(absences);

  const workbook = utils.book_new();
  const logsSheet = utils.json_to_sheet(absences);
};
