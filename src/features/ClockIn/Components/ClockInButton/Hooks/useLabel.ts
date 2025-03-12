import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";

const useLabel = () => {
  const user = useUser();

  if (user) {
    const { isClockedIn } = user;

    const label = isClockedIn ? "Clock out" : "Clock in";

    return label;
  }

  const label = "--";

  return label;
};

export default useLabel;
