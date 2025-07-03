import AccordionItem from "@/shared/components/Accordion/Subcomponents/AccordionItem";
import AccordionItemContent from "@/shared/components/Accordion/Subcomponents/AccordionItemContent";
import AccordionItemTitle from "@/shared/components/Accordion/Subcomponents/AccordionItemTitle";
import MdxLayout from "@/shared/components/MdxLayout";
import { ParentComponent } from "@/shared/components/types";
import { ReactNode } from "react";

const GuideAccordion = ({
  guide,
  children,
  icon,
}: {
  icon: ReactNode;
  guide: string;
} & ParentComponent) => {
  return (
    <AccordionItem className="border-b-2 bg-zinc-100">
      <AccordionItemTitle className="text-md font-medium text-zinc-700">
        <div className="flex gap-3">
          {icon}
          {guide}
        </div>
      </AccordionItemTitle>
      <AccordionItemContent>
        <MdxLayout>{children}</MdxLayout>
      </AccordionItemContent>
    </AccordionItem>
  );
};

export default GuideAccordion;
