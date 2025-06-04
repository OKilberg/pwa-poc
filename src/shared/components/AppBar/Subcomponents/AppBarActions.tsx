import React from "react";
import { ParentComponent } from "../../types";

type AppBarActionsProps = ParentComponent;

const AppBarActions = ({ children }: AppBarActionsProps) => {
  return <div className="flex gap-6">{children}</div>;
};

export default AppBarActions;
