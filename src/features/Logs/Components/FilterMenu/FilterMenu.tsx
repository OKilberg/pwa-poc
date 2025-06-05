"use client";

import { fullMonthNames } from "@/lib/date/constants";
import useEmployees from "@/shared/hooks/queries/useEmployees";
import useEmployee from "@/shared/queryState/useEmployee";
import useMonth, { MONTHS, months } from "@/shared/queryState/useMonth";
import React, { ChangeEvent } from "react";

// Multi-select checkbox filter, default = none (all)
const EmployeeFilter = () => {
  const { employee, setEmployee } = useEmployee();
  const employees = useEmployees();
  const employeeValue = employee || undefined;

  const handleSelectEmployee = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { value } = target;
    setEmployee(value);
  };

  return (
    <select
      className="select select-bordered w-1/2"
      value={employeeValue}
      onChange={handleSelectEmployee}
    >
      <option defaultChecked disabled>
        Select Employee
      </option>
      {employees.map(([number, { firstName, lastName, id }]) => (
        <option value={id} key={number}>
          {firstName}
          {lastName}
        </option>
      ))}
    </select>
  );
};

const MonthFilter = () => {
  const { month, setMonth } = useMonth();

  const handleSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { value } = target;
    setMonth(value as MONTHS);
  };

  return (
    <select
      className="select select-bordered w-1/4"
      value={month}
      onChange={handleSelectMonth}
    >
      {months.map((month) => (
        <option value={month} key={month}>
          {fullMonthNames[month]}
        </option>
      ))}
    </select>
  );
};

// Year radio filter (default this year)
const YearFilter = () => {
  return (
    <select className="select select-bordered w-1/4">
      <option>2025</option>
    </select>
  );
};

const FilterMenu = () => {
  return (
    <div className="flex gap-1 md:gap-4">
      <EmployeeFilter />
      <MonthFilter />
      <YearFilter />
    </div>
  );
};

export default FilterMenu;
