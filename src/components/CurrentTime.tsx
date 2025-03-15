"use client";

import { Clock4 } from "lucide-react";
import React, { useEffect, useState } from "react";

const TIME_15_SECONDS = 15 * 1000;

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const getTimeHours = () => {
    const timeHours = currentTime.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
    });

    return timeHours;
  };

  const getTimeMinutes = () => {
    const timeSeconds = currentTime.toLocaleTimeString("sv-SE", {
      minute: "2-digit",
    });

    return timeSeconds;
  };

  const dateWeekdayDayMonth = currentTime.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_15_SECONDS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-tresYellow rounded-full p-2">
        <Clock4 />
      </div>
      <span className="countdown text-2xl font-semibold">
        <CounterNumber count={getTimeHours()} />
        :
        <CounterNumber count={getTimeMinutes()} />
      </span>
      <h3 className="text-lg font-light">{dateWeekdayDayMonth}</h3>
    </div>
  );
};

const CounterNumber = ({ count }: { count: string }) => {
  return (
    <span
      style={{ "--value": count } as React.CSSProperties}
      aria-live="polite"
      aria-label={count}
    >
      {count}
    </span>
  );
};

export default CurrentTime;
