"use client";

import React, { useContext } from "react";
import { AccordionContext } from "../../AccordionGroup";
import { ParentComponent, Styleable } from "@/shared/components/types";
import clsx from "clsx";

type AccordionItemProps = {
  defaultChecked?: boolean;
} & ParentComponent &
  Styleable;

const AccordionItem: React.FC<AccordionItemProps> = ({
  defaultChecked,
  children,
  className,
}) => {
  const groupName = useContext(AccordionContext);
  const _className = clsx(
    "collapse collapse-arrow",
    className ?? "bg-zinc-200"
  );

  return (
    <div className={_className}>
      <input type="radio" name={groupName} defaultChecked={defaultChecked} />
      {children}
    </div>
  );
};

export default AccordionItem;
