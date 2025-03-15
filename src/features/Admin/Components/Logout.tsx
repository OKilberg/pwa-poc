import Button from "@/shared/components/Button/Button";
import useLogout from "@/shared/context/UserSessionContext.tsx/ContextHooks/useLogout";
import { LogOut } from "lucide-react";
import React from "react";

const Logout = () => {
  const logout = useLogout();

  return (
    <Button variant="tertiary" onClick={logout}>
      <LogOut className="transform rotate-180" />
      Back
    </Button>
  );
};

export default Logout;
