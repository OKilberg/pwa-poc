import { fullMonthNames } from "@/lib/date/constants";
import { LogEntry } from "@/lib/dbTypes";
import { getISODate, getISOTime, getLogDuration } from "@/util/util";

const getReadableLog = (log: LogEntry) => {
  const { id, inTime, month, note, outTime, userId, year } = log;

  const duration = outTime ? getLogDuration(inTime, outTime) : "Ongoing";
  const startTime = getISOTime(inTime);
  const startDate = getISODate(inTime);
  const endTime = outTime ? getISOTime(outTime) : "Ongoing";
  const endDate = outTime ? getISODate(outTime) : "Unknown";
  const monthReadable = fullMonthNames[month];

  return {
    id,
    userId,
    startTime,
    startDate,
    endTime,
    endDate,
    duration,
    month: monthReadable,
    year,
    note,
  };
};

export default getReadableLog;
