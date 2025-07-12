import React, { ChangeEvent } from "react";

type SelectProps = {
  defaultValue?: { value: string; label: string };
  value: string | undefined | null;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  name: string;
};

const Select = ({
  defaultValue,
  value,
  onChange,
  options,
  name,
}: SelectProps) => {
  const nonNullValue = value === null ? undefined : value;
  const _defaultValue = defaultValue ? defaultValue.value : nonNullValue;

  return (
    <select
      defaultValue={_defaultValue}
      className="select md:select-lg select-bordered w-full"
      name={name}
      value={nonNullValue}
      onChange={onChange}
    >
      {defaultValue && (
        <option disabled value={defaultValue.value}>
          {defaultValue.label}
        </option>
      )}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
