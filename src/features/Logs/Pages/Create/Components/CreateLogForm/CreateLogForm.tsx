"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import Button from "@mui/material/Button";
import { Dayjs } from "dayjs";
import useEmployee from "@/shared/queryState/useEmployee";
import useOnSubmit from "./Hooks/useOnSubmit";
import getDuration from "./Helpers/getDuration";

const SelectEmployee = dynamic(() => import("../SelectEmployee"), {
  ssr: false,
  loading: () => <div>Loading Employees...</div>,
});

export default function CreateLogForm() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const { employee } = useEmployee();
  const duration = getDuration(startDate, endDate);
  const onSubmit = useOnSubmit();

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleOnSubmit = () => {
    if (startDate && endDate && employee) {
      onSubmit(startDate, endDate, employee, reset);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-6 px-4" action={handleOnSubmit}>
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
        Total: {duration.hours} hr {duration.minutes} min
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
