"use client"

import React from "react";
import { Clickable, ParentComponent } from "./types";

type ListItemProps = {} & ParentComponent & Clickable;

const ListItem = ({ children, onClick }: ListItemProps) => {
  return (
    <li onClick={onClick} className="flex p-2 md:p-5 bg-[#EAEAEA] rounded-md md:rounded-2xl">
      {children}
    </li>
  );
};

export default ListItem;
