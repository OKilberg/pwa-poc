"use client";

import Button from "@/shared/components/Button/Button";
import MainPane from "@/shared/components/MainPane/MainPane";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import ReportsContextProvider from "@/shared/context/ReportsContext/ReportsContext";
import ReportsList from "./Components/ReportsList";
import EmployeeSelector from "./Components/EmployeeSelector";
import { ensureAuth } from "@/lib/session/auth";

const Reports = () => {
  ensureAuth();
  const { push } = useRouter();

  return (
    <ReportsContextProvider>
      <MainPane>
        <Header>
          <HeaderTitle>Time Reports</HeaderTitle>
          <HeaderSubtitle>Employee Attendance</HeaderSubtitle>
        </Header>
        <Content className="py-0">
          <EmployeeSelector />
          <ReportsList />
          <div>
            <Button variant="tertiary" onClick={() => push("/admin")}>
              <ArrowLeft className="" />
              Back
            </Button>
          </div>
        </Content>
      </MainPane>
    </ReportsContextProvider>
  );
};

export default Reports;
