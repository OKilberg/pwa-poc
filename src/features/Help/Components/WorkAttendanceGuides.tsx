import { AccordionGroup } from "@/shared/components/Accordion/AccordionGroup";
import { AlarmClockPlus, Clock, ClockAlert, TreePalm } from "lucide-react";
import CategoryAccordion from "./CategoryAccordion";
import GuideAccordion from "./GuideAccordion";
import { EmployeeAbsence, EmployeeClockIn, EmployeeClockOut } from "../Articles";

const WorkAttendanceGuides = () => {
  return (
    <ul className="flex flex-col gap-2">
      <AccordionGroup>
        <CategoryAccordion category="Work Attendance" icon={<Clock />}>
          <AccordionGroup>
            <GuideAccordion
              icon={<ClockAlert />}
              guide={"What should I do if an employee forgot to clock out?"}
            >
              <EmployeeClockOut />
            </GuideAccordion>
            <GuideAccordion
              icon={<AlarmClockPlus />}
              guide={"What should I do if an employee forgot to clock in?"}
            >
              <EmployeeClockIn />
            </GuideAccordion>
            <GuideAccordion
              icon={<TreePalm />}
              guide={
                "How do I record employee vacation, sick leave, or absence?"
              }
            >
              <EmployeeAbsence />
            </GuideAccordion>
          </AccordionGroup>
        </CategoryAccordion>
      </AccordionGroup>
    </ul>
  );
};

export default WorkAttendanceGuides;
