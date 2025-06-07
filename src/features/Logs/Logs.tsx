"use client";

import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import useEmployee from "@/shared/queryState/useEmployee";
import React, { Suspense } from "react";
import FilterMenu from "./Components/FilterMenu/FilterMenu";
import useMonth from "@/shared/queryState/useMonth";
import useQuery from "@/shared/hooks/useQuery";
import { getRecordsByUserMonthYear } from "@/lib/db/logs";
import { ParentComponent, Sizeable } from "@/shared/components/types";
import { getISOTime } from "@/util/util";
import clsx from "clsx";
import { LogEntry } from "@/lib/dbTypes";
import { EllipsisVertical } from "lucide-react";

const useFilteredLogs = () => {
  const { employee } = useEmployee();
  const { month } = useMonth();
  const year = 2025;

  const filteredLogs = useQuery({
    fn: () => getRecordsByUserMonthYear(Number(employee), year, Number(month)),
    key: `logs-${employee}-${month}-${year}`,
  });

  console.log("filteredLogs", filteredLogs);

  return filteredLogs;
};

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
    <BaseCell w="w-fit">
      <time>{time}</time>
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
        <th>Start Time</th>
        <th>End Time</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

const LogRow = ({ log }: { log: LogEntry }) => {
  const { id, inTime, month, note, outTime, userId, year } = log;

  return (
    <tr>
      <th></th>
      <td>
        <div>
          <div className="font-bold">{id}</div>
        </div>
      </td>
      <td>
        <TimeCell isoTime={inTime} />
      </td>
      <td>
        <TimeCell isoTime={outTime} />
      </td>
      <td>
        <div>
          <div className="font-bold"><EllipsisVertical/></div>
        </div>
      </td>
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
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-md"></span>
          }
        >
          <LogsTable />
        </Suspense>
      </section>
    </MainPane>
  );
};

export default Logs;
