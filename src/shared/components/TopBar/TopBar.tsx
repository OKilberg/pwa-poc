import clsx from "clsx";
import React from "react";
import { ParentComponent, Styleable } from "../types";

type TopBarProps = ParentComponent & Styleable;

const TopBar = ({ children, className }: TopBarProps) => {
  const classTopBar = clsx("h-20 flex items-center", className);

  return <nav className={classTopBar}>{children}</nav>;
};

export default TopBar;
