"use client";

import React, { useState } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import { getTimeDifferenceISO } from "@/util/util";
import { editLogEntry } from "@/lib/db/logs";
import { LogEntry, NewLogEntry } from "@/lib/dbTypes";
import toast from "react-hot-toast";
import {
  clearDateCacheKey,
  clearLogEditCacheKey,
  clearUserLogsCache,
} from "@/lib/queryCache/queryCache";

type EditLogForm = Pick<LogEntry, "id" | "inTime" | "outTime" | "userId">;

export default function EditLogForm({
  id,
  inTime,
  outTime,
  userId,
}: EditLogForm) {
  const startDateDayjs = dayjs(inTime);
  const endDateDayjs = outTime ? dayjs(outTime) : null;
  const [startDate, setStartDate] = useState<Dayjs | null>(startDateDayjs);
  const [endDate, setEndDate] = useState<Dayjs | null>(endDateDayjs);

  const reset = () => {
    setStartDate(startDateDayjs);
    setEndDate(endDateDayjs);
  };

  const onSubmit = () => {
    if (startDate && endDate) {
      const logEntry: Omit<NewLogEntry, "userId"> = {
        inTime: startDate.toISOString(),
        outTime: endDate.toISOString(),
        month: startDate.month(),
        year: startDate.year(),
        note: "Edited by admin",
      };

      editLogEntry(id, { ...logEntry })
        .then(() => {
          clearUserLogsCache(userId, logEntry.inTime);
          clearLogEditCacheKey(id);
          clearDateCacheKey(logEntry.inTime);

          toast.success("Saved log entry update");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(endDate);
  const duration =
    startDate && endDate
      ? getTimeDifferenceISO(startDate?.toISOString(), endDate?.toISOString())
      : { hours: 0, minutes: 0 };

  return (
    <form className="grid grid-cols-2 gap-6 px-4" action={onSubmit}>
      <MobileDateTimePicker
        name="startDate"
        value={startDate}
        onAccept={setStartDate}
        ampm={false}
        label="Start"
      />
      <MobileDateTimePicker
        name="endDate"
        value={endDate}
        onAccept={setEndDate}
        ampm={false}
        label="End"
      />
      <div>
        Total: {duration.hours}h {duration.minutes}m{" "}
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outlined" onClick={reset}>
          Reset
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
