import { User } from "@/lib/dbTypes";
import useEmployees from "@/shared/hooks/queries/useEmployees";

const useEmployee = (employeeId: User["id"]) => {
  const employees = useEmployees();

  const employee = employees.find(([number]) => number === employeeId);

  if (employee) {
    const [_number, employeeData] = employee;

    return employeeData;
  }

  return undefined;
};

export default useEmployee;
