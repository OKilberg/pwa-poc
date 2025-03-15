import { LogEntry } from "@/lib/dbTypes";
import {
  convertMinutesToHoursAndMinutes,
  getISODate,
  getISOTime,
  getTimeDifferenceISO,
  getTimeDifferenceMinutesISO,
} from "@/util/util";
import React from "react";

type AttendanceItemProps = {
  logs: Array<LogEntry>;
  month: string;
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

const AttendanceItem = ({ logs, month }: AttendanceItemProps) => {
  const shifts = logs.length;
  const timeTotal = getTimeTotal(logs);
  return (
    <li className="flex p-5 bg-[#EAEAEA] rounded-2xl">
      <details className="flex flex-col w-full">
        <summary className="flex w-full">
          <p className="flex-1 text-2xl">{month}</p>
          <p className="flex-1 text-center text-xl font-light">
            {shifts} shifts
          </p>
          <p className="flex-1 text-right text-xl font-light">{timeTotal}</p>
        </summary>
        <ul className="mt-2">
          {logs.map((log) => {
            const { inTime, outTime } = log;
            const day = getISODate(inTime);
            return <EntryItem day={day} inTime={inTime} outTime={outTime} />;
          })}
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
    <li className="flex w-full py-1">
      <p className="flex-1">{day}</p>
      <p className="flex-1 text-center">{`${timeIn} - ${timeOut}`}</p>
      <p className="flex-1 text-right">{timeTotal}</p>
    </li>
  );
};

export default AttendanceItem;
