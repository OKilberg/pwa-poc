import React from "react";
import { ParentComponent, Styleable } from "../types";
import clsx from "clsx";

type ExampleProps = ParentComponent & Styleable;

const Example = ({ children, className }: ExampleProps) => {
  const classExample = clsx("", className);

  return <div className={classExample}>{children}</div>;
};

export default Example;
