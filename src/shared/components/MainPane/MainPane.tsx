import React from "react";
import { ParentComponent, Styleable } from "../types";
import clsx from "clsx";

type MainPaneProps = ParentComponent & Styleable;

const MainPane = ({ children, className }: MainPaneProps) => {
  const classMainPane = clsx(
    "flex-1 flex flex-col gap-2 max-w-screen-lg w-full",
    className
  );

  return <main className={classMainPane}>{children}</main>;
};

export default MainPane;
