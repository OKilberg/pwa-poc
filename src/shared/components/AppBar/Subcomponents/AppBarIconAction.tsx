"use client";

import React from "react";
import { Clickable, ParentComponent } from "../../types";

type AppBarActionProps = ParentComponent & Clickable;

const AppBarIconAction = ({ children, onClick }: AppBarActionProps) => {
  return (
    <button className="size-5 md:size-6" onClick={onClick}>
      {children}
    </button>
  );
};

export default AppBarIconAction;
