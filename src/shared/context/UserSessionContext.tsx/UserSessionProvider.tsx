"use client";

import React, { createContext, useState } from "react";
import { getUserSession, UserWithAdditionalProps } from "@/lib/session/Session";
import { ParentComponent } from "@/shared/components/types";

type UserSession = {
  user: UserWithAdditionalProps | null;
  setUser: (user: UserWithAdditionalProps | null) => void;
  logout: () => void;
};

type UserSessionContextProps = ParentComponent & {
  onLogout: () => void;
};

export const UserSessionContext = createContext<UserSession | null>(null);

const UserSessionProvider = ({
  children,
  onLogout,
}: UserSessionContextProps) => {
  const userSession = getUserSession();
  const [user, setUser] = useState<UserWithAdditionalProps | null>(userSession);

  const logout = async () => {
    setUser(null);
    onLogout();
  };

  return (
    <UserSessionContext.Provider value={{ logout, user, setUser }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionProvider;
