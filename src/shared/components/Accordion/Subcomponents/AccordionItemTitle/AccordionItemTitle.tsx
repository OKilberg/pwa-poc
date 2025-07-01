import { ParentComponent, Styleable } from "@/shared/components/types";
import clsx from "clsx";

const AccordionItemTitle = ({
  children,
  className,
}: ParentComponent & Styleable) => {
  const _className = clsx("collapse-title", className ?? "text-lg font-medium");
  
  return <div className={_className}>{children}</div>;
};

export default AccordionItemTitle;
