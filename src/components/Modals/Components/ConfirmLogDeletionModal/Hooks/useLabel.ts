import getLogLabel from "@/features/Logs/Helpers/getLogLabel";
import useSelectedLog from "./useSelectedLog";

const useLabel = () => {
  const selectedLog = useSelectedLog();

  if (selectedLog) {
    const logLabel = getLogLabel(selectedLog);
    const label = `Are you sure you want to delete this log? ${logLabel}`;

    return label;
  }

  return "No log selected.";
};

export default useLabel;
