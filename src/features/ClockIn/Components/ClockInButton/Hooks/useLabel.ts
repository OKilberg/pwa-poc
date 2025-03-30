import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import { useTranslations } from "next-intl";

const useLabel = () => {
  const user = useUser();
  const t = useTranslations("ClockedIn");

  if (user) {
    const { isClockedIn } = user;

    const label = isClockedIn ? t("clockOut") : t("clockIn");

    return label;
  }

  const label = "--";

  return label;
};

export default useLabel;
