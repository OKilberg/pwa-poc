import { getISODate, getISOTime, getTimeDifferenceISO } from "@/util/util";
import { LogEntry } from "../dbTypes";
import { fullMonthNames } from "../date/constants";
import { utils, WorkBook, WorkSheet, writeFileXLSX } from "xlsx";

export const getFormattedDuration = (hours: number, minutes: number) => {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDuration = `${hours}:${formattedMinutes}`;

  return formattedDuration;
};

export const getFormattedLogInfo = (log: LogEntry) => {
  const { inTime, outTime, month, note } = log;

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

export const createWorkbookSheetFromJson = <T>(data: Array<T>) => {
  const workbookSheet = utils.json_to_sheet(data);

  return workbookSheet;
};

export const appendSheetToWorkbook = (
  workbook: WorkBook,
  sheet: WorkSheet,
  sheetName: string
) => {
  utils.book_append_sheet(workbook, sheet, sheetName);
};

export const getWorkbookFilename = (
  prefix: string,
  year: number,
  month: number
) => {
  const workBookFilename = `${prefix}${year}-${month + 1}.xlsx`;

  return workBookFilename;
};

export const exportWorkbook = (workbook: WorkBook, fileName: string) => {
  writeFileXLSX(workbook, fileName);
};
