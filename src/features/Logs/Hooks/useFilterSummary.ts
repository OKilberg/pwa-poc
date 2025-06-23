import getLogsTimeTotal from "../Helpers/getLogsTimeTotal";
import useFilteredLogs from "./useFilteredLogs";

const useFilterSummary = () => {
  const filteredLogs = useFilteredLogs();

  const shifts = filteredLogs.length;
  const timeTotal = getLogsTimeTotal(filteredLogs);

  return { shifts, time: timeTotal };
};

export default useFilterSummary;
