import { removeLogEntry } from "@/lib/db/logs";
import { LogEntry } from "@/lib/dbTypes";
import { clearUserLogsCache } from "@/lib/queryCache/queryCache";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useArchiveLog = () => {
  const { refresh } = useRouter();

  const archiveLog = (log: LogEntry) => {
    const { id, userId, inTime } = log;
    removeLogEntry(id)
      .then(() => {
        clearUserLogsCache(userId, inTime);
        toast.success("Deleted log entry");
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return archiveLog;
};

export default useArchiveLog;
