import { User } from "@/lib/dbTypes";

const getEmployeeInitials = (employee: User) => {
  const { firstName, lastName } = employee;

  const employeeInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return employeeInitials;
};

export default getEmployeeInitials;
