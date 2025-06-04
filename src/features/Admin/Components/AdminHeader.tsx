"use client";

import React from "react";
import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import CenterAppBar from "@/shared/components/AppBar/CenterAppBar";
import Logout from "./Logout";

const AdminHeader = () => {
  const user = useUser();

  const subtitle = user ? `${user.firstName} ${user.lastName}` : "Unknown user";

  return (
    <CenterAppBar
      pageTitle="Admin"
      pageDescription={subtitle}
      leftChildren={<Logout />}
      rightChildren={<div></div>}
    />
  );
};

export default AdminHeader;
