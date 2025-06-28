import getReadableLog from "@/features/Logs/Helpers/getReadableLog";
import { LogEntry } from "@/lib/dbTypes";
import { BriefcaseBusiness } from "lucide-react";
import useDateLogs from "./Hooks/useDateLogs";
import useEmployee from "./Hooks/useEmployee";
import getEmployeeInitials from "@/features/Employees/Components/Employee/Helpers/getEmployeeInitials";
import { useRouter } from "next/navigation";

const DateLogItem = ({ log }: { log: LogEntry }) => {
  const { id, outTime } = log;
  const { startTime, endTime, userId } = getReadableLog(log);
  const employee = useEmployee(userId);
  const isWorking = !outTime;
  const { push } = useRouter();

  if (!employee) {
    return null;
  }

  const { firstName, lastName, idn } = employee;

  const employeeTooltip = `${firstName} ${lastName} (${idn})`;

  return (
    <div className="flex w-full gap-2 items-center py-3 justify-between bg-zinc-50 rounded-lg px-2">
      <div
        className="avatar placeholder tooltip tooltip-right"
        data-tip={employeeTooltip}
      >
        <div className="bg-zinc-200 text-zinc-600 w-10 h-10 rounded-full">
          <span>{getEmployeeInitials(employee)}</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <ul className="timeline w-full">
          <li>
            <div className="timeline-middle">
              <div className="badge badge-outline md:badge-lg min-w-[9ch]">
                {startTime}
              </div>
            </div>
            <hr className="bg-black" />
          </li>
          <li className="flex-1">
            <hr className="bg-black" />
            <div className="timeline-middle">
              {isWorking ? (
                <BriefcaseBusiness />
              ) : (
                <BriefcaseBusiness className="" />
              )}
            </div>
            {isWorking ? <hr /> : <hr className="bg-black" />}
          </li>
          <li>
            {isWorking && (
              <>
                <hr />
                <div className="timeline-middle">
                  <div className="badge badge-outline md:badge-lg min-w-[9ch]">
                    {endTime}
                  </div>
                </div>
              </>
            )}
            {!isWorking && (
              <>
                <hr className="bg-black" />
                <div className="timeline-middle ">
                  <div className="badge badge-outline md:badge-lg min-w-[9ch]">
                    {endTime}
                  </div>
                </div>
              </>
            )}
          </li>
        </ul>
      </div>
      <div className="">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => push(`/admin/logs/${id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const DateAttendance = () => {
  const dateLogs = useDateLogs();

  return (
    <div className="flex flex-col gap-2">
      {dateLogs.map((log) => (
        <DateLogItem key={log.id} log={log} />
      ))}
    </div>
  );
};

export default DateAttendance;
