"use client";

import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import React, { Suspense, useState } from "react";
import FilterMenu from "./Components/FilterMenu/FilterMenu";
import { LogEntry } from "@/lib/dbTypes";
import { EllipsisVertical } from "lucide-react";
import LogActionsDrawer from "./Components/LogActionsDrawer/LogActionsDrawer";
import DrawerContent from "./Components/LogActionsDrawer/Components/DrawerContent";
import useFilteredLogs from "./Hooks/useFilteredLogs";
import getReadableLog from "./Helpers/getReadableLog";
import LogsSummary from "./Components/LogsSummary/LogsSummary";
import LogsContentSkeleton from "./Components/LogsContentSkeleton/LogsContentSkeleton";

const LogsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
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
      <table className="table table-pin-rows">
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
    <MainPane className="h-[calc(100vh-3rem)] min-h-0">
      <DefaultAppBar
        pageTitle="Logs"
        pageDescription="Browse and manage all work logs"
        url="/admin"
      />
      <section className="px-4 pb-6 gap-2 flex flex-col min-h-0 flex-1">
        <FilterMenu />
        <Suspense fallback={<LogsContentSkeleton />}>
          <LogsSummary />
          <LogsTable />
        </Suspense>
      </section>
    </MainPane>
  );
};

export default Logs;
