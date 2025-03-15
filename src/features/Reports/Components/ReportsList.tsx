"use client";

import UserAttendanceList from "@/features/Attendance/Components/UserAttendanceList/UserAttendanceList";
import useUser from "@/shared/context/ReportsContext/ContextHooks/useUser";
import React from "react";

const ReportsList = () => {
  const user = useUser();

  if (!user) return <div>Select a employee above.</div>;

  return <UserAttendanceList user={user} />;
};

export default ReportsList;
