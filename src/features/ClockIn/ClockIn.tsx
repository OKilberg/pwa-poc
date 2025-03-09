"use client";

import React from "react";
import { clearUserSession } from "@/lib/session/Session";
import Button from "@/shared/components/Button/Button";
import MainPane from "@/shared/components/MainPane/MainPane";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import { redirect } from "next/navigation";
import Content from "@/shared/components/Content/Content";
import Header from "./Components/Header";
import ClockInButton from "./Components/ClockInButton";
import { Calendar, LogOut } from "lucide-react";

const ClockIn = () => {
  const onLogout = () => {
    clearUserSession();
    redirect("/new");
  };

  return (
    <UserSessionProvider onLogout={onLogout}>
      <MainPane className="animate-slideInRight">
        <Header />
        <Content>
          <p className="text-[24px]">What would you like to do?</p>
          <ClockInButton />
          <Button variant="secondary">
            <Calendar />
            View Attendance
          </Button>
          <div>
            <Button variant="tertiary" onClick={onLogout}>
              <LogOut className="transform rotate-180" />
              Back
            </Button>
          </div>
        </Content>
      </MainPane>
    </UserSessionProvider>
  );
};

export default ClockIn;
