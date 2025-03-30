"use client";

import useQuery, { promiseCache } from "@/features/Home/Components/useQuery";
import { editLogEntry, getRecordsByDate } from "@/lib/db/logs";
import { getEmployeesMap } from "@/lib/db/users";
import ListItem from "@/shared/components/ListItem";
import { getISODate, getISOTime } from "@/util/util";
import { Dayjs } from "dayjs";
import React from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

const DateAttendance = ({ date }: { date: Dayjs }) => {
  const dateFormatted = date.format("YYYY-MM-DD");
  const key = String(`date-${dateFormatted}`);

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
        const date = getISODate(inTime);

        const setOutTime = async (value: Dayjs | null) => {
          if (value) {
            const isoOutTime = value.toISOString();
            const timeOut = getISOTime(isoOutTime);

            editLogEntry(id, {
              outTime: isoOutTime,
              note: "Revised end time, set by admin.",
            })
              .then(() => {
                value.get("year");
                promiseCache.delete("clockedIn");
                promiseCache.delete(`att-${employee?.id}-${value.get("year")}`);
                promiseCache.delete(key);

                const updateMessage = `Set out time for ${employee?.firstName} on ${date} to ${timeOut}.`;

                toast.success(updateMessage, {
                  icon: "📝",
                  className: "md:text-xl",
                  duration: 3000,
                });
              })
              .catch(() => {
                toast.error("Could not update out time.");
              });
          }
        };

        return (
          <ListItem key={index}>
            <div className="flex-1">
              <details className="flex flex-col group">
                <summary className="flex ">
                  <p className="flex-1 md:text-2xl">
                    {employee?.firstName} {employee?.lastName}
                  </p>
                  <p className="flex-1 md:text-2xl text-right">
                    {timeIn} - {timeOut}
                  </p>
                  <p className="flex-1 text-right text-xl font-light">
                    <ChevronDown className="ml-auto group-open:rotate-180" />
                  </p>
                </summary>
                <div className="flex items-center justify-end">
                  {!outTime && (
                    <div className="flex items-center pt-2 gap-2">
                      Set End Time
                      <MobileDateTimePicker
                        localeText={{
                          toolbarTitle: `Start Time: ${date} ${timeIn}`,
                        }}
                        className="w-24"
                        onAccept={setOutTime}
                        ampm={false}
                      />
                    </div>
                  )}
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
