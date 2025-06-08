import useEmployeeData from "./useEmployeeData";
import { exportEmployeeMonthlyLogsToXLSX } from "@/lib/export/export";
import useMonth from "@/shared/queryState/useMonth";
import { fullMonthNames } from "@/lib/date/constants";
import toast from "react-hot-toast";

const useExportFilteredLogs = () => {
  const employee = useEmployeeData();
  const { month } = useMonth();
  const year = 2025; // use queryparam

  const exportFilteredLogs = () => {
    if (!employee) return;
    const { id } = employee;
    exportEmployeeMonthlyLogsToXLSX(id, 2025, Number(month))
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
