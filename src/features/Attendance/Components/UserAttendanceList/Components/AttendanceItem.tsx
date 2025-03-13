import React from "react";

type AttendanceItemProps = {
  month: string;
  entries: number;
  timeTotal: string;
};

const AttendanceItem = ({ month, entries, timeTotal }: AttendanceItemProps) => {
  return (
    <li className="flex p-5 bg-[#EAEAEA] rounded-2xl">
      <details className="flex flex-col w-full">
        <summary className="flex w-full">
          <p className="flex-1 text-2xl">{month}</p>
          <p className="flex-1 text-center text-xl font-light">
            {entries} shifts
          </p>
          <p className="flex-1 text-right text-xl font-light">{timeTotal}</p>
        </summary>
        <ul className="mt-2">
          <EntryItem
            day="Thu 1"
            inTime="09:30"
            outTime="12:30"
            timeTotal="3h"
          />
          <EntryItem
            day="Thu 1"
            inTime="09:30"
            outTime="12:30"
            timeTotal="3h"
          />
          <EntryItem
            day="Thu 1"
            inTime="09:30"
            outTime="12:30"
            timeTotal="3h"
          />
          <EntryItem
            day="Thu 1"
            inTime="09:30"
            outTime="12:30"
            timeTotal="3h"
          />
          <EntryItem
            day="Thu 1"
            inTime="09:30"
            outTime="12:30"
            timeTotal="3h"
          />
        </ul>
      </details>
    </li>
  );
};

type EntryItemProps = {
  day: string;
  inTime: string;
  outTime: string;
  timeTotal: string;
};

const EntryItem = ({ day, inTime, outTime, timeTotal }: EntryItemProps) => {
  return (
    <li className="flex w-full py-1">
      <p className="flex-1">{day}</p>
      <p className="flex-1 text-center">{`${inTime} - ${outTime}`}</p>
      <p className="flex-1 text-right">{timeTotal}</p>
    </li>
  );
};

export default AttendanceItem;
