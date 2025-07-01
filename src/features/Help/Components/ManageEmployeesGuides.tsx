import { AccordionGroup } from "@/shared/components/Accordion/AccordionGroup";
import AccordionItem from "@/shared/components/Accordion/Subcomponents/AccordionItem";
import AccordionItemContent from "@/shared/components/Accordion/Subcomponents/AccordionItemContent";
import AccordionItemTitle from "@/shared/components/Accordion/Subcomponents/AccordionItemTitle";
import { UserMinus, UserPlus, Users } from "lucide-react";

const ManageEmployeesGuides = () => {
  return (
    <ul className="flex flex-col gap-2">
      <AccordionGroup name="a1">
        <AccordionItem>
          <AccordionItemTitle>
            <div className="flex gap-3">
              <Users />
              Managing Employees
            </div>
          </AccordionItemTitle>
          <AccordionItemContent>
            <AccordionGroup name="a1a1">
              <AccordionItem className="border-b-2">
                <AccordionItemTitle className="text-md font-medium text-zinc-700">
                  <div className="flex gap-3">
                    <UserPlus size={20} />
                    Adding Employee
                  </div>
                </AccordionItemTitle>
                <AccordionItemContent>
                  This is how you add.
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem className="border-b-2">
                <AccordionItemTitle className="text-md font-medium text-zinc-700">
                  <div className="flex gap-3">
                    <UserMinus size={20} />
                    Remove Employee
                  </div>
                </AccordionItemTitle>
                <AccordionItemContent>
                  This is how you remove.
                </AccordionItemContent>
              </AccordionItem>
            </AccordionGroup>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemTitle>
            <div className="flex gap-3">
              <Users />
              Add Employee
            </div>
          </AccordionItemTitle>
          <AccordionItemContent></AccordionItemContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemTitle>
            <div className="flex gap-3">
              <Users />
              Add Employee
            </div>
          </AccordionItemTitle>
          <AccordionItemContent></AccordionItemContent>
        </AccordionItem>
      </AccordionGroup>
    </ul>
  );
};

export default ManageEmployeesGuides;
