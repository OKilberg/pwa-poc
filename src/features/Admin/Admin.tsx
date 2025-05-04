"use client";

import { clearUserSession } from "@/lib/session/Session";
import Button from "@/shared/components/Button/Button";
import MainPane from "@/shared/components/MainPane/MainPane";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import {
  Calendar,
  ChevronRight,
  Edit,
  HardDriveDownload,
  LogOut,
  Sheet,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Content from "@/shared/components/Content/Content";
import AdminHeader from "./Components/AdminHeader";
import { ensureAuth } from "@/lib/session/auth";
import MenuItem from "@/shared/components/MenuItem/MenuItem";
import CenterAppBar from "@/shared/components/AppBar/CenterAppBar";

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
          <div className="grid grid-cols-2 gap-3">
            <MenuItem
              linkTo="/admin/employees"
              description="Manage your employees"
              label="Employees"
              leadingIcon={<Users />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/calendar"
              description="View work per date"
              label="Calendar"
              leadingIcon={<Calendar />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/reports"
              description="View employees time worked"
              label="Time Reports"
              leadingIcon={<Sheet />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/export"
              description="Download work logs"
              label="Data Export"
              leadingIcon={<HardDriveDownload />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/logs/create"
              description="Manually register time worked"
              label="Register logs"
              leadingIcon={<Edit />}
              trailingIcon={<ChevronRight />}
            />
          </div>

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
