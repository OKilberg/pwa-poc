import React, { ReactNode } from "react";

export type AppBarProps = {
  pageTitle: string;
  pageDescription?: string;
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
};

const AppBar = ({
  pageTitle,
  pageDescription,
  leftChildren,
  rightChildren,
}: AppBarProps) => {
  return (
    <nav className="min-h-16 px-4 flex flex-col gap-4 md:gap-0 pt-5 pb-6">
      <div className="flex justify-between md:h-16">
        {leftChildren}
        {rightChildren}
      </div>
      <div>
        <h1 className="text-lg md:text-2xl">{pageTitle}</h1>
        {pageDescription && (
          <h2 className="text-sm md:text-lg text-gray-700">
            {pageDescription}
          </h2>
        )}
      </div>
    </nav>
  );
};

export default AppBar;
