import { removeLogEntry } from "@/lib/db/logs";
import { LogEntry } from "@/lib/dbTypes";
import { clearUserLogsCache } from "@/lib/queryCache/queryCache";
import { isAdminSession } from "@/lib/session/auth";
import Button from "@/shared/components/Button/Button";
import ListItem from "@/shared/components/ListItem";
import useUser from "@/shared/context/ReportsContext/ContextHooks/useUser";
import {
  convertMinutesToHoursAndMinutes,
  getISODate,
  getISOTime,
  getTimeDifferenceISO,
  getTimeDifferenceMinutesISO,
} from "@/util/util";
import Drawer from "@mui/material/Drawer";
import {
  ChevronDown,
  Ellipsis,
  HardDriveDownload,
  PlayCircle,
  SquarePen,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type AttendanceItemProps = {
  logs: Array<LogEntry>;
  month: string;
  exportMonth: () => void;
};

const getTimeTotal = (logs: Array<LogEntry>) => {
  const totalMinutes = logs.reduce((acc, log) => {
    const { inTime, outTime } = log;
    if (outTime) {
      const minutes = getTimeDifferenceMinutesISO(inTime, outTime);
      acc = acc + minutes;
    }

    return acc;
  }, 0);

  const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);

  return `${hours}h ${minutes}m`;
};

const AttendanceItem = ({ logs, month, exportMonth }: AttendanceItemProps) => {
  const shifts = logs.length;
  const timeTotal = getTimeTotal(logs);
  const { push } = useRouter();

  return (
    <li className="flex p-2 md:p-5 bg-[#EAEAEA] rounded-md md:rounded-2xl">
      <details className="flex flex-col w-full group">
        <summary className="flex w-full text-sm">
          <p className="flex-1 md:text-2xl">{month}</p>
          <p className="flex-1 text-center md:text-xl font-light">
            {shifts} shifts
          </p>
          <p className="flex-1 text-right md:text-xl font-light">{timeTotal}</p>
          <p className="flex-1 text-right text-xl font-light">
            <ChevronDown className="ml-auto group-open:rotate-180" />
          </p>
        </summary>
        <ul className="mt-2 flex flex-col gap-2">
          {logs.map((log, index) => {
            const { inTime, outTime, id } = log;
            const day = getISODate(inTime);
            return (
              <EntryItem
                key={index}
                day={day}
                inTime={inTime}
                outTime={outTime}
                id={id}
              />
            );
          })}
          {isAdminSession() && (
            <li className="flex w-full flex-row-reverse text-sm md:text-md mt-4 gap-4">
              <Button variant="positive" onClick={exportMonth} size="xs">
                <HardDriveDownload className="size-4" />
                Export {month}
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  push(`/admin/logs/create?employee=${logs[0].userId}`)
                }
                size="xs"
              >
                <PlayCircle className="size-4" />
                Add log
              </Button>
            </li>
          )}
        </ul>
      </details>
    </li>
  );
};

type EntryItemProps = {
  day: string;
  inTime: string;
  outTime: string | null;
  id: number;
};

const EntryItem = ({ day, inTime, outTime, id }: EntryItemProps) => {
  const currentDate = new Date().toISOString();
  const diffTime = outTime ? outTime : currentDate;
  const { hours, minutes } = getTimeDifferenceISO(inTime, diffTime);
  const timeTotal = outTime ? `${hours}h ${minutes}m` : "";
  const timeIn = getISOTime(inTime);
  const timeOut = outTime ? getISOTime(outTime) : "Ongoing";
  const [showDrawer, setShowDrawer] = useState(false);
  const { push, refresh } = useRouter();
  const user = useUser();

  const archiveLog = () => {
    removeLogEntry(id)
      .then(() => {
        if (user) {
          const { id: userId } = user;
          clearUserLogsCache(userId, inTime);
          toast.success("Deleted log entry");
          refresh();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DrawerContent = (
    <div className="py-2 flex flex-col gap-2 min-h-[33vh]">
      <ListItem
        className="px-4 py-2 gap-4 bg-white"
        onClick={() => push(`/admin/logs/${id}/edit`)}
      >
        <SquarePen className="size-5" />
        Edit
      </ListItem>
      <ListItem
        className="px-4 py-2 gap-4 text-red-500 bg-white"
        onClick={archiveLog}
      >
        <Trash className="size-5" />
        Delete
      </ListItem>
    </div>
  );

  return (
    <li className="flex w-full py-2 px-2 rounded-sm text-sm font-base bg-gray-100">
      <p className="flex-1">{day}</p>
      <p className="flex-1 text-center">{`${timeIn} - ${timeOut}`}</p>
      <p className="flex-1 text-right">{timeTotal}</p>
      {isAdminSession() && (
        <p className="text-right ml-6" onClick={() => setShowDrawer(true)}>
          <Ellipsis />
        </p>
      )}
      <Drawer
        variant="temporary"
        open={showDrawer}
        anchor="bottom"
        onClick={() => setShowDrawer(false)}
      >
        {DrawerContent}
      </Drawer>
    </li>
  );
};

export default AttendanceItem;
