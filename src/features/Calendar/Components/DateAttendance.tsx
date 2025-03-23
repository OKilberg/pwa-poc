"use client";

import useQuery from "@/features/Home/Components/useQuery";
import { getRecordsByDate } from "@/lib/db/logs";
import { getEmployeesMap } from "@/lib/db/users";
import ListItem from "@/shared/components/ListItem";
import { getISOTime } from "@/util/util";
import { Dayjs } from "dayjs";
import React from "react";

const DateAttendance = ({ date }: { date: Dayjs }) => {
  if (!date) return null;

  const dateFormatted = date.format("YYYY-MM-DD");
  const key = String(`date-${dateFormatted}`);

  console.log("dateFormatted", dateFormatted);

  const logs = useQuery({
    fn: () => getRecordsByDate(dateFormatted),
    key: key,
  });

  const employees = useQuery({ fn: getEmployeesMap, key: "employeesMap" });

  if (logs.length === 0) {
    return <p>No logs found for the selected date.</p>;
  }

  return (
    <ul className="flex flex-col gap-2 w-full max-h-[300px] overflow-scroll">
      {logs?.map((log, index) => {
        const { inTime, outTime, userId } = log;
        const employee = employees.get(userId);
        const timeIn = getISOTime(inTime);
        const timeOut = outTime ? getISOTime(outTime) : "Ongoing";

        return (
          <ListItem key={index}>
            <p className="flex-1 md:text-2xl">
              {employee?.firstName} {employee?.lastName}
            </p>
            <p className="flex-1 md:text-2xl text-right">
              {timeIn} - {timeOut}
            </p>
          </ListItem>
        );
      })}
    </ul>
  );
};

export default DateAttendance;
