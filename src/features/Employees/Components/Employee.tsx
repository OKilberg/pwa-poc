import { User } from "@/lib/dbTypes";
import { ChevronDown } from "lucide-react";
import React from "react";

type EmployeeProps = {
  user: User;
};

const Employee = ({ user }: EmployeeProps) => {
  const { id, firstName, lastName, role } = user;
  return (
    <li className="flex p-5 bg-[#EAEAEA] rounded-2xl">
      <details className="flex flex-col w-full group">
        <summary className="flex w-full items-center">
          <p className="flex-1 text-2xl">
            {firstName} {lastName}
          </p>
          <p className="flex-1 text-right text-xl font-light">
            <ChevronDown className="ml-auto group-open:rotate-180" />
          </p>
        </summary>
        <ul className="mt-2">
          <li className="flex w-full">
            <div className="flex-1">Role: {role}</div>
            <div className="flex-1 text-right">PIN: {id}</div>
          </li>
        </ul>
      </details>
    </li>
  );
};

export default Employee;
