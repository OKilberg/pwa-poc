"use client";

import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import EmployeesHeader from "./Components/EmployeesHeader";
import Content from "@/shared/components/Content/Content";
import EmployeesList from "./Components/EmployeesList";
import Button from "@/shared/components/Button/Button";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ensureAuth } from "@/lib/session/auth";

const Employees = () => {
  ensureAuth();
  const { push } = useRouter();

  return (
    <MainPane>
      <EmployeesHeader />
      <Content>
        <div className="w-full flex flex-row-reverse justify-center">
          <Button
            onClick={() => push("/admin/employees/add")}
            className="w-1/4"
            variant="secondary"
          >
            <UserPlus />
            Add
          </Button>
        </div>
        <EmployeesList />
        <div>
          <Button variant="tertiary" onClick={() => push("/admin")}>
            <ArrowLeft className="" />
            Back
          </Button>
        </div>
      </Content>
    </MainPane>
  );
};

export default Employees;
