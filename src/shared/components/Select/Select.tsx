import React, { ChangeEvent } from "react";

type SelectProps = {
  value: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  name: string;
};

const Select = ({ value, onChange, options, name }: SelectProps) => {
  return (
    <select
      className="select md:select-lg select-bordered w-full md:max-w-md"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map(({ value, label }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
};

export default Select;
