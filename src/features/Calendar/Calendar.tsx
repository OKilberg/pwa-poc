"use client";

import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import { ensureAuth } from "@/lib/session/auth";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import CalendarProvider from "./Context/CalendarProvider";
import CalendarDatePicker from "./Components/CalendarDatePicker/CalendarDatePicker";
import DateAttendance from "./Components/DateAttendance/DateAttendance";
import usePageTitle from "./Hooks/usePageTitle";

const Calendar = () => {
  ensureAuth();
  const pageTitle = usePageTitle();

  return (
    <CalendarProvider>
      <MainPane className="h-[calc(100vh-3rem)] min-h-0">
        <DefaultAppBar
          pageTitle={pageTitle}
          pageDescription="View work per date"
          url="/admin"
        />
        <section className="flex flex-col flex-1 overflow-y-scroll py-2 px-4">
          <CalendarDatePicker />
          <div className="divider my-2" />
          <DateAttendance />
        </section>
      </MainPane>
    </CalendarProvider>
  );
};

export default Calendar;
