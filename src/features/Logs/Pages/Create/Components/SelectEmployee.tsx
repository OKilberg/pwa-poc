"use client";

import Select from "@/shared/components/Select/Select";
import React, { ChangeEvent } from "react";
import useEmployeeOptions from "../Hooks/useEmployeeOptions";
import useEmployee from "@/features/Logs/Hooks/useEmployee";

const SelectEmployee = () => {
  const employeeOptions = useEmployeeOptions();
  const { employee, setEmployee } = useEmployee();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { value } = target;

    setEmployee(value);
  };

  return (
    <Select
      defaultValue={{ label: "Select employee", value: "default" }}
      value={employee}
      options={employeeOptions}
      onChange={onChange}
      name={"employee"}
    />
  );
};

export default SelectEmployee;
