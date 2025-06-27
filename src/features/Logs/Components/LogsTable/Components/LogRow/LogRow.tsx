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
  const dates =
    endDate && startDate !== endDate
      ? `${startDate} - ${endDate}`
      : `${startDate}`;
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <tr className="hover">
      <td>
        <div>
          <div className="font-bold">{id}</div>
        </div>
      </td>
      <td>
        <BriefcaseBusiness size={18} />
      </td>
      <td className="text-center">
        <time className="text-center">{`${dates}`}</time>
      </td>
      <td className="text-center">
        <time className="text-center">{`${startTime} - ${endTime}`}</time>
      </td>
      <td className="text-center">
        <div>{duration}</div>
      </td>
      <td className="text-center">
        <div>{note}</div>
      </td>
      <th className="text-right" onClick={() => setShowDrawer(true)}>
        <button className="btn btn-xs md:btn-sm btn-outline">Manage</button>
      </th>
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
