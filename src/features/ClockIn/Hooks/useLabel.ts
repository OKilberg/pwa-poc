import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import { getISOTime } from "@/util/util";

const useLabel = () => {
  const user = useUser();

  if (user) {
    const { isClockedIn } = user;

    if (isClockedIn) {
      const { inTime } = user;

      const time = getISOTime(inTime);

      const label = `${time} - Ongoing`;

      return label;
    }

    const label = "What would you like to do?";

    return label;
  }

  const label = "--";

  return label;
};

export default useLabel;
