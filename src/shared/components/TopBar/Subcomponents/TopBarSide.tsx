import clsx from "clsx";
import { ParentComponent, Styleable } from "../../types";

type TopBarMidProps = ParentComponent & Styleable;

const TopBarSide = ({ className, children }: TopBarMidProps) => {
  const classTopBarSide = clsx("size-10", className);

  return <div className={classTopBarSide}>{children}</div>;
};

export default TopBarSide;
