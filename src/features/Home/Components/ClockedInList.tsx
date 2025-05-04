"use client";

import { getClockedInEntries } from "@/lib/db/logs";
import React from "react";
import ClockedIn from "./ClockedIn";
import { User } from "@/lib/dbTypes";
import { getEmployeesMap } from "@/lib/db/users";
import useQuery from "@/shared/hooks/useQuery";

const ClockedInList = () => {
  const employeeMap = useQuery({ fn: getEmployeesMap, key: "employeesMap" });
  const clockedIn = useQuery({ fn: getClockedInEntries, key: "clockedIn" });

  return (
    <ul className="flex flex-col w-full max-h-[250px] md:max-h-[300px] animate-fadeIn">
      {clockedIn?.map(({ inTime, id, userId }) => {
        const { firstName, lastName } = employeeMap.get(userId) as User;
        return (
          <ClockedIn
            key={id}
            firstname={firstName}
            lastname={lastName}
            inTime={inTime}
          />
        );
      })}
    </ul>
  );
};

export default ClockedInList;
