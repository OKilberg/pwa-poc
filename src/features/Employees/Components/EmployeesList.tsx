import { getActiveEmployees } from "@/lib/db/users";
import React from "react";
import Employee from "./Employee";
import useQuery from "@/shared/hooks/useQuery";

const EmployeesList = () => {
  const employees = useQuery({ fn: getActiveEmployees, key: "employees" });

  return (
    <ul className="flex flex-col gap-2 w-full flex-1 overflow-scroll px-4 pb-24">
      {employees.map((employee, index) => (
        <Employee key={index} user={employee} />
      ))}
    </ul>
  );
};

export default EmployeesList;
