import { LogEntry } from "@/lib/dbTypes";
import {
  convertMinutesToHoursAndMinutes,
  getTimeDifferenceMinutesISO,
} from "@/util/util";

const getLogsTimeTotal = (logs: Array<LogEntry>) => {
  const totalMinutes = logs.reduce((acc, log) => {
    const { inTime, outTime } = log;
    if (outTime) {
      const minutes = getTimeDifferenceMinutesISO(inTime, outTime);
      acc = acc + minutes;
    }

    return acc;
  }, 0);

  const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);

  return `${hours}h ${minutes}m`;
};

export default getLogsTimeTotal;
