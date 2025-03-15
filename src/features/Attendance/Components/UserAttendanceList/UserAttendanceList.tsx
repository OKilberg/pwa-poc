import React from "react";
import { Year } from "./Components/Year";
import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";

const UserAttendanceList = () => {
  const user = useUser();
  const userId = user ? user.id : 0;

  return (
    <ul className="flex flex-col gap-2 w-full max-h-[450px] overflow-scroll">
      <Year userId={userId} year={2025} />
    </ul>
  );
};

export default UserAttendanceList;
