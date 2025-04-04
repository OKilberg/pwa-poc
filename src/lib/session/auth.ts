import { unauthorized } from "next/navigation";
import { getUserSession } from "./Session";

export const ensureAuth = () => {
  const userSession = getUserSession();
  if (userSession && userSession.role === "admin") {
    return;
  }
  unauthorized();
};

export const isAdminSession = () => {
  const userSession = getUserSession();

  if (userSession && userSession.role === "admin") {
    return true;
  }

  return false;
};
