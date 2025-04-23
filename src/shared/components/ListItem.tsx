"use client";

import React from "react";
import { Clickable, ParentComponent } from "./types";
import clsx from "clsx";

type ListItemProps = { className?: string } & ParentComponent & Clickable;

const ListItem = ({ children, onClick, className }: ListItemProps) => {
  const classListItem = clsx(
    "flex p-2 md:p-5 bg-[#EAEAEA] rounded-md md:rounded-2xl",
    className && className
  );

  return (
    <li onClick={onClick} className={classListItem}>
      {children}
    </li>
  );
};

export default ListItem;
