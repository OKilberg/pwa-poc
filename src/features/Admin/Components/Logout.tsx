import useLogout from "@/shared/context/UserSessionContext.tsx/ContextHooks/useLogout";
import { LogOut } from "lucide-react";
import React from "react";

const Logout = ({ iconOnly }: { iconOnly?: boolean }) => {
  const logout = useLogout();

  return (
    <button onClick={logout} className="px-2 flex items-center gap-2">
      <LogOut className="transform rotate-180" />
      <p className="hidden md:block">Logout</p>
    </button>
  );
};

export default Logout;
