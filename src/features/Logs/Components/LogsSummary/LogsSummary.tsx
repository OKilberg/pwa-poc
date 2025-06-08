import useMonth, { MONTHS } from "@/shared/queryState/useMonth";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useFilterSummary from "../../Hooks/useFilterSummary";
import { Button } from "@mui/material";
import { HardDriveDownload, PlusCircle } from "lucide-react";
import useExportFilteredLogs from "../../Hooks/useExportFilteredLogs";
import { useRouter } from "next/navigation";

const LogSummaryActions = ({ userId }: { userId: number }) => {
  const exportFilteredLogs = useExportFilteredLogs();
  const { push } = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:h-1/2 md:justify-between flex-1 pl-1 gap-1 md:gap-2">
      <Button
        fullWidth
        endIcon={<PlusCircle className="size-4" />}
        variant="outlined"
        onClick={() => push(`/admin/logs/create?employee=${userId}`)}
      >
        Add
      </Button>
      <Button
        fullWidth
        endIcon={<HardDriveDownload className="size-4" />}
        variant="contained"
        onClick={exportFilteredLogs}
      >
        Export
      </Button>
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
      <LogSummaryActions userId={id} />
    </div>
  );
};

export default LogsSummary;
