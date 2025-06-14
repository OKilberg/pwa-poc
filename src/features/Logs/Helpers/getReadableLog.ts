import { fullMonthNames } from "@/lib/date/constants";
import { LogEntry } from "@/lib/dbTypes";
import { getISOTime, getLogDuration } from "@/util/util";
import dayjs from "dayjs";

const getReadableLog = (log: LogEntry) => {
  const { id, inTime, month, note, outTime, userId, year } = log;

  const duration = outTime ? getLogDuration(inTime, outTime) : "Ongoing";
  const startTime = getISOTime(inTime);
  const startDate = dayjs(inTime).format("D/M");
  const endTime = outTime ? getISOTime(outTime) : "Ongoing";
  const endDate = outTime ? dayjs(outTime).format("D/M") : "Unknown";
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
