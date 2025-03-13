"use client";
import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import Header from "./Components/Header";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import Content from "@/shared/components/Content/Content";
import Button from "@/shared/components/Button/Button";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import UserAttendanceList from "./Components/UserAttendanceList/UserAttendanceList";

const Attendance = () => {
  return (
    <UserSessionProvider onLogout={() => null}>
      <MainPane>
        <Header />
        <Content className="py-0">
          <UserAttendanceList />
          <div>
            <Button variant="tertiary" onClick={() => redirect("/clockin")}>
              <ArrowLeft className="" />
              Back
            </Button>
          </div>
        </Content>
      </MainPane>
    </UserSessionProvider>
  );
};

export default Attendance;
