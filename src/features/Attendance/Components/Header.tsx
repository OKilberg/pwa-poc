"use client";

import React from "react";
import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import { useTranslations } from "next-intl";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";

const AttendanceHeader = () => {
  const user = useUser();
  const t = useTranslations("Attendance");

  const subtitle = user ? `${user.firstName} ${user.lastName}` : "Unknown user";

  return (
    <DefaultAppBar
      pageTitle={t("attendanceTitle")}
      pageDescription={subtitle}
      url="/clockin"
    />
  );
};

export default AttendanceHeader;
