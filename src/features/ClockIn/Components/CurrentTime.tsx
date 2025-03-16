"use client";

import { DATE_LOCALE, TIME_LOCALE } from "@/app/constants";
import React, { useEffect, useState } from "react";

const TIME_5_SECONDS = 5 * 1000;

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const getTimeHours = () => {
    const timeHours = currentTime.toLocaleTimeString(TIME_LOCALE, {
      hour: "2-digit",
    });

    return timeHours;
  };

  const getTimeMinutes = () => {
    const timeSeconds = currentTime.toLocaleTimeString(TIME_LOCALE, {
      minute: "2-digit",
    });

    return timeSeconds;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_5_SECONDS);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="countdown font-mono">
      <CounterNumber count={getTimeHours()} />:
      <CounterNumber count={getTimeMinutes()} />
    </span>
  );
};

const CounterNumber = ({ count }: { count: string }) => {
  return (
    <div
      style={{ "--value": count } as React.CSSProperties}
      aria-live="polite"
      aria-label={count}
    >
      {count}
    </div>
  );
};

export default CurrentTime;
