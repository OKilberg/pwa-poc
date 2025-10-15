import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import MenuItem from "@/shared/components/MenuItem/MenuItem";
import { Calendar, ChevronRight, ClipboardList, Users } from "lucide-react";

const Archive = () => {
  return (
    <MainPane className="h-[calc(100vh-3rem)] min-h-0">
      <DefaultAppBar
        pageTitle={"Archive"}
        pageDescription="View archive pages"
        url="/admin"
      />
      <section className="flex flex-col flex-1 overflow-y-scroll py-2 px-4 gap-3">
        <MenuItem
          linkTo="/admin/calendar?filter=archived"
          description="View calendar with archived employees"
          label="Calendar [Archive]"
          leadingIcon={<Calendar />}
          trailingIcon={<ChevronRight />}
        />
        <MenuItem
          linkTo="/admin/employees?filter=archived"
          description="View your archived employees"
          label="Employees [Archive]"
          leadingIcon={<Users />}
          trailingIcon={<ChevronRight />}
        />
        <MenuItem
          linkTo="/admin/logs?filter=archived"
          description="View and manage work logs"
          label="Logs [Archive]"
          leadingIcon={<ClipboardList />}
          trailingIcon={<ChevronRight />}
        />
      </section>
    </MainPane>
  );
};

export default Archive;
