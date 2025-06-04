import useReportsUser from "@/shared/context/ReportsContext/ContextHooks/useUser";
import useSessionUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";

const useUser = () => {
  let reportsUser = null;
  let sessionUser = null;
  try {
    reportsUser = useReportsUser();
  } catch {
    try {
      sessionUser = useSessionUser();
    } catch {}
  }

  const user = reportsUser ? reportsUser : sessionUser;

  return user;
};

export default useUser;
