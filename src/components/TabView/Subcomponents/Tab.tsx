import React, { ReactNode } from "react";

const Tab = ({
  id,
  name,
  label,
  children,
  defaultTab,
}: {
  id: string;
  name: string;
  label: string;
  children?: ReactNode;
  defaultTab?: boolean;
}) => {
  const defaultChecked = defaultTab || false;

  return (
    <>
      <input
        id={id}
        type="radio"
        name={name}
        aria-label={label}
        className="tab tab-bordered"
        defaultChecked={defaultChecked}
      />

      <div className="tab-content border-base-300 bg-base-100 p-10">
        {children}
      </div>
    </>
  );
};

export default Tab;
