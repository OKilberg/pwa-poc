import React, { ReactNode } from "react";

export type AppBarProps = {
  pageTitle: string;
  leftChildren: ReactNode;
  rightChildren: ReactNode;
};

const AppBar = ({ pageTitle, leftChildren, rightChildren }: AppBarProps) => {
  return (
    <nav className="min-h-16 border-2 border-red-500 px-4 flex flex-col pt-5 pb-6">
      <div className="flex justify-between h-16">
        {leftChildren}
        {rightChildren}
      </div>
      <div>
        <h1 className="text-2xl">{pageTitle}</h1>
      </div>
    </nav>
  );
};

export default AppBar;
