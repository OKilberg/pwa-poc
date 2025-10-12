import { User } from "@/lib/dbTypes";
import useFilteredEmployees from "./useFilteredEmployees";

const useEmployee = (employeeId: User["id"]) => {
  const employees = useFilteredEmployees();

  const employee = employees.find(([number]) => number === employeeId);

  if (employee) {
    const [_number, employeeData] = employee;

    return employeeData;
  }

  return undefined;
};

export default useEmployee;
