"use client";

import React from "react";
import Header from "@/shared/components/Header/Header";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import { useTranslations } from "next-intl";

const ClockInHeader = () => {
  const user = useUser();
  const t = useTranslations("ClockedIn");

  const subtitle = user ? `${user.firstName} ${user.lastName}` : "Unknown user";

  return (
    <Header>
      <HeaderTitle>{t("Welcome")}</HeaderTitle>
      <HeaderSubtitle>{subtitle}</HeaderSubtitle>
    </Header>
  );
};

export default ClockInHeader;
