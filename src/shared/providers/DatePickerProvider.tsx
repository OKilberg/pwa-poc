"use client";

import React from "react";
import { ParentComponent } from "../components/types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import "dayjs/locale/en-gb";
import dayjs from "dayjs";

dayjs.locale("en-gb");

const DatePickerProvider = ({ children }: ParentComponent) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      {children}
    </LocalizationProvider>
  );
};

export default DatePickerProvider;
