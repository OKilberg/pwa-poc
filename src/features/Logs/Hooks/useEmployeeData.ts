import useEmployees from "@/shared/hooks/queries/useEmployees";
import useEmployee from "@/shared/queryState/useEmployee";

const useEmployeeData = () => {
  const { employee } = useEmployee();

  const employees = useEmployees();

  const employeeDetails = employees.find(
    ([index, { id }]) => employee === String(id)
  );

  if (employeeDetails) {
    const [_, employeeData] = employeeDetails;
    return employeeData;
  }

  return undefined;
};

export default useEmployeeData;
