"use client";

import MainPane from "@/shared/components/MainPane/MainPane";
import { useRouter } from "next/navigation";
import React from "react";
import ReportsContextProvider from "@/shared/context/ReportsContext/ReportsContext";
import ReportsList from "./Components/ReportsList";
import EmployeeSelector from "./Components/EmployeeSelector";
import { ensureAuth } from "@/lib/session/auth";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";

const Reports = () => {
  ensureAuth();
  const { push } = useRouter();

  return (
    <ReportsContextProvider>
      <MainPane className="h-[calc(100vh-3rem)]">
        <DefaultAppBar
          pageTitle="Time Reports"
          pageDescription="View employee work reports"
        />
        <EmployeeSelector />
        <section className="flex flex-col flex-1 overflow-y-scroll px-4">
          <ReportsList />
        </section>
      </MainPane>
    </ReportsContextProvider>
  );
};

export default Reports;
