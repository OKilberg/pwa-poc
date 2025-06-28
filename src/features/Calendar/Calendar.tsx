"use client";

import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import { ensureAuth } from "@/lib/session/auth";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import CalendarProvider from "./Context/CalendarProvider";
import CalendarDatePicker from "./Components/CalendarDatePicker/CalendarDatePicker";
import DateAttendance2 from "./Components/DateAttendance/DateAttendance";

const Calendar = () => {
  ensureAuth();

  return (
    <CalendarProvider>
      <MainPane className="h-[calc(100vh-3rem)] min-h-0">
        <DefaultAppBar
          pageTitle="Calendar"
          pageDescription="View work per date"
          url="/admin"
        />
        <section className="flex flex-col flex-1 overflow-y-scroll py-2 px-4">
          <CalendarDatePicker />
          <div className="divider my-2" />
          <DateAttendance2 />
        </section>
      </MainPane>
    </CalendarProvider>
  );
};

export default Calendar;
