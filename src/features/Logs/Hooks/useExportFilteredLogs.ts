import useEmployeeData from "./useEmployeeData";
import { exportEmployeeMonthlyLogsToXLSX } from "@/lib/export/export";
import useMonth from "@/shared/queryState/useMonth";
import { fullMonthNames } from "@/lib/date/constants";
import toast from "react-hot-toast";
import useYear from "@/shared/queryState/useYear";

const useExportFilteredLogs = () => {
  const employee = useEmployeeData();
  const { month } = useMonth();
  const { year } = useYear();

  const exportFilteredLogs = () => {
    if (!employee) return;
    const { id } = employee;
    exportEmployeeMonthlyLogsToXLSX(id, year, Number(month))
      .then(() => {
        toast.success(`Exported ${year}-${fullMonthNames[month]}`);
      })
      .catch(() => {
        toast.error(`Error exporting ${year}-${fullMonthNames[month]}`);
      });
  };

  return exportFilteredLogs;
};

export default useExportFilteredLogs;
