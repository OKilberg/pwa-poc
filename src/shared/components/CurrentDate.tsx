"use client";

import React from "react";
import useCurrentTime from "../hooks/useCurrentTime";

type Props = {};

const CurrentDate = (props: Props) => {
  const currentTime = useCurrentTime();

  const dateWeekdayDayMonth = currentTime.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return <div>{dateWeekdayDayMonth}</div>;
};

export default CurrentDate;
