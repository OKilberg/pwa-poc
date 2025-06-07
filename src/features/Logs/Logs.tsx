"use client";

import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import useEmployee from "@/shared/queryState/useEmployee";
import React, { Suspense, useState } from "react";
import FilterMenu from "./Components/FilterMenu/FilterMenu";
import useMonth from "@/shared/queryState/useMonth";
import useQuery from "@/shared/hooks/useQuery";
import { getRecordsByUserMonthYear } from "@/lib/db/logs";
import { ParentComponent, Sizeable } from "@/shared/components/types";
import { getISOTime, getLogDuration } from "@/util/util";
import clsx from "clsx";
import { LogEntry } from "@/lib/dbTypes";
import { EllipsisVertical } from "lucide-react";
import Divider from "@/shared/components/Divider";
import LogActionsDrawer from "./Components/LogActionsDrawer/LogActionsDrawer";
import DrawerContent from "./Components/LogActionsDrawer/Components/DrawerContent";
import useFilteredLogs from "./Hooks/useFilteredLogs";
import getReadableLog from "./Helpers/getReadableLog";
import LogsSummary from "./Components/LogsSummary/LogsSummary";

type LogRowProps = ParentComponent & {
  size?: "sm";
};

type BaseCellProps = ParentComponent & Sizeable & {};

const BaseCell = ({ children, w, h }: BaseCellProps) => {
  const className = clsx("px-2", w && w, h && h);
  return <div className={className}>{children}</div>;
};

const NumberCell = () => {
  return <div></div>;
};

const TimeCell = ({ isoTime }: { isoTime: string | null }) => {
  const time = isoTime ? getISOTime(isoTime) : "";

  return (
    <BaseCell w="w-full">
      <time className="text-center">{time}</time>
    </BaseCell>
  );
};

const TextCell = ({ text }: { text: string }) => {
  return (
    <BaseCell w="w-1/4">
      <p>{text}</p>
    </BaseCell>
  );
};

const ListRow = ({ size, children }: LogRowProps) => {
  return <li className="flex w-full gap-2">{children}</li>;
};

const LogsList = () => {
  const filteredLogs = useFilteredLogs();

  return (
    <ol>
      {filteredLogs.map(({ id, inTime, outTime }) => (
        <ListRow>
          <TextCell text={String(id)} />
          <TimeCell isoTime={inTime} />
          <TimeCell isoTime={outTime} />
        </ListRow>
      ))}
    </ol>
  );
};

const LogsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Id</th>
        <th className="text-center">Start Time</th>
        <th className="text-center">End Time</th>
        <th className="text-center">Duration</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

const LogRow = ({ log }: { log: LogEntry }) => {
  const { id } = log;
  const { duration, endDate, startDate, startTime, endTime } =
    getReadableLog(log);
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <tr>
      <th></th>
      <td>
        <div>
          <div className="font-bold">{id}</div>
        </div>
      </td>
      <td className="text-center">
        <time className="text-center">{`${startTime}, ${startDate}`}</time>
      </td>
      <td className="text-center">
        <time className="text-center">{`${endTime}, ${endDate}`}</time>
      </td>
      <td className="text-center">
        <div>{duration}</div>
      </td>
      <td className="" onClick={() => setShowDrawer(true)}>
        <EllipsisVertical className="mx-auto" />
      </td>
      <LogActionsDrawer
        showDrawer={showDrawer}
        closeDrawer={() => setShowDrawer(false)}
      >
        <DrawerContent log={log} />
      </LogActionsDrawer>
    </tr>
  );
};

const LogsTable = () => {
  const filteredLogs = useFilteredLogs();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <LogsTableHeader />
        <tbody>
          {filteredLogs.map((log) => (
            <LogRow key={log.id} log={log} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Logs = () => {
  return (
    <MainPane className="h-[calc(100vh-3rem)]">
      <DefaultAppBar
        pageTitle="Logs"
        pageDescription="Browse all logs submitted"
        url="/admin"
      />
      <section className="px-4">
        <FilterMenu />
        <Divider />
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-md"></span>
          }
        >
          <LogsSummary />
          <LogsTable />
        </Suspense>
      </section>
    </MainPane>
  );
};

export default Logs;
