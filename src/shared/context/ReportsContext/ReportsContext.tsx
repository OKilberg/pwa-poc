"use client";

import { User } from "@/lib/dbTypes";
import { ParentComponent } from "@/shared/components/types";
import { createContext, useState } from "react";

type ReportsContextValues = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const ReportsContext = createContext<ReportsContextValues | null>(null);

const ReportsContextProvider = ({ children }: ParentComponent) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <ReportsContext.Provider value={{ user, setUser }}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContextProvider;
