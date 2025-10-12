import { getEmployeesMap } from "@/lib/db/users";
import { useLiveQuery } from "dexie-react-hooks";

const useAllEmployeesMap = () => {
  const employees = useLiveQuery(() => getEmployeesMap(), [], []);

  return [...employees];
};

export default useAllEmployeesMap;
