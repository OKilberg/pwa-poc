import { AccordionGroup } from "@/shared/components/Accordion/AccordionGroup";
import AccordionItem from "@/shared/components/Accordion/Subcomponents/AccordionItem";
import AccordionItemContent from "@/shared/components/Accordion/Subcomponents/AccordionItemContent";
import AccordionItemTitle from "@/shared/components/Accordion/Subcomponents/AccordionItemTitle";
import { UserPlus, Users } from "lucide-react";
import TestArticle from "@/features/Help/Articles/TestArticle.mdx";
import MdxLayout from "@/shared/components/MdxLayout";
import CategoryAccordion from "./CategoryAccordion";

const AddEmployee = () => {
  return (
    <AccordionItem className="border-b-2 bg-zinc-100">
      <AccordionItemTitle className="text-md font-medium text-zinc-700">
        <div className="flex gap-3">
          <UserPlus size={20} />
          Add Employee
        </div>
      </AccordionItemTitle>
      <AccordionItemContent>
        <MdxLayout>
          <TestArticle />
        </MdxLayout>
      </AccordionItemContent>
    </AccordionItem>
  );
};

const ManageEmployeesGuides = () => {
  return (
    <ul className="flex flex-col gap-2">
      <AccordionGroup>
        <CategoryAccordion category="Managing Employees" icon={<Users />}>
          <AccordionGroup>
            <AddEmployee />
          </AccordionGroup>
        </CategoryAccordion>
      </AccordionGroup>
    </ul>
  );
};

export default ManageEmployeesGuides;
