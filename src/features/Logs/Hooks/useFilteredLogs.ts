import { getRecordsByUserMonthYear } from "@/lib/db/logs";
import useQuery from "@/shared/hooks/useQuery";
import useEmployee from "@/shared/queryState/useEmployee";
import useMonth from "@/shared/queryState/useMonth";

const useFilteredLogs = () => {
  const { employee } = useEmployee();
  const { month } = useMonth();
  const year = 2025;

  const filteredLogs = useQuery({
    fn: () => getRecordsByUserMonthYear(Number(employee), year, Number(month)),
    key: `logs-${employee}-${month}-${year}`,
  });

  console.log("filteredLogs", filteredLogs);

  return filteredLogs;
};

export default useFilteredLogs;
