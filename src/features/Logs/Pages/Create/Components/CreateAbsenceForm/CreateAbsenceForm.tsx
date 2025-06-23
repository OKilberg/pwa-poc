"use client";

import React, { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import { Dayjs } from "dayjs";
import useEmployee from "@/shared/queryState/useEmployee";
import useOnSubmit from "./Hooks/useOnSubmit";
import getDuration from "./Helpers/getDuration";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AbsenceCause } from "@/lib/dbTypes";
import { absenceCauses } from "@/lib/constants";
import { useTranslations } from "next-intl";

const SelectEmployee = dynamic(() => import("../SelectEmployee"), {
  ssr: false,
  loading: () => <div>Loading Employees...</div>,
});

export default function CreateAbsenceForm() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [cause, setCause] = useState<AbsenceCause>("sickLeave");
  const [note, setNote] = useState<string | undefined>(undefined);
  const { employee } = useEmployee();
  const duration = getDuration(startDate, endDate);
  const onSubmit = useOnSubmit();
  const t = useTranslations("Absence");

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setNote(undefined);
    setCause("sickLeave");
  };

  const handleOnSubmit = () => {
    if (startDate && employee) {
      onSubmit(startDate, endDate, employee, cause, note, reset);
    }
  };

  const handleUpdateCause = (e: ChangeEvent<HTMLSelectElement>) => {
    const cause = e.target.value as AbsenceCause;

    setCause(cause);
  };

  return (
    <form className="grid grid-cols-2 gap-6 px-4" action={handleOnSubmit}>
      <div className="col-span-2">
        <SelectEmployee />
      </div>
      <label className="form-control col-span-2 w-full">
        <div className="label">
          <span className="label-text">Pick absence cause</span>
        </div>
        <select
          defaultValue={"select"}
          className="select md:select-lg select-bordered w-full"
          onChange={handleUpdateCause}
        >
          <option disabled value={"select"}>
            Select cause for absence
          </option>
          {Array.from(absenceCauses.entries()).map(([key, cause]) => (
            <option key={key} value={cause}>
              {t(cause)}
            </option>
          ))}
        </select>
      </label>
      <MobileDatePicker
        name="startDate"
        value={startDate}
        onAccept={setStartDate}
        label="Start"
      />
      <MobileDatePicker
        name="endDate"
        value={endDate}
        onAccept={setEndDate}
        label="End"
      />
      <div className="col-span-2 md:col-span-1">Total: {duration} day(s)</div>
      <label className="form-control col-span-2 md:col-span-1">
        <div className="label">
          <span className="label-text">Your note</span>
          <span className="label-text-alt ">(optional)</span>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="textarea textarea-bordered textarea-lg w-full "
          placeholder="E.g. Migraine, back pain, doctor's appointment"
        ></textarea>
      </label>

      <div className="flex justify-end gap-4 col-span-2">
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
