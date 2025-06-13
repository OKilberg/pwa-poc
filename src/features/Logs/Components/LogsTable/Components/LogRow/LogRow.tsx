import getReadableLog from "@/features/Logs/Helpers/getReadableLog";
import { LogEntry } from "@/lib/dbTypes";
import { BriefcaseBusiness, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import LogActionsDrawer from "../../../LogActionsDrawer/LogActionsDrawer";
import DrawerContent from "../../../LogActionsDrawer/Components/DrawerContent";

const LogRow = ({ log }: { log: LogEntry }) => {
  const { id, note } = log;
  const { duration, endDate, startDate, startTime, endTime } =
    getReadableLog(log);
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <tr>
      <td>
        <div>
          <div className="font-bold">{id}</div>
        </div>
      </td>
      <td>
        <BriefcaseBusiness size={18} />
      </td>
      <td className="text-center">
        <time className="text-center">{`${startTime}, ${startDate}`}</time>
      </td>
      <td className="text-center">
        <time className="text-center">{`${endTime}, ${endDate}`}</time>
      </td>
      <td className="text-center">
        <div>{duration}</div>
      </td>
      <td className="text-center">
        <div>{note}</div>
      </td>
      <td className="" onClick={() => setShowDrawer(true)}>
        <EllipsisVertical className="mx-auto" />
      </td>
      <LogActionsDrawer
        showDrawer={showDrawer}
        closeDrawer={() => setShowDrawer(false)}
      >
        <DrawerContent log={log} />
      </LogActionsDrawer>
    </tr>
  );
};

export default LogRow;
