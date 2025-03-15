"use client";

import useQuery from "@/features/Home/Components/useQuery";
import { getEmployeesMap } from "@/lib/db/users";
import useSetUser from "@/shared/context/ReportsContext/ContextHooks/useSetUser";
import React, { ChangeEvent } from "react";

const EmployeeSelector = () => {
  const employees = useQuery({ fn: getEmployeesMap, key: "employees" });
  const setUser = useSetUser();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = employees.get(Number(e.target.value));

    if (selectedUser) {
      setUser(selectedUser);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <select
        defaultValue={undefined}
        className="select select-lg select-bordered w-full max-w-md"
        onChange={onSelectChange}
      >
        <option disabled selected value={undefined}>
          Select employee
        </option>
        {Array.from(employees.entries()).map(([key, employee]) => (
          <option key={key} value={key}>
            {employee.firstName} {employee.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeSelector;
