import React from "react";
import {
  AlarmClock,
  AlarmClockCheck,
  BriefcaseBusiness,
  Minus,
} from "lucide-react";
import { getISOTime } from "@/util/util";

type Props = {
  checkIn: string;
  checkOut?: string;
};

const EntryTimeline = ({ checkIn, checkOut }: Props) => {
  const checkInTime = getISOTime(checkIn);
  const checkOutTime = checkOut ? getISOTime(checkOut) : null;
  const getTimelineHrClassName = checkOutTime ? "bg-success" : "";
  return (
    <ul className="timeline not-prose flex w-full mt-8">
      <li className="grow">
        <div className="timeline-start flex flex-col items-center">
          <p className="font-mono text-sm">Check In</p>
          <time className="stat-value text-base">{checkInTime}</time>
        </div>
        <div className="timeline-middle">
          <AlarmClockCheck />
        </div>

        <hr className="bg-success" />
      </li>
      <li className="grow">
        <hr className="bg-success" />
        <div className="timeline-middle">
          <BriefcaseBusiness />
        </div>
        <hr className={getTimelineHrClassName} />
      </li>
      <li className="grow">
        <hr className={getTimelineHrClassName} />
        <div className="timeline-start flex flex-col items-center">
          <p className="font-mono text-sm">Check Out</p>
          <time className="stat-value text-base">
            {checkOutTime ? checkOutTime : <Minus />}
          </time>
        </div>
        <div className="timeline-middle">
          {checkOutTime ? <AlarmClockCheck /> : <AlarmClock />}
        </div>
      </li>
    </ul>
  );
};

export default EntryTimeline;
