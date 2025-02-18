import { EntryItem } from "@/app/entries/page";
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

const getTime = (isoDate: string) => {
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

const getFormattedTimeString = (timeObj: TimeObj) => {
  const { day, hour, minute, month, year } = timeObj;

  if (isNaN(day)) {
    return "?";
  }

  const formattedTimeString = `${hour}:${minute} ${day}/${month}`;

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

  return (
    <div className="card card-compact bg-neutral text-neutral-content w-64">
      <div className="card-body items-center text-center">
        <span className="card-title">Employee {code}</span>
        <div className="card-actions justify-end">
          <span className="badge badge-primary">
            In: {getFormattedTimeString(inTimeObj)}
          </span>
          <span className="badge badge-secondary">
            Out: {getFormattedTimeString(outTimeObj)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Entry;
