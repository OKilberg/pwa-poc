import { getActiveEmployees } from "@/lib/db/users";
import useQuery from "@/shared/hooks/useQuery";

const useEmployeeOptions = () => {
  const employees = useQuery({ fn: getActiveEmployees, key: "employees" });

  const employeeOptions = employees.map(({ id, firstName, lastName, idn }) => {
    return { value: String(id), label: `${firstName} ${lastName} (${idn})` };
  });

  return employeeOptions;
};

export default useEmployeeOptions;
