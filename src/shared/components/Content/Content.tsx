import React from "react";
import { ParentComponent, Styleable } from "../types";
import clsx from "clsx";

type ContentProps = ParentComponent & Styleable;

const Content = ({ children, className }: ContentProps) => {
  const classContent = clsx(
    "flex flex-col p-8 md:p-14 gap-4 md:gap-6 w-full items-center",
    className
  );

  return <section className={classContent}>{children}</section>;
};

export default Content;
