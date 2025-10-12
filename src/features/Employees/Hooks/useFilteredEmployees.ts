import { getActiveEmployees, getArchivedEmployees } from "@/lib/db/users";
import useFilter from "@/shared/queryState/useFilter";
import { useLiveQuery } from "dexie-react-hooks";

const useFilteredEmployees = () => {
  const { filter } = useFilter();

  const getEmployeesFn =
    filter === "archived" ? getArchivedEmployees : getActiveEmployees;

  const filteredEmployees = useLiveQuery(() => getEmployeesFn(), [filter], []);

  return filteredEmployees;
};

export default useFilteredEmployees;
