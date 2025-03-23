import React from "react";
import { ParentComponent } from "./types";

type ListItemProps = {} & ParentComponent;

const ListItem = ({ children }: ListItemProps) => {
  return (
    <li className="flex p-2 md:p-5 bg-[#EAEAEA] rounded-md md:rounded-2xl">
      {children}
    </li>
  );
};

export default ListItem;
