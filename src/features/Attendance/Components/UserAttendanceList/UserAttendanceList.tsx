import React from "react";
import AttendanceItem from "./Components/AttendanceItem";

const UserAttendanceList = () => {
  return (
    <ul className="flex flex-col gap-2 w-full max-h-[450px] overflow-scroll">
      <time className="divider">2025</time>
      <AttendanceItem month="March" entries={10} timeTotal="100h" />
      <AttendanceItem month="February" entries={8} timeTotal="90h" />
      <AttendanceItem month="January" entries={7} timeTotal="80h" />
      <time className="divider">2024</time>
      <AttendanceItem month="December" entries={6} timeTotal="70h" />
      <AttendanceItem month="November" entries={6} timeTotal="70h" />
    </ul>
  );
};

export default UserAttendanceList;
