import React from "react";
import { AlarmClockMinus, Check, Minus } from "lucide-react";
import { AlarmClockCheck, AlarmClock, BriefcaseBusiness } from "lucide-react";
import { getCurrentTime } from "@/util/util";

type Props = {};

const EntryTimeline = (props: Props) => {
  return (
    <ul className="timeline not-prose flex w-full mt-8">
      <li className="grow">
        <div className="timeline-start flex flex-col items-center">
          <p className="font-mono text-sm">Check In</p>
          <time className="stat-value text-base">{getCurrentTime()}</time>
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
        <hr />
      </li>
      <li className="grow">
        <hr />
        <div className="timeline-start flex flex-col items-center">
          <p className="font-mono text-sm">Check Out</p>
          <time className="stat-value text-base">
            <Minus />
          </time>
        </div>
        <div className="timeline-middle">
          <AlarmClock />
        </div>
      </li>
    </ul>
  );
};

export default EntryTimeline;
