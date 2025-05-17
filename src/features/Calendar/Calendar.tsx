"use client";

import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import DateAttendance from "./Components/DateAttendance";
import Button from "@/shared/components/Button/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ensureAuth } from "@/lib/session/auth";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";

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
    <MainPane className="h-[calc(100vh-3rem)]">
      <DefaultAppBar
        pageTitle="Calendar"
        pageDescription="View work per date"
      />
      <section className="flex flex-col flex-1 overflow-y-scroll py-2 px-4">
        <DatePicker
          disableFuture
          label="Select a date"
          value={date}
          onChange={handleDateChange}
        />
        <div className="divider"></div>
        <DateAttendance date={date} />
      </section>
    </MainPane>
  );
};

export default Calendar;
