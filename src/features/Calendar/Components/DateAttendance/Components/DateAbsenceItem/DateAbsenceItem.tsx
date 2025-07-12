import getEmployeeInitials from "@/features/Employees/Components/Employee/Helpers/getEmployeeInitials";
import { useRouter } from "next/navigation";
import useEmployee from "../../Hooks/useEmployee";
import { WorkAbsence } from "@/lib/dbTypes";
import { Palmtree } from "lucide-react";
import getReadableAbsence from "@/features/Logs/Helpers/getReadableAbsence";

const DateAbsenceItem = ({ absence }: { absence: WorkAbsence }) => {
  const { id } = absence;
  const { userId, endDate, startDate } = getReadableAbsence(absence);
  const employee = useEmployee(userId);
  const { push } = useRouter();

  if (!employee) {
    return null;
  }

  const { firstName, lastName, idn } = employee;

  const employeeTooltip = `${firstName} ${lastName} (${idn})`;

  return (
    <div className="flex w-full gap-2 items-center py-3 justify-between outline-zinc-200 outline-dashed rounded-lg px-2">
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
                {startDate}
              </div>
            </div>
            <hr className="bg-black" />
          </li>
          <li className="flex-1">
            <hr className="bg-black" />
            <div className="timeline-middle">
              <Palmtree />
            </div>
            <hr className="bg-black" />
          </li>
          <li>
            <hr className="bg-black" />
            <div className="timeline-middle ">
              <div className="badge badge-outline md:badge-lg min-w-[9ch]">
                {endDate}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => push(`/admin/absences/${id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default DateAbsenceItem;
