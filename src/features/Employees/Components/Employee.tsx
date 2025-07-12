import React from "react";
import { User } from "@/lib/dbTypes";
import {
  Archive,
  CalendarClock,
  ChevronDown,
  IdCard,
  IdCardLanyard,
  KeyRound,
} from "lucide-react";
import ArchiveEmployeeModal from "./ArchiveEmployeeModal";
import { showModalById } from "@/components/CheckIn/helpers";
import AbsenceEmployeeModal from "./AbsenceModal";
import Link from "next/link";
import getEmployeeInitials from "./Employee/Helpers/getEmployeeInitials";
import { ParentComponent } from "@/shared/components/types";

type EmployeeProps = {
  user: User;
};

const EmployeeDetail = ({ children }: ParentComponent) => {
  return (
    <div className="flex justify-center gap-1 text-zinc-700 capitalize">
      {children}
    </div>
  );
};

const Employee = ({ user }: EmployeeProps) => {
  const { id, idn, firstName, lastName, role } = user;
  const absenceEmployeeModal = `report_absence_${id}_modal`;
  const archiveEmployeeModal = `archive_employee_${id}_modal`;

  return (
    <li className="flex py-2 px-3 bg-zinc-100 rounded-md md:rounded-2xl">
      <details className="flex flex-col w-full group">
        <summary className="flex w-full items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-zinc-200 text-zinc-700 w-10 rounded-full">
              <span>{getEmployeeInitials(user)}</span>
            </div>
          </div>
          <p className="flex-1 md:text-xl">
            {firstName} {lastName}
          </p>
          <p className="flex-1 text-right text-xl font-light">
            <ChevronDown className="ml-auto group-open:rotate-180" />
          </p>
        </summary>
        <ul className="mt-4">
          <li className="flex w-full text-sm md:text-lg justify-between">
            <EmployeeDetail>
              <IdCardLanyard /> {role}
            </EmployeeDetail>
            <EmployeeDetail>
              <IdCard /> {idn}
            </EmployeeDetail>
            <EmployeeDetail>
              <KeyRound />
              {id}
            </EmployeeDetail>
          </li>
          <div className="divider my-2"></div>
          <li className="flex w-full flex-row-reverse justify-between text-sm md:text-md mt-2">
            <Link href={`/admin/employees/${id}`}>
              <button className="btn btn-outline">
                <CalendarClock />
                Absence
              </button>
            </Link>
            <button
              className="btn btn-outline btn-error"
              onClick={() => showModalById(archiveEmployeeModal)}
            >
              <Archive className="size-4" />
              Archive
            </button>
          </li>
        </ul>
      </details>
      <ArchiveEmployeeModal modalId={archiveEmployeeModal} employee={user} />
      <AbsenceEmployeeModal modalId={absenceEmployeeModal} employee={user} />
    </li>
  );
};

export default Employee;
