"use client";

import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import React, { Suspense } from "react";
import FilterMenu from "./Components/FilterMenu/FilterMenu";
import LogsSummary from "./Components/LogsSummary/LogsSummary";
import LogsContentSkeleton from "./Components/LogsContentSkeleton/LogsContentSkeleton";
import LogsTable from "./Components/LogsTable/LogsTable";

const Logs = () => {
  return (
    <MainPane className="h-[calc(100vh-3rem)] min-h-0">
      <DefaultAppBar
        pageTitle="Logs"
        pageDescription="Browse and manage all work logs"
        url="/admin"
      />
      <section className="px-4 pb-6 gap-2 flex flex-col min-h-0 flex-1">
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-xs"></span>
          }
        >
          <FilterMenu />
        </Suspense>
        <Suspense fallback={<LogsContentSkeleton />}>
          <LogsSummary />
          <LogsTable />
        </Suspense>
      </section>
    </MainPane>
  );
};

export default Logs;
