"use client";

import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import useEmployee from "@/shared/queryState/useEmployee";
import React, { Suspense } from "react";
import FilterMenu from "./Components/FilterMenu/FilterMenu";
import useMonth from "@/shared/queryState/useMonth";
import useQuery from "@/shared/hooks/useQuery";
import { getRecordsByUserMonthYear } from "@/lib/db/logs";

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

const LogsList = () => {
  const filteredLogs = useFilteredLogs();

  return (
    <ol>
      {filteredLogs.map(({ id, inTime, outTime }) => (
        <p>{`${id} ${inTime} ${outTime}`}</p>
      ))}
    </ol>
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
          <LogsList />
        </Suspense>
      </section>
    </MainPane>
  );
};

export default Logs;
