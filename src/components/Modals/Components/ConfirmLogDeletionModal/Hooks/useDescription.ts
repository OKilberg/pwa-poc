import useSelectedLog from "./useSelectedLog";
import getLogLabel from "@/features/Logs/Helpers/getLogLabel";

const useDescription = () => {
  const selectedLog = useSelectedLog();

  if (selectedLog) {
    const logLabel = getLogLabel(selectedLog);

    const description = `${logLabel} will be removed and cannot be restored.`;

    return description;
  }

  return "...";
};

export default useDescription;
