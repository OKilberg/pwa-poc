import { getActiveEmployees } from "@/lib/db/users";
import React from "react";
import Employee from "./Employee";
import useQuery from "@/shared/hooks/useQuery";

const EmployeesList = () => {
  const employees = useQuery({ fn: getActiveEmployees, key: "employees" });

  return (
    <ul className="flex flex-col gap-2 w-full max-h-[295px] md:max-h-[360px] overflow-scroll">
      {employees.map((employee, index) => (
        <Employee key={index} user={employee} />
      ))}
    </ul>
  );
};

export default EmployeesList;
