"use client";

import { getClockedInEntries } from "@/lib/db/logs";
import React from "react";
import ClockedIn from "./ClockedIn";
import useQuery from "./useQuery";
import { User } from "@/lib/dbTypes";

const userMap = new Map<number, Partial<User>>();
userMap.set(111, { firstName: "John", lastName: "K" });
userMap.set(222, { firstName: "Alice", lastName: "H" });

const ClockedInList = () => {
  const clockedIn = useQuery({ fn: getClockedInEntries, key: "entries" });

  return (
    <ul className="flex flex-col w-full max-h-[300px]">
      {clockedIn?.map(({ inTime, id, userId }) => {
        const { firstName, lastName } = userMap.get(userId) as User;
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
