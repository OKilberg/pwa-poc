"use client";

import React from "react";
import { clearUserSession } from "@/lib/session/Session";
import Button from "@/shared/components/Button/Button";
import MainPane from "@/shared/components/MainPane/MainPane";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import { redirect } from "next/navigation";
import Content from "@/shared/components/Content/Content";
import Header from "./Components/Header";
import ClockInButton from "./Components/ClockInButton/ClockInButton";
import { Calendar, LogOut } from "lucide-react";
import Label from "./Components/Label";

const ClockIn = () => {
  const onLogout = () => {
    clearUserSession();
    redirect("/");
  };

  return (
    <UserSessionProvider onLogout={onLogout}>
      <MainPane className="animate-slideInRight">
        <Header />
        <Content>
          <Label />
          <ClockInButton />
          <Button
            variant="secondary"
            onClick={() => redirect("/clockin/attendance")}
          >
            <Calendar />
            View Attendance
          </Button>
          <div>
            <Button variant="tertiary" onClick={onLogout}>
              <LogOut className="transform rotate-180" />
              Logout
            </Button>
          </div>
        </Content>
      </MainPane>
    </UserSessionProvider>
  );
};

export default ClockIn;
