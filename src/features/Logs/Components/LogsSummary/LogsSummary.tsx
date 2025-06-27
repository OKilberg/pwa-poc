import useEmployeeData from "../../Hooks/useEmployeeData";
import useFilterSummary from "../../Hooks/useFilterSummary";
import { Button } from "@mui/material";
import { HardDriveDownload, Plus, PlusCircle } from "lucide-react";
import useExportFilteredLogs from "../../Hooks/useExportFilteredLogs";
import { useRouter } from "next/navigation";
import useMonth, { MONTHS } from "@/shared/queryState/useMonth";

const LogSummaryActions = ({
  userId,
  month,
}: {
  userId: number;
  month: MONTHS;
}) => {
  const exportFilteredLogs = useExportFilteredLogs();
  const { push } = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-end w-full pl-1 gap-1 md:gap-2">
      <button
        className="btn btn-outline btn-sm md:btn-md"
        onClick={() =>
          push(`/admin/logs/create?employee=${userId}&month=${month}`)
        }
      >
        <Plus className="size-4" />
        Add
      </button>
      <button
        className="btn btn-sm md:btn-md btn-neutral"
        onClick={exportFilteredLogs}
      >
        <HardDriveDownload className="size-4" />
        Export
      </button>
    </div>
  );
};

const LogStat = ({
  label,
  value,
  desc,
}: {
  label: string;
  value: string | number;
  desc?: string;
}) => {
  return (
    <div className="stat pl-1 md:pl-6">
      <div className="stat-title text-sm">{label}</div>
      <div className="stat-value text-base">{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
};

const LogsSummary = () => {
  const { shifts, time } = useFilterSummary();
  const employeeData = useEmployeeData();
  const { month } = useMonth();

  if (!employeeData) {
    return null;
  }

  const { id } = employeeData;

  return (
    <div className="text-gray-600 flex items-center">
      <LogStat label="Time worked" value={time} />
      <LogStat label="Shifts" value={shifts} />
      <LogSummaryActions userId={id} month={month} />
    </div>
  );
};

export default LogsSummary;
