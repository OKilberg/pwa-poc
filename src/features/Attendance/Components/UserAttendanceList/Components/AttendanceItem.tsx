import { LogEntry } from "@/lib/dbTypes";
import { ensureAuth, isAdminSession } from "@/lib/session/auth";
import Button from "@/shared/components/Button/Button";
import {
  convertMinutesToHoursAndMinutes,
  getISODate,
  getISOTime,
  getTimeDifferenceISO,
  getTimeDifferenceMinutesISO,
} from "@/util/util";
import { ChevronDown, HardDriveDownload } from "lucide-react";
import React from "react";

type AttendanceItemProps = {
  logs: Array<LogEntry>;
  month: string;
  exportMonth: () => void;
};

const getTimeTotal = (logs: Array<LogEntry>) => {
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

const AttendanceItem = ({ logs, month, exportMonth }: AttendanceItemProps) => {
  const shifts = logs.length;
  const timeTotal = getTimeTotal(logs);
  return (
    <li className="flex p-2 md:p-5 bg-[#EAEAEA] rounded-md md:rounded-2xl">
      <details className="flex flex-col w-full group">
        <summary className="flex w-full text-sm">
          <p className="flex-1 md:text-2xl">{month}</p>
          <p className="flex-1 text-center md:text-xl font-light">
            {shifts} shifts
          </p>
          <p className="flex-1 text-right md:text-xl font-light">{timeTotal}</p>
          <p className="flex-1 text-right text-xl font-light">
            <ChevronDown className="ml-auto group-open:rotate-180" />
          </p>
        </summary>
        <ul className="mt-2">
          {logs.map((log, index) => {
            const { inTime, outTime } = log;
            const day = getISODate(inTime);
            return (
              <EntryItem
                key={index}
                day={day}
                inTime={inTime}
                outTime={outTime}
              />
            );
          })}
          {isAdminSession() && (
            <li className="flex w-full flex-row-reverse text-sm md:text-md mt-2">
              <Button variant="positive" onClick={exportMonth} size="xs">
                <HardDriveDownload className="size-4" />
                Export {month}
              </Button>
            </li>
          )}
        </ul>
      </details>
    </li>
  );
};

type EntryItemProps = {
  day: string;
  inTime: string;
  outTime: string | null;
};

const EntryItem = ({ day, inTime, outTime }: EntryItemProps) => {
  const currentDate = new Date().toISOString();
  const diffTime = outTime ? outTime : currentDate;
  const { hours, minutes } = getTimeDifferenceISO(inTime, diffTime);
  const timeTotal = outTime ? `${hours}h ${minutes}m` : "";
  const timeIn = getISOTime(inTime);
  const timeOut = outTime ? getISOTime(outTime) : "Ongoing";

  return (
    <li className="flex w-full py-1 text-sm font-light">
      <p className="flex-1">{day}</p>
      <p className="flex-1 text-center">{`${timeIn} - ${timeOut}`}</p>
      <p className="flex-1 text-right">{timeTotal}</p>
    </li>
  );
};

export default AttendanceItem;
