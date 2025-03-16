"use client";

import React from "react";
import useCurrentTime from "../hooks/useCurrentTime";
import { DATE_LOCALE } from "@/app/constants";

const CurrentDate = () => {
  const currentTime = useCurrentTime();

  const dateWeekdayDayMonth = currentTime.toLocaleDateString(DATE_LOCALE, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return <div>{dateWeekdayDayMonth}</div>;
};

export default CurrentDate;
