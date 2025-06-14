import { getRecordsByUserMonthYear } from "@/lib/db/logs";
import useQuery from "@/shared/hooks/useQuery";
import useEmployee from "@/shared/queryState/useEmployee";
import useLogTypes from "@/shared/queryState/useLogTypes";
import useMonth from "@/shared/queryState/useMonth";

const useFilteredLogs = () => {
  const { employee } = useEmployee();
  const { month } = useMonth();
  const year = 2025;
  const { logTypes } = useLogTypes();

  const filteredLogs = useQuery({
    fn: () => getRecordsByUserMonthYear(Number(employee), year, Number(month)),
    key: `logs-${employee}-${month}-${year}`,
  });

  if (!logTypes.includes("log")) return [];

  return filteredLogs;
};

export default useFilteredLogs;
