import React from "react";
import { Year } from "./Components/Year";
import { User } from "@/lib/dbTypes";

type UserAttendanceListProps = {
  user: User;
};

const UserAttendanceList = ({ user }: UserAttendanceListProps) => {
  const userId = user ? user.id : 0;

  return (
    <ul className="flex flex-col gap-2 w-full max-h-[450px] overflow-scroll">
      <Year userId={userId} year={2025} />
    </ul>
  );
};

export default UserAttendanceList;
