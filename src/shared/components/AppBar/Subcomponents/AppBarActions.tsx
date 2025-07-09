import React from "react";
import { ParentComponent } from "../../types";

type AppBarActionsProps = ParentComponent;

const AppBarActions = ({ children }: AppBarActionsProps) => {
  return (
    <div className="flex gap-6 pt-1 md:pt-0 flex-1 justify-between">
      {children}
    </div>
  );
};

export default AppBarActions;
