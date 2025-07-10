import { ParentComponent } from "@/shared/components/types";

const AccordionItemContent = ({ children }: ParentComponent) => {
  return <div className="collapse-content w-full">{children}</div>;
};

export default AccordionItemContent;
