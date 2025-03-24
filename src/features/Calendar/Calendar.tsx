"use client";

import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DateAttendance from "./Components/DateAttendance";
import Button from "@/shared/components/Button/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ensureAuth } from "@/lib/session/auth";

const Calendar = () => {
  ensureAuth();
  const { push } = useRouter();
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainPane>
        <Header>
          <HeaderTitle>Calendar</HeaderTitle>
        </Header>
        <Content>
          <DatePicker
            disableFuture
            label="Select a date"
            value={date}
            onChange={handleDateChange}
          />
          <DateAttendance date={date} />
          <div>
            <Button variant="tertiary" onClick={() => push("/admin")}>
              <ArrowLeft className="" />
              Back
            </Button>
          </div>
        </Content>
      </MainPane>
    </LocalizationProvider>
  );
};

export default Calendar;
