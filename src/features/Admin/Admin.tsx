"use client";

import { clearUserSession } from "@/lib/session/Session";
import MainPane from "@/shared/components/MainPane/MainPane";
import UserSessionProvider from "@/shared/context/UserSessionContext.tsx/UserSessionProvider";
import {
  Calendar,
  ChevronRight,
  ClipboardList,
  Edit,
  HardDriveDownload,
  CircleQuestionMark,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AdminHeader from "./Components/AdminHeader";
import { ensureAuth } from "@/lib/session/auth";
import MenuItem from "@/shared/components/MenuItem/MenuItem";

const Admin = () => {
  ensureAuth();
  const { push } = useRouter();

  const onLogout = () => {
    clearUserSession();
    push("/");
  };

  return (
    <UserSessionProvider onLogout={onLogout}>
      <MainPane className="animate-slideInRight h-[calc(100vh-3rem)]">
        <AdminHeader />
        <section className="flex flex-col flex-1 overflow-y-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-24">
            <MenuItem
              linkTo="/admin/employees"
              description="Manage your employees"
              label="Employees"
              leadingIcon={<Users />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/logs"
              description="View and manage work logs"
              label="Logs"
              leadingIcon={<ClipboardList />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/calendar"
              description="View daily logs"
              label="Calendar"
              leadingIcon={<Calendar />}
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
              description="Manual time entry"
              label="Register logs"
              leadingIcon={<Edit />}
              trailingIcon={<ChevronRight />}
            />
            <MenuItem
              linkTo="/admin/help"
              description="Guides and support"
              label="Help"
              leadingIcon={<CircleQuestionMark />}
              trailingIcon={<ChevronRight />}
            />
          </div>
        </section>
      </MainPane>
    </UserSessionProvider>
  );
};

export default Admin;
