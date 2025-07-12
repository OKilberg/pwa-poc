import { AccordionGroup } from "@/shared/components/Accordion/AccordionGroup";
import { Download, FileSpreadsheet, FileUser } from "lucide-react";
import CategoryAccordion from "./CategoryAccordion";
import GuideAccordion from "./GuideAccordion";
import { ExportMonthAll, ExportMonthEmployee } from "../Articles";

const DataExportGuides = () => {
  return (
    <ul className="flex flex-col gap-2">
      <AccordionGroup>
        <CategoryAccordion category="Data Export" icon={<Download />}>
          <AccordionGroup>
            <GuideAccordion
              icon={<FileSpreadsheet />}
              guide={
                "How do I export all employees’ monthly worked hours to Excel?"
              }
            >
              <ExportMonthAll />
            </GuideAccordion>
            <GuideAccordion
              icon={<FileUser />}
              guide={
                "How do I export a single employee’s monthly worked hours to Excel?"
              }
            >
              <ExportMonthEmployee />
            </GuideAccordion>
          </AccordionGroup>
        </CategoryAccordion>
      </AccordionGroup>
    </ul>
  );
};

export default DataExportGuides;
