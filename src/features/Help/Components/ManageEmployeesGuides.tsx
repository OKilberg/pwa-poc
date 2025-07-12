import { AccordionGroup } from "@/shared/components/Accordion/AccordionGroup";
import { UserPlus, Users } from "lucide-react";
import TestArticle from "@/features/Help/Articles/TestArticle.mdx";
import CategoryAccordion from "./CategoryAccordion";
import GuideAccordion from "./GuideAccordion";

const ManageEmployeesGuides = () => {
  return (
    <ul className="flex flex-col gap-2">
      <AccordionGroup>
        <CategoryAccordion category="Managing Employees" icon={<Users />}>
          <AccordionGroup>
            <GuideAccordion icon={<UserPlus />} guide={"Add Employee"}>
              <TestArticle />
            </GuideAccordion>
          </AccordionGroup>
        </CategoryAccordion>
      </AccordionGroup>
    </ul>
  );
};

export default ManageEmployeesGuides;
