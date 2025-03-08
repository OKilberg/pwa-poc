import React from "react";
import { ParentComponent, Styleable } from "../types";
import clsx from "clsx";

type HeaderProps = ParentComponent & Styleable;

const Header = ({ children, className }: HeaderProps) => {
  const classHeader = clsx(
    "flex flex-col p-14 gap-4 w-full items-center",
    className
  );

  return <header className={classHeader}>{children}</header>;
};

export default Header;
