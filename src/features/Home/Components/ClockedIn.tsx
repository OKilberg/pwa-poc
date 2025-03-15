import { getISOTime, getTimeDifferenceISO } from "@/util/util";
import React from "react";

type ClockedInProps = {
  firstname: string;
  lastname: string;
  inTime: string;
};

const ClockedIn = ({ firstname, lastname, inTime }: ClockedInProps) => {
  const time = getISOTime(inTime);
  const { hours, minutes } = getTimeDifferenceISO(
    inTime,
    new Date().toISOString()
  );
  return (
    <li
      suppressHydrationWarning={true}
      className="flex w-full p-2 md:p-5 items-center text-sm md:text-xl font-light"
    >
      <div className="flex flex-col flex-1 justify-center items-start gap-1">
        <p className="md:text-2xl">
          {firstname} {lastname}
        </p>
        <time suppressHydrationWarning={true}>{`${time} - Ongoing`}</time>
      </div>
      <div>{`${hours}h ${minutes}m`}</div>
    </li>
  );
};

export default ClockedIn;
