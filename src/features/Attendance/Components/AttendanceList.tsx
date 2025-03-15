import React from "react";
import UserAttendanceList from "./UserAttendanceList/UserAttendanceList";
import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";

const AttendanceList = () => {
  const user = useUser();

  if (!user) return null;

  return <UserAttendanceList user={user} />;
};

export default AttendanceList;
