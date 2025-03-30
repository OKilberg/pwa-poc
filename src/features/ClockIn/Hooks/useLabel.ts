import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import { getISOTime } from "@/util/util";
import { useTranslations } from "next-intl";

const useLabel = () => {
  const t = useTranslations("ClockedIn");
  const user = useUser();

  if (user) {
    const { isClockedIn } = user;

    if (isClockedIn) {
      const { inTime } = user;

      const time = getISOTime(inTime);

      const label = `${time} - ${t("ongoing")}`;

      return label;
    }

    // const label = "What would you like to do?";
    const label = t("whatToDo");

    return label;
  }

  const label = "--";

  return label;
};

export default useLabel;
