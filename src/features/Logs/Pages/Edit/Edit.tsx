"use client";
import { getLogEntry } from "@/lib/db/logs";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import useQuery from "@/shared/hooks/useQuery";
import { useParams } from "next/navigation";
import React from "react";
import EditLogForm from "./Components/EditLogForm";
import { getEmployeesMap } from "@/lib/db/users";
import { getISODate } from "@/util/util";
import { fullMonthNames } from "@/lib/date/constants";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const logId = Number(id);
  const log = useQuery({ fn: () => getLogEntry(Number(logId)) });
  const employees = useQuery({ fn: getEmployeesMap, key: "employeesMap" });

  if (log) {
    const { userId, inTime, outTime, month, year } = log;
    const employee = employees.get(userId);
    const pageDescription = `Worklog by ${employee?.firstName} ${
      employee?.lastName
    } on ${fullMonthNames[month]} ${getISODate(inTime)}, ${year}`;
    return (
      <MainPane>
        <DefaultAppBar pageTitle="Edit log" pageDescription={pageDescription} />
        <section className="px-4">
          <EditLogForm
            id={logId}
            inTime={inTime}
            outTime={outTime}
            userId={userId}
          />
        </section>
      </MainPane>
    );
  }
};

export default Edit;
