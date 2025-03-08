import clsx from "clsx";
import { ParentComponent, Styleable } from "../../types";

type TopBarMidProps = ParentComponent & Styleable;

const TopBarMid = ({ className, children }: TopBarMidProps) => {
  const classTopBarMid = clsx("flex-1 flex justify-center", className);

  return <div className={classTopBarMid}>{children}</div>;
};

export default TopBarMid;
