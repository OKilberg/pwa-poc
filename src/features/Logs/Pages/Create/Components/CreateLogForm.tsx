"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import Button from "@mui/material/Button";
import { Dayjs } from "dayjs";
import { getTimeDifferenceISO } from "@/util/util";
import { addLogEntry } from "@/lib/db/logs";
import { NewLogEntry } from "@/lib/dbTypes";
import useEmployee from "@/features/Logs/Hooks/useEmployee";
import toast from "react-hot-toast";

const SelectEmployee = dynamic(() => import("./SelectEmployee"), {
  ssr: false,
  loading: () => <div>Loading Employees...</div>,
});

export default function CreateLogForm() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const { employee } = useEmployee();

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const onSubmit = () => {
    if (startDate && endDate && employee) {
      const logEntry: NewLogEntry = {
        userId: Number(employee),
        inTime: startDate.toISOString(),
        outTime: endDate.toISOString(),
        month: startDate.month(),
        year: startDate.year(),
        note: "Entry registered by admin",
      };

      addLogEntry(logEntry)
        .then(() => {
          toast.success("Created log entry");
          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const duration =
    startDate && endDate
      ? getTimeDifferenceISO(startDate?.toISOString(), endDate?.toISOString())
      : { hours: 0, minutes: 0 };

  return (
    <form className="grid grid-cols-2 gap-6 px-4" action={onSubmit}>
      <div className="col-span-2">
        <SelectEmployee />
      </div>
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
          Create
        </Button>
      </div>
    </form>
  );
}
