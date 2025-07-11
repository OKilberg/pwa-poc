"use client";

import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import EmployeesList from "./Components/EmployeesList";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ensureAuth } from "@/lib/session/auth";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";

const Employees = () => {
  ensureAuth();
  const { push } = useRouter();

  return (
    <MainPane className="h-[calc(100vh-3rem)]">
      <DefaultAppBar
        pageTitle="Employees"
        pageDescription="Manage your employees"
        url="/admin"
      />
      <section className="w-full flex flex-row-reverse justify-start px-4">
        <button
          className="btn btn-neutral"
          onClick={() => push("/admin/employees/add")}
        >
          <UserPlus />
          Add
        </button>
      </section>
      <EmployeesList />
    </MainPane>
  );
};

export default Employees;
