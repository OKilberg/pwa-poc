import AccordionItem from "@/shared/components/Accordion/Subcomponents/AccordionItem";
import AccordionItemContent from "@/shared/components/Accordion/Subcomponents/AccordionItemContent";
import AccordionItemTitle from "@/shared/components/Accordion/Subcomponents/AccordionItemTitle";
import { ParentComponent } from "@/shared/components/types";
import { ReactNode } from "react";

const CategoryAccordion = ({
  category,
  children,
  icon,
}: {
  icon: ReactNode;
  category: string;
} & ParentComponent) => {
  return (
    <AccordionItem className="bg-white border">
      <AccordionItemTitle>
        <div className="flex gap-3 text-zinc-700">
          {icon}
          {category}
        </div>
      </AccordionItemTitle>
      <AccordionItemContent>{children}</AccordionItemContent>
    </AccordionItem>
  );
};

export default CategoryAccordion;
