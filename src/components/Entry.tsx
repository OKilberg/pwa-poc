import { LogEntry } from "@/lib/dbTypes";
import { getHoursMinutesDifference } from "@/util/util";
import React from "react";

type Props = {
  logEntry: LogEntry;
};

type TimeObj = {
  minute: number;
  hour: number;
  day: number;
  month: number;
  year: number;
};

const getTime = (isoDate: string | null) => {
  if (!isoDate) return null;

  const date = new Date(isoDate);

  const timeObj: TimeObj = {
    minute: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  return timeObj;
};

const getFormattedTimeString = (timeObj: TimeObj | null) => {
  if (!timeObj) {
    return "?";
  }

  const { day, hour, minute, month, year } = timeObj;

  const completeHour = hour < 10 ? `0${hour}` : hour;
  const completeMinute = minute < 10 ? `0${minute}` : minute;

  const formattedTimeString = `${completeHour}:${completeMinute} ${day}/${month}`;

  return formattedTimeString;
};

const Entry = ({ logEntry }: Props) => {
  const { id, userId, inTime, outTime } = logEntry;
  const currentTime = new Date().toISOString();
  const finalOutTime = outTime ? outTime : currentTime;
  const inTimeObj = getTime(inTime);
  const outTimeObj = getTime(finalOutTime);
  const diff = getHoursMinutesDifference(inTime, finalOutTime);

  return (
    <tr>
      <th>{userId}</th>
      <td>
        <div className="font-mono">{getFormattedTimeString(inTimeObj)}</div>
      </td>
      <td>
        <div className="font-mono">{getFormattedTimeString(outTimeObj)}</div>
      </td>
      <td>{diff}</td>
    </tr>
  );
};

export default Entry;
