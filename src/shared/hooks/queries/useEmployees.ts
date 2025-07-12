import { getActiveEmployeesMap } from "@/lib/db/users";
import useQuery from "../useQuery";

const useEmployees = () => {
  const employees = useQuery({
    fn: getActiveEmployeesMap,
    key: "activeEmployeesMap",
  });

  return [...employees];
};

export default useEmployees;
