import { getWorkAbsenceByYearMonthUser } from "@/lib/db/absence";
import useQuery from "@/shared/hooks/useQuery";
import useEmployee from "@/shared/queryState/useEmployee";
import useLogTypes from "@/shared/queryState/useLogTypes";
import useMonth from "@/shared/queryState/useMonth";

const useFilteredAbsences = () => {
  const { employee } = useEmployee();
  const { month } = useMonth();
  const year = 2025;
  const { logTypes } = useLogTypes();

  const filteredAbsences = useQuery({
    fn: () =>
      getWorkAbsenceByYearMonthUser(year, Number(month), Number(employee)),
    key: `absences-${employee}-${month}-${year}`,
  });

  if (!logTypes.includes("absence")) return [];

  const sortedAbsences = filteredAbsences.sort((a, b) =>
    a.dateStart.localeCompare(b.dateStart)
  );

  return sortedAbsences;
};

export default useFilteredAbsences;
