import useFilter from "@/shared/queryState/useFilter";
import useDateLogs from "./useDateLogs";
import useArchivedEmployees from "@/shared/hooks/queries/useArchivedEmployees";

const useFilteredDateLogs = () => {
  const dateLogs = useDateLogs();
  const archivedEmployees = useArchivedEmployees();
  const { filter } = useFilter();

  console.log(filter, archivedEmployees);

  if (filter && filter === "archived") {
    const filteredDateLogs = dateLogs.filter(({ userId }) =>
      archivedEmployees.find((employee) => employee.id === userId)
    );

    console.log(filteredDateLogs);

    return filteredDateLogs;
  }

  return dateLogs;
};

export default useFilteredDateLogs;
