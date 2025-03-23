"use client";
import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import Header from "./Components/Header";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import Content from "@/shared/components/Content/Content";
import Button from "@/shared/components/Button/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AttendanceList from "./Components/AttendanceList";

const Attendance = () => {
  const { push } = useRouter();

  return (
    <UserSessionProvider onLogout={() => null}>
      <MainPane>
        <Header />
        <Content className="py-0">
          <AttendanceList />
          <div>
            <Button variant="tertiary" onClick={() => push("/clockin")}>
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
