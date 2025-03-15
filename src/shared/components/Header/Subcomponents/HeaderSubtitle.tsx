import React from "react";
import clsx from "clsx";
import { ParentComponent, Styleable } from "../../types";

type HeaderSubtitleProps = ParentComponent & Styleable;

const HeaderSubtitle = ({ children, className }: HeaderSubtitleProps) => {
  const classHeaderSubtitle = clsx(
    "text-[18px] md:text-[36px] font-medium",
    className
  );

  return <div className={classHeaderSubtitle}>{children}</div>;
};

export default HeaderSubtitle;
