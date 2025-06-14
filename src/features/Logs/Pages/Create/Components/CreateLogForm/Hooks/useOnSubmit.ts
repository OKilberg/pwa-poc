import { addLogEntry } from "@/lib/db/logs";
import { NewLogEntry } from "@/lib/dbTypes";
import { clearUserLogsCache } from "@/lib/queryCache/queryCache";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";

const useOnSubmit = () => {
  const onSubmit = (
    startDate: Dayjs,
    endDate: Dayjs,
    employee: string,
    onSuccess: () => void
  ) => {
    const logEntry: NewLogEntry = {
      userId: Number(employee),
      inTime: startDate.toISOString(),
      outTime: endDate.toISOString(),
      month: startDate.month(),
      year: startDate.year(),
      note: "Registered by admin",
    };

    addLogEntry(logEntry)
      .then(() => {
        clearUserLogsCache(logEntry.userId, logEntry.inTime);
        toast.success("Created log entry");
        onSuccess();
        // reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return onSubmit;
};

export default useOnSubmit;
