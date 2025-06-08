import { LogEntry } from "@/lib/dbTypes";
import { ListItem } from "@mui/material";
import { SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import useArchiveLog from "../Hooks/useArchiveLog";
import getReadableLog from "@/features/Logs/Helpers/getReadableLog";

const getLabel = (log: LogEntry) => {
  const { id, duration, startTime, startDate, endTime, endDate, month } =
    getReadableLog(log);

  const showEndDate = startDate !== endDate;

  const label = `Log #${id} (${month} ${startDate}, ${startTime} - 
  ${showEndDate ? endDate : ""} ${endTime}, ${duration})`;

  return label;
};

const DrawerContent = ({ log }: { log: LogEntry }) => {
  const { id } = log;
  const { push } = useRouter();
  const archiveLog = useArchiveLog();
  const label = getLabel(log);

  return (
    <div className="py-2 flex flex-col gap-2 min-h-[33vh]">
      <ListItem className="font-bold text-lg">{label}</ListItem>
      <ListItem
        className="px-4 py-2 gap-4 bg-white"
        onClick={() => push(`/admin/logs/${id}/edit`)}
      >
        <SquarePen className="size-5" />
        Edit
      </ListItem>
      <ListItem
        className="px-4 py-2 gap-4 text-red-500 bg-white"
        onClick={() => archiveLog(log)}
      >
        <Trash className="size-5" />
        Delete
      </ListItem>
    </div>
  );
};

export default DrawerContent;
