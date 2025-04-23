"use client";

import useQuery from "@/features/Home/Components/useQuery";
import { getUser } from "@/lib/db/users";
import { AbsenceCause, User } from "@/lib/dbTypes";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { absenceCauses } from "@/lib/constants";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Button from "@/shared/components/Button/Button";
import useOnClick from "./Hooks/useOnClick";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MainPane from "@/shared/components/MainPane/MainPane";
import Header from "@/shared/components/Header/Header";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import Content from "@/shared/components/Content/Content";
import "dayjs/locale/en-gb";
import { useTranslations } from "next-intl";

dayjs.locale("en-gb");

type AbsenceProps = {
  userId: User["id"];
};

const RegisterAbsence = ({ userId }: AbsenceProps) => {
  const user = useQuery({ fn: () => getUser(userId), key: `user-${userId}` });
  const t = useTranslations("Absence");
  const [cause, setCause] = useState<AbsenceCause>("sickLeave");
  const [dateStart, setDateStart] = useState<Dayjs>(dayjs());
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);
  const [note, setNote] = useState<string | undefined>(undefined);
  const { back } = useRouter();
  const onClick = useOnClick();

  if (!user) {
    return (
      <MainPane>
        <Content>
          <span className="loading loading-spinner loading-lg"></span>
        </Content>
      </MainPane>
    );
  }

  const handleStartDateChange = (value: Dayjs | null) => {
    if (value) {
      setDateStart(value);
    }
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const cause = e.target.value as AbsenceCause;

    setCause(cause);
  };

  const { firstName, lastName, idn, id } = user;
  const employeeDetails = `${firstName} ${lastName} (${idn})`;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <MainPane>
        <Header>
          <HeaderTitle>Report Absence</HeaderTitle>
          <HeaderSubtitle>{employeeDetails}</HeaderSubtitle>
        </Header>
        <Content>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pick absence cause</span>
            </div>
            <select
              defaultValue={"select"}
              className="select md:select-lg select-bordered w-full md:max-w-md"
              onChange={onSelectChange}
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
          <div className="flex w-full items-center justify-center gap-2">
            <DatePicker
              label="Start date"
              value={dateStart}
              onChange={handleStartDateChange}
            />
            -
            <DatePicker
              label="End date"
              value={dateEnd}
              onChange={setDateEnd}
            />
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Your note</span>
              <span className="label-text-alt ">(optional)</span>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              placeholder="E.g. Migraine, back pain, doctor's appointment"
            ></textarea>
          </label>

          <div className="modal-action">
            <Button variant="secondary" size="sm" onClick={back}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              onClick={() => onClick(id, cause, dateStart, dateEnd, note)}
            >
              Submit
            </Button>
          </div>
        </Content>
      </MainPane>
    </LocalizationProvider>
  );
};

export default RegisterAbsence;
