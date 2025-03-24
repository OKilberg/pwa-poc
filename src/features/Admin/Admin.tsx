"use client";

import { clearUserSession } from "@/lib/session/Session";
import Button from "@/shared/components/Button/Button";
import MainPane from "@/shared/components/MainPane/MainPane";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import {
  Calendar,
  HardDriveDownload,
  LogOut,
  Sheet,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Content from "@/shared/components/Content/Content";
import AdminHeader from "./Components/AdminHeader";
import { ensureAuth } from "@/lib/session/auth";

const Admin = () => {
  ensureAuth();
  const { push } = useRouter();

  const onLogout = () => {
    clearUserSession();
    push("/");
  };

  return (
    <UserSessionProvider onLogout={onLogout}>
      <MainPane className="animate-slideInRight">
        <AdminHeader />
        <Content>
          <Button variant="secondary" onClick={() => push("/admin/employees")}>
            <Users />
            Employees
          </Button>
          <Button variant="secondary" onClick={() => push("/admin/calendar")}>
            <Calendar />
            Calendar
          </Button>
          <Button variant="secondary" onClick={() => push("/admin/reports")}>
            <Sheet />
            Time Reports
          </Button>
          <Button
            variant="secondary"
            // state="disabled"
            onClick={() => push("/admin/export")}
          >
            <HardDriveDownload />
            Data Export
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

export default Admin;
