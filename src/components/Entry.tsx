import { EntryItem } from "@/lib/types";
import React from "react";

type Props = {
  entryItem: EntryItem;
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

const Entry = ({ entryItem }: Props) => {
  const { id, code, in: inTime, out } = entryItem;
  const inTimeObj = getTime(inTime);
  const outTimeObj = getTime(out);

  return (
    <tr>
      <th>{code}</th>
      <td>
        <div className="badge badge-outline">
          {getFormattedTimeString(inTimeObj)}
        </div>
      </td>
      <td>
        <div className="badge badge-outline">
          {getFormattedTimeString(outTimeObj)}
        </div>
      </td>
      <td>?</td>
    </tr>
  );
};

export default Entry;
