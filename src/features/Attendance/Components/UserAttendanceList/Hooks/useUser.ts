import useReportsUser from "@/shared/context/ReportsContext/ContextHooks/useUser";
import useSessionUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";

const useUser = () => {
  const reportsUser = useReportsUser();
  const sessionUser = useSessionUser();

  const user = reportsUser ? reportsUser : sessionUser;

  return user;
};

export default useUser;
