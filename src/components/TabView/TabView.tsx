import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const TabView = ({ children }: Props) => {
  return (
    <div role="tablist" className="tabs tabs-bordered min-w-fit">
      {children}
    </div>
  );
};

export default TabView;
