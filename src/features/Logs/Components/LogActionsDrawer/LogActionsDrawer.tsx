import Drawer from "@mui/material/Drawer";
import { ParentComponent } from "@/shared/components/types";

type LogActionsDrawerProps = ParentComponent & {
  showDrawer: boolean;
  closeDrawer: () => void;
};

const LogActionsDrawer = ({
  showDrawer,
  closeDrawer,
  children,
}: LogActionsDrawerProps) => {
  return (
    <Drawer
      variant="temporary"
      open={showDrawer}
      anchor="bottom"
      onClick={closeDrawer}
    >
      {children}
    </Drawer>
  );
};

export default LogActionsDrawer;
