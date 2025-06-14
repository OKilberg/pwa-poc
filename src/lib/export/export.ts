import { utils } from "xlsx";
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
import {
  getWorkAbsenceByYearMonth,
  getWorkAbsenceByYearMonthUser,
} from "../db/absence";
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

  const logsSheet = createWorkbookSheetFromJson(logs);
  const absenceSheet = await createEmployeeAbsenceWorkbookSheet(
    id,
    year,
    month
  );

  appendSheetToWorkbook(workbook, logsSheet, sheetName);
  appendSheetToWorkbook(workbook, absenceSheet, `Absence ${sheetName}`);

  const employeesMap = await getEmployeesMap();
  const employee = employeesMap.get(id);

  if (employee) {
    const { firstName, lastName } = employee;

    const fileNamePrefix = `${firstName}${lastName}-WorkLogExport`;

    const workbookFilename = getWorkbookFilename(fileNamePrefix, year, month);

    exportWorkbook(workbook, workbookFilename);
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

const createEmployeeAbsenceWorkbookSheet = async (
  id: User["id"],
  year: number,
  month: number
) => {
  const absences = await getWorkAbsenceByYearMonthUser(year, month, id);

  console.log("absences", absences);
  const formattedAbsences = await getAbsencesFormatted(absences);
  console.log("absencesFormatted", absences);

  const absencesSheet = createWorkbookSheetFromJson(formattedAbsences);

  return absencesSheet;
};
