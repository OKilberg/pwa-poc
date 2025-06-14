import React from "react";
import clsx from "clsx";
import { ParentComponent, Styleable } from "../../types";

type HeaderTitleProps = ParentComponent & Styleable;

const HeaderTitle = ({ children, className }: HeaderTitleProps) => {
  const classHeaderTitle = clsx(
    "text-[26px] md:text-[52px] font-bold",
    className
  );

  return <div className={classHeaderTitle}>{children}</div>;
};

export default HeaderTitle;
