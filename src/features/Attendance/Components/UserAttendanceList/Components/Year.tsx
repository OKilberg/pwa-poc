import useQuery from "@/features/Home/Components/useQuery";
import { getRecordsByUserYear } from "@/lib/db/logs";
import { LogEntry } from "@/lib/dbTypes";
import React from "react";
import AttendanceItem from "./AttendanceItem";
import { fullMonthNames } from "@/lib/date/constants";

type Props = {
  userId: number;
  year: number;
};

const getMonthsMatrix = (yearLogs: Array<LogEntry>) => {
  const monthsMatrix: Array<Array<LogEntry>> = Array.from(
    { length: 12 },
    () => []
  ); // Create an array of length 12

  // Add all the logs to their respective month-array
  for (let i = yearLogs.length - 1; i >= 0; i--) {
    const log = yearLogs[i];
    const { month } = log;

    monthsMatrix[month].push(log);
  }

  return monthsMatrix;
};

export const Year = ({ userId, year }: Props) => {
  const yearLogs = useQuery({
    fn: () => getRecordsByUserYear(userId, year),
    key: `att-${userId}-${year}`,
  });

  const monthsMatrix = getMonthsMatrix(yearLogs);

  return (
    <>
      <time className="divider">{2025}</time>
      {monthsMatrix.map((month, index) => {
        if (month.length === 0) return null;
        return (
          <AttendanceItem
            key={index}
            logs={month}
            month={fullMonthNames[index]}
          />
        );
      })}
    </>
  );
};
