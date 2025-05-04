"use client";

import React from "react";
import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import CenterAppBar from "@/shared/components/AppBar/CenterAppBar";

const AdminHeader = () => {
  const user = useUser();

  const subtitle = user ? `${user.firstName} ${user.lastName}` : "Unknown user";

  return (
    <CenterAppBar
      pageTitle="Admin"
      pageDescription={subtitle}
      leftChildren={<div></div>}
      rightChildren={<div></div>}
    />
  );
};

export default AdminHeader;
