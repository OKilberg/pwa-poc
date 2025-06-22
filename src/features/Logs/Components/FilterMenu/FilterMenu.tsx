"use client";

import { fullMonthNames } from "@/lib/date/constants";
import useEmployees from "@/shared/hooks/queries/useEmployees";
import useEmployee from "@/shared/queryState/useEmployee";
import useLogTypes, { LOGTYPE } from "@/shared/queryState/useLogTypes";
import useMonth, { MONTHS, months } from "@/shared/queryState/useMonth";
import clsx from "clsx";
import { BriefcaseBusiness, ListFilter, TreePalm } from "lucide-react";
import React, { ChangeEvent, ReactNode, useState } from "react";

const WithLabel = ({
  children,
  label,
  position,
  className,
}: {
  children: ReactNode;
  label: string;
  position?: "left";
  className?: string;
}) => {
  const baseClassName = clsx(
    "flex flex-col flex-grow gap-1 text-xs",
    position === "left" && "flex flex-row",
    className
  );

  return (
    <label className={baseClassName}>
      <p className="pl-1">{label}</p>
      {children}
    </label>
  );
};

// Multi-select checkbox filter
const EmployeeFilter = () => {
  const { employee, setEmployee } = useEmployee();
  const employees = useEmployees();
  const employeeValue = employee || "null";

  const handleSelectEmployee = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { value } = target;
    setEmployee(value);
  };

  return (
    <WithLabel label="Employee" className="max-w-fit">
      <select
        className="select select-sm md:select-md select-bordered w-full"
        value={employeeValue}
        onChange={handleSelectEmployee}
      >
        <option defaultChecked disabled value={"null"}>
          Select Employee
        </option>
        {employees.map(([number, { firstName, lastName, id }]) => (
          <option value={id} key={number}>
            {`${firstName} ${lastName}`}
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
    <WithLabel label="Month" className="max-w-fit">
      <select
        className="select select-sm md:select-md select-bordered w-full"
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
    <WithLabel label="Year" className="max-w-fit">
      <select className="select select-sm md:select-md select-bordered w-full">
        <option>2025</option>
      </select>
    </WithLabel>
  );
};

const TypeFilter = () => {
  const [isOpen, setOpen] = useState(false);
  const { logTypes, setLogTypes } = useLogTypes();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as LOGTYPE;

    if (!logTypes.includes(value)) {
      setLogTypes([...logTypes, value]);
    } else {
      setLogTypes([...logTypes.filter((type) => value !== type)]);
    }
  };

  return (
    <WithLabel label="Types" className="max-w-fit">
      <div className="relative">
        <button
          className="btn btn-sm md:btn-md btn-outline border-gray-300"
          onClick={() => setOpen(!isOpen)}
        >
          <ListFilter size={20} />
        </button>
        {isOpen && (
          <ul className="menu bg-base-100 rounded-box w-56 p-2  border absolute right-0 z-10">
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={logTypes.includes("log")}
                  onChange={onChange}
                  value={"log"}
                  className="checkbox"
                />
                Show Logs
                <BriefcaseBusiness size={20} />
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={logTypes.includes("absence")}
                  onChange={onChange}
                  value={"absence"}
                  className="checkbox"
                />
                Show Absences
                <TreePalm size={20} />
              </label>
            </li>
          </ul>
        )}
      </div>
    </WithLabel>
  );
};

const FilterMenu = () => {
  return (
    <div className="flex gap-1 md:gap-4">
      <EmployeeFilter />
      <MonthFilter />
      <YearFilter />
      <TypeFilter />
    </div>
  );
};

export default FilterMenu;
