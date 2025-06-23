import { LogEntry } from "@/lib/dbTypes";
import getReadableLog from "./getReadableLog";

const getLogLabel = (log: LogEntry) => {
  const { id, duration, startTime, startDate, endTime, endDate, month } =
    getReadableLog(log);

  const showEndDate = startDate !== endDate;

  const label = `Log #${id} (${month} ${startDate}, ${startTime} - 
  ${showEndDate ? endDate : ""} ${endTime}, ${duration})`;

  return label;
};

export default getLogLabel;
