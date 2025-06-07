"use client";

import { fullMonthNames } from "@/lib/date/constants";
import useEmployees from "@/shared/hooks/queries/useEmployees";
import useEmployee from "@/shared/queryState/useEmployee";
import useMonth, { MONTHS, months } from "@/shared/queryState/useMonth";
import clsx from "clsx";
import React, { ChangeEvent, ReactNode } from "react";

const WithLabel = ({
  children,
  label,
  position,
  w,
}: {
  children: ReactNode;
  label: string;
  position?: "left";
  w?: string;
}) => {
  const className = clsx(
    "flex flex-col flex-grow gap-1 text-xs",
    position === "left" && "flex flex-row",
    w && `w-${w}`
  );

  return (
    <label className={className}>
      <p className="pl-1">{label}</p>
      {children}
    </label>
  );
};

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
    <WithLabel label="Employee" w="1/2">
      <select
        className="select select-bordered w-full"
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
    </WithLabel>
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
    <WithLabel label="Month" w="1/4">
      <select
        className="select select-bordered w-full"
        value={month}
        onChange={handleSelectMonth}
      >
        {months.map((month) => (
          <option value={month} key={month}>
            {fullMonthNames[month]}
          </option>
        ))}
      </select>
    </WithLabel>
  );
};

// Year radio filter (default this year)
const YearFilter = () => {
  return (
    <WithLabel label="Year" w="1/4">
      <select className="select select-bordered w-full">
        <option>2025</option>
      </select>
    </WithLabel>
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
