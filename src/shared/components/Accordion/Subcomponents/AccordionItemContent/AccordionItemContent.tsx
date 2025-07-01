import { ParentComponent } from "@/shared/components/types";

const AccordionItemContent = ({ children }: ParentComponent) => {
  return <div className="collapse-content">{children}</div>;
};

export default AccordionItemContent;
