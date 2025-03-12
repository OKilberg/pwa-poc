import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";

const useVariant = () => {
  const user = useUser();

  if (user) {
    const { isClockedIn } = user;

    const variant = isClockedIn ? "negative" : "positive";

    return variant;
  }

  const variant = "primary";

  return variant;
};

export default useVariant;
