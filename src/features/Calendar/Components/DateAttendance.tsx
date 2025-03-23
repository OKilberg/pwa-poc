"use client";

import useQuery, { promiseCache } from "@/features/Home/Components/useQuery";
import { editLogEntry, getRecordsByDate } from "@/lib/db/logs";
import { getEmployeesMap } from "@/lib/db/users";
import ListItem from "@/shared/components/ListItem";
import { getISOTime } from "@/util/util";
import { Dayjs } from "dayjs";
import React from "react";
import { MobileTimePicker } from "@mui/x-date-pickers";



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
        const { id, inTime, outTime, userId } = log;
        const employee = employees.get(userId);
        const timeIn = getISOTime(inTime);
        const timeOut = outTime ? getISOTime(outTime) : "Ongoing";

        const setOutTime = async (value: Dayjs | null)=>{
          if(value){
            const isoOutTime = value.toISOString()
            await editLogEntry(id, {outTime: isoOutTime})
            value.get('year')
            promiseCache.delete("clockedIn");
            promiseCache.delete(`att-${id}-${value.get('year')}`);
            promiseCache.delete(key)
          }
        }

        return (
          <ListItem key={index}>
            <div className="flex-1">
            <details className="flex flex-col">
              <summary className="flex ">
              <p className="flex-1 md:text-2xl">
              {employee?.firstName} {employee?.lastName}
            </p>
            <p className="flex-1 md:text-2xl text-right">
              {timeIn} - {timeOut}
            </p>
              </summary>
              <div className="flex items-center justify-end">
                {
                  !outTime && <div className="flex items-center">
                  Set out: <MobileTimePicker onAccept={setOutTime} ampm={false}/>
                  </div>
                } 
              </div>
            </details>
            </div>
          </ListItem>
        );
      })}
    </ul>
  );
};

export default DateAttendance;
