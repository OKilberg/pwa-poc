"use client";
import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import Header from "./Components/Header";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import AttendanceList from "./Components/AttendanceList";

const Attendance = () => {
  return (
    <UserSessionProvider onLogout={() => null}>
      <MainPane className="h-[calc(100vh-3rem)]">
        <Header />
        <AttendanceList />
      </MainPane>
    </UserSessionProvider>
  );
};

export default Attendance;
