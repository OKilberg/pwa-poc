"use client";

import React, { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import useOnSubmit from "./Hooks/useOnSubmit";
import getDuration from "./Helpers/getDuration";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AbsenceCause, WorkAbsence } from "@/lib/dbTypes";
import { absenceCauses } from "@/lib/constants";
import { useTranslations } from "next-intl";

type EditAbsenceForm = Pick<
  WorkAbsence,
  "cause" | "dateEnd" | "dateStart" | "id" | "note" | "userId"
>;

export default function EditAbsenceForm({
  cause: originalCause,
  dateEnd: originalDateEnd,
  dateStart: originalDateStart,
  id,
  userId,
  note: originalNote,
}: EditAbsenceForm) {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(originalDateStart)
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(originalDateEnd));
  const [cause, setCause] = useState<AbsenceCause>(originalCause);
  const [note, setNote] = useState<string | undefined>(
    originalNote ?? undefined
  );

  const duration = getDuration(startDate, endDate);
  const onSubmit = useOnSubmit();
  const t = useTranslations("Absence");

  const reset = () => {
    setStartDate(dayjs(originalDateStart));
    setEndDate(dayjs(originalDateEnd));
    setCause(originalCause);
    setNote(originalNote ?? undefined);
    setCause(originalCause);
  };

  const handleOnSubmit = () => {
    if (startDate) {
      onSubmit(startDate, endDate, cause, note, id, userId);
    }
  };

  const handleUpdateCause = (e: ChangeEvent<HTMLSelectElement>) => {
    const cause = e.target.value as AbsenceCause;

    setCause(cause);
  };

  return (
    <form className="grid grid-cols-2 gap-6 px-4" action={handleOnSubmit}>
      <label className="form-control col-span-2 w-full">
        <div className="label">
          <span className="label-text">Pick absence cause</span>
        </div>
        <select
          className="select md:select-lg select-bordered w-full"
          onChange={handleUpdateCause}
          value={cause}
        >
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
          Save
        </Button>
      </div>
    </form>
  );
}
