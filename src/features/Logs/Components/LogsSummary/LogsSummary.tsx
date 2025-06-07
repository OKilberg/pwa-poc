import useMonth from "@/shared/queryState/useMonth";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useFilterSummary from "../../Hooks/useFilterSummary";
import { fullMonthNames } from "@/lib/date/constants";

const LogsSummary = () => {
  const { shifts, time } = useFilterSummary();
  const employeeData = useEmployeeData();
  const { month } = useMonth();

  if (!employeeData) {
    return null;
  }

  const { firstName } = employeeData;

  return (
    <div className="px-2 text-gray-600">
      {firstName} worked {shifts} shifts in {fullMonthNames[month]} for a total
      time of {time}
    </div>
  );
};

export default LogsSummary;
