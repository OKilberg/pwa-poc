import React from "react";
import Employee from "./Employee";
import useFilteredEmployees from "../Hooks/useFilteredEmployees";

const EmployeesList = () => {
  const employees = useFilteredEmployees();

  return (
    <ul className="flex flex-col gap-2 w-full flex-1 overflow-scroll px-4 pb-24">
      {employees.map((employee, index) => (
        <Employee key={index} user={employee} />
      ))}
    </ul>
  );
};

export default EmployeesList;
