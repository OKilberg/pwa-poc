"use client";

import Select from "@/shared/components/Select/Select";
import React from "react";
import useEmployeeOptions from "../Hooks/useEmployeeOptions";

const SelectEmployee = () => {
  const employeeOptions = useEmployeeOptions();

  return <Select value={""} options={employeeOptions} name={""} />;
};

export default SelectEmployee;
