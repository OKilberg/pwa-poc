"use client";

import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import useQuery from "@/shared/hooks/useQuery";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import { getEmployeesMap } from "@/lib/db/users";
import { getWorkAbsence } from "@/lib/db/absence";
import getReadableAbsence from "../../Helpers/getReadableAbsence";
import EditAbsenceForm from "./Components/EditAbsenceForm";

const EditAbsence = () => {
  const { id } = useParams<{ id: string }>();
  const absenceId = Number(id);
  const absence = useQuery({
    fn: () => getWorkAbsence(Number(absenceId)),
    key: `edit-${absenceId}`,
  });
  const employees = useQuery({ fn: getEmployeesMap, key: "employeesMap" });

  if (absence) {
    const { userId, dateEnd, dateStart, year, note, cause } = absence;
    const { endDate, startDate } = getReadableAbsence(absence);
    const employee = employees.get(userId);
    const pageDescription = `Absence by ${employee?.firstName} ${employee?.lastName} on ${startDate} - ${endDate}, ${year}`;
    return (
      <MainPane>
        <DefaultAppBar
          pageTitle="Edit absence"
          pageDescription={pageDescription}
          url="/admin/logs"
        />
        <section className="">
          <Suspense>
            <EditAbsenceForm
              id={absenceId}
              userId={userId}
              cause={cause}
              note={note}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
          </Suspense>
        </section>
      </MainPane>
    );
  }
};

export default EditAbsence;
