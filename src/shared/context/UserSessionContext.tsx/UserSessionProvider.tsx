"use client";

import { User } from "@/lib/dbTypes";
import { getUserSession } from "@/lib/session/Session";
import { ParentComponent } from "@/shared/components/types";
import React, { createContext, useState } from "react";

type UserSession = {
  user: User | null;
  setUser: (user: User | null) => void;
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
  const userSession = getUserSession()
  const [user, setUser] = useState<User | null>(userSession);

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
