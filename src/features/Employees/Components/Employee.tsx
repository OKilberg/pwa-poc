import React from "react";
import { User } from "@/lib/dbTypes";
import { Archive, ChevronDown } from "lucide-react";
import Button from "@/shared/components/Button/Button";
import ArchiveEmployeeModal from "./ArchiveEmployeeModal";
import { showModalById } from "@/components/CheckIn/helpers";

type EmployeeProps = {
  user: User;
};

const Employee = ({ user }: EmployeeProps) => {
  const { id, idn, firstName, lastName, role } = user;
  const modalId = `archive_employee_${id}_modal`;
  return (
    <li className="flex p-2 md:p-5 bg-[#EAEAEA] rounded-md md:rounded-2xl">
      <details className="flex flex-col w-full group">
        <summary className="flex w-full items-center">
          <p className="flex-1 md:text-2xl">
            {firstName} {lastName}
          </p>
          <p className="flex-1 text-right text-xl font-light">
            <ChevronDown className="ml-auto group-open:rotate-180" />
          </p>
        </summary>
        <ul className="mt-2">
          <li className="flex w-full text-sm md:text-lg">
            <div className="flex-1">Role: {role}</div>
            <div className="flex-1 text-center">Idn: {idn}</div>
            <div className="flex-1 text-right">PIN: {id}</div>
          </li>
          <div className="divider"></div>
          <li className="flex w-full flex-row-reverse text-sm md:text-md mt-2">
            <Button
              variant="negative"
              onClick={() => showModalById(modalId)}
              size="xs"
            >
              <Archive className="size-4" />
              Archive
            </Button>
          </li>
        </ul>
      </details>
      <ArchiveEmployeeModal modalId={modalId} employee={user} />
    </li>
  );
};

export default Employee;
